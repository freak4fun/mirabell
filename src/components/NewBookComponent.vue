<!-- src/components/BookComponent.vue -->

<template>
    <div id="book-container" v-show="this.isVisible"><!-- -->
        <table><!-- BookComponent -->
            <tr>
                <td colspan="2" style="text-align: center;">
                    <div class="highlight">Add new Book</div>
                </td>
            <tr>
                <td class="caption">
                    <label for="book_title">Title</label>
                </td>
                <td>
                    <input type="text" v-model="title" class="book-input" id="book_title" />
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <label for="book_author">Author</label>
                </td>
                <td>
                    <input type="text" v-model="author" class="book-input" id="book_author" />
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <label for="book_isbn">ISBN</label>
                </td>
                <td>
                    <input type="text" v-model="isbn" class="book-input" id="book_isbn" />
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <label for="book_pages">Pages</label>
                </td>
                <td>
                    <input type="text" v-model="pages" class="book-input" id="book_pages" />
                </td>
            </tr>
            <tr>
                <td colspan="2" class="button-row">
                    <button @click="saveBook()" class="book-button" >Speichern</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from "vue"

import Vuex from 'vuex'
Vue.use(Vuex)

import Book from "../Book"
import Books from "../Books"

export default Vue.extend({
    props: [ 'updateMessageBox' ],
    data() {
        return {
            title: "",
            pages: 0,
            author: "",
            isbn: ""
        }
    },
    watch: {
        isbn: function ( newValue, oldValue ) 
        {
            this.isbn = newValue.replace( /-/g, '' ).replace( / /g, '' )
        }
    },
    computed: {
        isVisible(): boolean
        {            
            return this.$store.getters.newBookIsVisible
        }
    },
    methods: {
        addBook( book: Book )
        {
            this.$store.dispatch( 'ADD_BOOK', book )
            .then( 
                ( result ) => 
                { 
                    this.$store.dispatch( 'MESSAGE_BOX_VISIBLE', true )
                    this.updateMessageBox( { 'text': result, 'typ': 'success' } ) 
                },
                ( error ) => 
                {
                    this.$store.dispatch( 'MESSAGE_BOX_VISIBLE', true )
                    this.updateMessageBox( { 'text': error, 'typ': 'error' } )
                }
            )
        },
        saveBook()
        {
            const validateIsbn = ( isbn ): boolean => {
                let summe = isbn.split( '' ).reduce( ( sum, letter, index ) => 
                {
                    if( index < 12 )
                    {
                        if( index % 2 == 0 )
                        {
                            return sum += +letter * 1
                        }
                        else
                        {
                            return sum += +letter * 3
                        }
                    }
                    return sum
                }, 0 )
                return ( 10 - ( ( summe % 10 ) % 10 ) ) === +isbn[ 12 ] 
            }

            this.author = this.author.trim()
            this.title  = this.title.trim()

            if( this.isbn.length == 0 )
            {
                this.$store.dispatch( 'MESSAGE_BOX_VISIBLE', true )
                this.updateMessageBox( { 'text': 'Bitte geben Sie eine ISBN ein.', 'typ': 'error' } )
                return
            }
            
            if( this.isbn.length != 13 )
            {
                this.$store.dispatch( 'MESSAGE_BOX_VISIBLE', true )
                this.updateMessageBox( { 'text': 'Die ISBN muss genau 13 Zeichen lang sein!', 'typ': 'error' } )
                return
            }

            if( !validateIsbn( this.isbn ) )
            {
                this.$store.dispatch( 'MESSAGE_BOX_VISIBLE', true )
                this.updateMessageBox( { 'text': 'Die Prüfziffern stimmen nicht überein!', 'typ': 'error' } )
                return
            }

            this.addBook( new Book( this.isbn, this.title, [ this.author ], this.pages ) )
        }
    }
})
</script>

<style>
.highlight {
    font-weight: bold;
    font-size: 20px;
}

.caption {
    text-align: right;
    font-weight: bold;
}

.button-row {
    text-align: right;    
}

input.book-input {
    border-style: dashed;
    border-color: #493621;
    border-width: 0 0 1px 0;
    background-color: transparent; /* rgba(192,175,128, 0.15); */
    padding: 3px;
    outline: none;
    width: 300px;
}

button.book-button {
    border-style: solid;
    border-color: #493621;
    border-width: 1px; 
    background-color: #C4D4AF;
    border-radius: 0 5px;
    cursor: pointer;
    padding: 5px;
    width: 75px;
    outline: none;
    margin-top: 0.25em;
}

button.book-delete-button {
    border-style: solid;
    border-color: #493621;
    border-width: 1px; 
    background-color: #C4D4AF;
    border-radius: 0 5px;
    cursor: pointer;
    padding: 5px;
    outline: none;
    margin-top: 0.25em;
}

#book-container {
    margin: 1em auto;
    max-width: 60%;
    color: #493621;
}

table {
    margin: auto;
}
</style>
