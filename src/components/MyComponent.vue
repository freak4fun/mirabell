<!-- src/components/MyComponent.vue -->

<template>
    <div id="master">
        <div>{{infoMessage}}</div>
        <input type="text" v-model="text"/>
        <button @click="addItem">Hunzufügen</button>
        <br /> 
        <br />
        <br />
        <form ref="uploadForm" method="post" enctype="multipart/form-data" action="http://localhost:3000/">
            <input type="file" name="fileInput" id="fileInput">
            <input  @click="testPost" type="submit" value="Submit">
        </form>
        <br />
        <br />
        <button @click="testDownloadPOST">Test File Download (POST)</button>
        <br />

<!-- Anfang Modal -->
        <button id="modalButton" @click="openModal($event)">Open Modal</button>
        <div id="modalWindow" class="modal" v-show="this.showModal">
            <div class="modal-content">
                <span class="close" @click="closeModal($event, true)">&times;</span>
                <p>Some text in the Modal..</p>
                <br />
                <br />
                <div class="buttonContainer">
                    <button id="modalOkButton" @click="modalOK($event)">OK</button>
                    <button id="modalCancelButton" @click="modalCancel($event)">CANCEL</button>
                </div>
            </div>

        </div>
<!-- Ende Modal -->

        <ul id="example-1">
            <li :key=key v-for="(value, key) in this.list">
                <span @click="selectItem(key)">{{ key }}: {{ value }} </span><button @click="deleteItem(key)">X</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios"

enum dialogButtons { Nein = 0, Ja = 1, OK = 2, Abbrechen = 3 }

export default Vue.extend({
    props: ['list'],
    data() {
        return {
            text : "",
            infoMessage: '',
            currentItem: null,
            showModal: false,
            posts: [],
            errors: []
        }
    },
    mounted: function(){
        let that = this
        window.addEventListener('click', function( event ) {
            if ( event.target != document.getElementById('modalButton') && that.showModal ) {
                // wenn sichtbar: ausblenden bei Klick außerhalb des modalen Fenster
                let dummyElement = event.target as HTMLSelectElement; // parentNode error
                if( dummyElement.parentNode == document.getElementById("master") )
                {
                    that.closeModal( event, false )
                }
            }
        });
    },
    methods: {
        confirmAction( question: string, options: dialogButtons[])
        {
            //console.log( question, options);
            return options[dialogButtons.OK];
        },
        selectItem( index: number )
        {
            console.log( 'select: ', this.list[index] )
        },
        addItem() {
            
            let result: dialogButtons = this.confirmAction( 'Hilft die das weiter?', [dialogButtons.Nein, dialogButtons.Ja] )
            
            switch( result )
            {
                case dialogButtons.Ja : {
                    console.log( 'Ja', result )
                    break
                }
                case dialogButtons.Nein : {
                    console.log( 'Nein', result )
                    break
                }
                default : {
                    console.log( '???', result )   
                    break 
                }
            }

            if( this.text == '' )
            {
                this.showMessage('Es wurde kein Wert eingegeben!') 
                return;           
            } 
            
            if( this.list.indexOf( this.text ) == -1 )
            {
                this.list.push( this.text )
                console.log( this.text )
                this.showMessage("Der Wert '" + this.text + "' wurde hinzu gefügt!")
            }    
            else
            {
                this.showMessage('Der Wert ist schon vorhanden!')
                this.currentItem = null
            }
        },
        deleteItem(index: number) {
            this.showMessage("'" + this.list[index] + "' wurde glöscht.")
            this.list.splice( index, 1 )
            this.currentItem = null
            console.log( 'delete', "index ", index )
        },
        showMessage( value: string )
        {
            this.infoMessage = value            
        },
        openModal( event: Event )
        {
            console.log( "openModal", event );
            this.showModal = true           
        },
        closeModal( event: Event, closeButtonPressed: Boolean = true )
        {
            console.log( "closeModal", closeButtonPressed, event );
            this.showModal = false           
        },
        modalOK( event: Event ): dialogButtons
        {

            console.log( 'modalOK', event )
            this.showModal = false
            
            return dialogButtons.OK;
        },
        modalCancel( event: Event ): dialogButtons
        {
             
            console.log( 'modalCancel', event ) 
            this.showModal = false

            return dialogButtons.Abbrechen;
        },
        testDownloadPOST( event )
        {
            axios.get('http://localhost:3000/downloads/test.txt')
            .then((response) => {
                const downloadFile = response.data
                console.log( downloadFile )
            });
        },
        testPost( event )
        {
            const myFileContent = JSON.stringify( '{ "name": "christian" }' )
            const myFileName = 'myFile.json'
            let myFile = new File( [myFileContent], myFileName, {
                type: "text/json"
            })
            const formData = new FormData()
            formData.append( 'fileInput', myFile )

            console.log( 'myFile', myFile )
            
            axios.post( 'http://localhost:3000/', formData )
            .then(response => {
                // JSON responses are automatically parsed.
                console.log( "post_response", response )
            })
            .catch(e => {
                this.errors = []
                this.errors.push(e)
                console.log( 'post_errors', this.errors)
            })

            // async / await version (created() becomes async created())
            //
            // try {
            //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
            //   this.posts = response.data
            // } catch (e) {
            //   this.errors.push(e)
            // }
        }      
    },
    computed: {
        /*
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
        */
    }
});
</script>

<style>
.buttonContainer {
    text-align: right;
}
#modalOkButton,#modalCancelButton {
    min-width: 75px;
}
.greeting {
    font-size: 20px;
}
i.nput {
    background-color: beige;
    padding: 3px;
    border: 1px solid black;
}
/* The Modal (background) */
.modal {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>