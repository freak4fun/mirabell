<!-- src/components/BookComponent.vue -->

<template>
    <div id="book-container">
        <div id="book-info" class="book-info">{{bookInfo}}</div>
        <h3>Neues Buch anlegen</h3>
        <table>
            <tr>
                <td class="caption">
                    <label for="book_title">Titel</label>
                </td>
                <td>
                    <input type="text" v-model="title" class="book-input" id="book_title" />
                </td>
            </tr>
            <tr>
                <td class="caption">
                    <label for="book_author">Autor</label>
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
                    <label for="book_pages">Seiten</label>
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
import { IBook, addIfNotInList } from "../SimpleBook"

export default Vue.extend({
    props: [ 'booklist' ],
    data() {
        return {
            title: "",
            pages: 0,
            author: "",
            isbn: "",
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
        saveBook()
        {
            this.author = this.author.trim()
            this.title  = this.title.trim()

            let currentBook: IBook = 
            {
                isbn: this.isbn,
                authors: [ this.author ],
                pages: this.pages,
                title: this.title
            }

            if( currentBook.isbn.length == 0 )
            {
                this.bookInfo = "Fehler: Bitte geben Sie eine ISBN ein."
                return
            }
            
            if( currentBook.isbn.length != 13 )
            {
                this.bookInfo = "Fehler: Die ISBN muss genau 13 Zeichen lang sein!"
                return
            }


            if( addIfNotInList( this.booklist, currentBook ) )
            {
                this.bookInfo = "Erfolg: Buch wurde eingetragen."
            }
            else
            {
                this.bookInfo = "Fehler: Ein Buch  mit der ISBN ist schon vorhanden."
            }
        }
    }
})
</script>

<style>
.caption {
    text-align: right;
    font-weight: bold;
}
.button-row {
    text-align: right;    
}
input.book-input {
    border: 1px solid dimgray;
    background-color: white;
    padding: 3px;
}
button.book-button {
    border: 1px solid dimgray;
    background-color: white;
    padding: 3px;
    width: 75px;
}
.book-info {
    padding: 1em;
    border: 1px solid black;
}
#book-container {
    background-color: gainsboro;
    padding: 5px;
    border: 1px dashed black;
}
</style>
