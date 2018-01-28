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
                    <button @click="toggleShow()" class="book-button" >Speichern</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import { IBook, addIfNotInList } from "../SimpleBook"

export default Vue.extend({
    props: [ 'booklist', 'updateMessageBox', 'showNewBook' ],
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
        toggleShow()
        {
            this.updateMessageBox( { 'text': 'Oh, oh! Da ist wohl etwas schief gelaufen.', 'typ': 'error', 'show': true } )
        },
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
