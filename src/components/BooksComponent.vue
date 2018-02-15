<!-- src/components/BooksComponent.vue -->

<template>
    <main>
        <message-component :updateMessageBox="updateMessageBox" :currentMessage="messageBox" />
        <new-book-component :updateMessageBox="updateMessageBox" />
        <book-list-page-component :updateMessageBox="updateMessageBox" />
        
        <button @click="saveToFile($event)">speichern</button>
        <button @click="loadFromFile($event)">laden</button>
        <!-- <button @click="importBooks($event)">import</button> -->
        
    </main>
</template>

<script lang="ts">

import Vue from "vue"
import MessageComponent from "./MessageComponent.vue"
import NewBookComponent from "./NewBookComponent.vue"
import BookListPageComponent from "./BookListPageComponent.vue"
import axios from "axios"

import Vuex from 'vuex'
Vue.use(Vuex)

import Book from "../Book"
import Books from "../Books"
import book_import from '../book_import'

export default Vue.extend({
    data() {
        return {
            fileName: 'booklist.json',
            messageBox: { text: '', typ: 'none' }
        }
    },
    mounted() {
        this.loadFromFile()
    },
    methods: {
        updateMessageBox( status ) {
            this.messageBox = status
        },
        buildForm()
        {
            const fileData = JSON.stringify( this.$store.getters.getBooks )
            console.log( fileData )
            const myFile = new File( [ fileData ], this.fileName, {
                type: "text/json"
            })
            const formData = new FormData()
            formData.append( 'fileInput', myFile )
            return formData
        },
        saveToFile() 
        {
            axios.post( 'http://localhost:3000/', this.buildForm() )
            .then(response => {
                console.log( "post_response", response )
            })
            .catch(e => {
                console.log( 'post_errors', e )
            })
        },
        loadFromFile()
        { 
            //console.log( 'store', this.$store.getters.getBooks )
            const fullDownloadPath = 'http://localhost:3000/uploads/' + this.fileName
            axios.get( fullDownloadPath )
            .then( ( response ) => {
                //console.log( 'books', response.data )
                this.$store.dispatch( 'ADD_BOOKS', response.data )
                .then( 
                    ( result ) => 
                    { 
                        this.$store.dispatch( 'MESSAGE_BOX_VISIBLE', false )
                        this.updateMessageBox( { 'text': result, 'typ': 'success' } ) 
                    },
                    ( error ) => 
                    {
                        this.$store.dispatch( 'MESSAGE_BOX_VISIBLE', false )
                        this.updateMessageBox( { 'text': error, 'typ': 'error' } )
                    }
                )    
            });
        }, 
        importBooks()
        {
            console.group( 'import' )
            console.log( 'import', book_import )
            for( let b of book_import)
                this.$store.dispatch( 'ADD_BOOK', new Book(b.isbn, b.title, [ b.authors[0] ], b.pages) )    
            console.groupEnd()                   
        }
    },
    components: {
        NewBookComponent,
        BookListPageComponent,
        MessageComponent
    }
})
</script>

<style>
main {
    padding-top: 4.25em;
    padding-bottom: 3.75em;
}
</style>
