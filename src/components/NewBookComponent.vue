<!-- src/components/BookComponent.vue -->

<template>
    <div id="book-container" v-show="showNewBook"><!-- -->
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

//import { IBook, addIfNotInList } from "../SimpleBook"
import Book from "../Book"
import Books from "../Books"

export default Vue.extend({
    props: [ 'booklist', 'updateMessageBox', 'showNewBook' ],
    data() {
        return {
            title: "",
            pages: 0,
            author: "",
            isbn: "9783492311528",
            bookInfo: ""
        }
    },
    watch: {
        isbn: function ( newValue, oldValue ) 
        {
            this.isbn = newValue.replace( /-/g, '' ).replace( / /g, '' )
        }
    },
    methods: {
        addBook( book: Book )
        {
            this.$store.dispatch( 'ADD_BOOK', book )
            .then( 
                ( result ) => 
                { 
                    this.updateMessageBox( { 'text': result, 'typ': 'success', 'show': true } ) 
                    console.log( 'getBookByIsbn', this.$store.getters.getBookByIsbn( book.isbn  ).isbn )
                },
                ( error ) => 
                {
                    this.updateMessageBox( { 'text': error, 'typ': 'error', 'show': true } )
                }
            )

        },
        toggleShow()
        {
            
            //this.addBook( { isbn: '9823942311113', authors: [ 'Frederik T. Olsson' ], title: 'Das Netz', pages: 672 } )
            //this.addBook( { isbn: '9783644525313', authors: [ 'Daniel Suarez' ], title: 'Control', pages: 496 } )
            //this.addBook( { isbn: '9783644442818', authors: [ 'Daniel Suarez' ], title: 'Daemon', pages: 640 } )

            let b1: Book = new Book(
                '9823942311113',
                'Das Netz',
                [ 'Frederik T. Olsson' ],
                672    
            )
            
            //console.log( "get_all_books", this.$store.getters.all_books )// get_book_isbn( '9783644525313' ) )
            

            //console.log( "get_all_books", this.$store.getters.book_by_isbn )// get_book_isbn( '9783644525313' ) )
            
            //console.log( "all_books", this.$store.getters.all_books )
            //console.log( "store", this.$store )
            
            // this.updateMessageBox( { 'text': 'Oh, oh! Da ist wohl etwas schief gelaufen.', 'typ': 'error', 'show': true } )

        },
        saveBook()
        {
            this.author = this.author.trim()
            this.title  = this.title.trim()

            if( this.isbn.length == 0 )
            {
                this.updateMessageBox( { 'text': 'Bitte geben Sie eine ISBN ein.', 'typ': 'error', 'show': true } )
                return
            }
            
            if( this.isbn.length != 13 )
            {
                this.updateMessageBox( { 'text': 'Die ISBN muss genau 13 Zeichen lang sein!', 'typ': 'error', 'show': true } )
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

#book-container {
    margin: 1em auto;
    max-width: 60%;
    color: #493621;
}

table {
    margin: auto;
}
</style>
