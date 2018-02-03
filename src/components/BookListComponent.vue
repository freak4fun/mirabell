<!-- src/components/BookListComponent.vue -->

<template>
    <div id="book-table"><!-- Bücherliste -->
       <div id="add-book" v-if="isLoggedIn" @click="toggleViewShowBook"><i class="far fa-plus-square fa-2x"></i></div><!-- Buch hinzufügen ein-/ausblenden -->
        <div id="book-table-top">
            Books Overview 
        </div>
        <div id="book-table-body">
            <!-- Überschriften -->
            <div class="head-row">
                <div class="number"> # </div>
                <div class="title"> Title </div>
                <div class="author"> Author </div>
                <div class="isbn"> ISBN </div>    
                <div class="pages"> Pages </div>
            </div>
            <!-- einzelne Bücher -->
            <div :key="value.isbn" v-for="(value, index) in this.$store.getters.getBooks" :class="{'even-row': index % 2, 'odd-row': !(index % 2)}">
                <div class="number"> {{ index+1 | formatNumber }} </div>
                <div class="title"> {{ value.title }} </div>
                <div class="author"> {{ value.author }} </div>
                <div class="isbn"> {{ value.isbn | formatIsbn }} </div>    
                <div class="pages"> {{ value.pages }} </div>
                
                <span v-if="isLoggedIn" @click="deleteBook(value.isbn)"><i class="far fa-trash-alt fa-sm"></i></span>
            </div>
        </div> 
        <!-- Fuß-Zeile -->
        <div id="book-table-foot">
            <div class="number"></div> 
            <div class="title"></div>  
            <div class="author"></div>  
            <div class="isbn"><strong>Sum of Pages:</strong> </div>  
            <div class="pages"><strong>{{summeSeiten}}</strong> </div>
        </div>
    </div>  
</template>

<script lang="ts">
// https://dribbble.com/shots/785047-Work-Project
import Vue from "vue"

import Vuex from 'vuex'
Vue.use(Vuex)

export default Vue.extend({
    props: [ 'updateMessageBox' ],
    filters: {
        formatNumber: function( value: number ): string 
        {
            let pages: string = value.toString()
            switch( pages.length ) 
            {
                case 1:
                    return '00' + pages
                case 2:
                    return '0' + pages
                default:
                    return pages
            }
        },
        formatIsbn: function( isbn: string ): string
        {
            let isbnParts = []
            isbnParts.push( isbn.substring(  0,  3 ) )
            isbnParts.push( isbn.substring(  3,  4 ) )
            isbnParts.push( isbn.substring(  4,  9 ) )
            isbnParts.push( isbn.substring(  9, 12 ) )
            isbnParts.push( isbn.substring( 12, 13 ) )

            return isbnParts.join( '-' )
        }
    },
    methods: 
    {
        toggleViewShowBook( )
        {
            const isNewBookVisible: boolean = this.$store.getters.newBookIsVisible
            this.$store.dispatch( 'NEW_BOOK_VISIBLE', !isNewBookVisible )
        },
        deleteBook( isbn )
        {
            console.log( isbn )
            this.$store.dispatch( 'DELETE_BOOK', isbn )
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
        }
    },
    computed: {
        summeSeiten: function():number 
        {
            return this.$store.getters.getBooks.reduce( ( sumPages, currentBook ) => 
            {
                return sumPages + +currentBook.pages
            }, 0 )
        },
        isLoggedIn: function(): boolean {
            return this.$store.getters.isLoggedIn
        }    
    }
})
</script>

<style>
   #book-table-top {
        background-color: #BFAF80;
        color: #493621;
        border-radius: 5px 5px 0 0; 
        padding: 1.5em;
        font-weight: bold; 
    }
    #book-table-foot {
        background-color: #BFAF80;
        padding: .25em;
        border-top: 1px solid #493621;
        border-radius: 0 0 5px 5px; 
    }
    #book-table {
        border: 1px solid #493621;
        background-color: #C4D4AF;
        border-radius: 5px; 
        text-align: center;
        margin: auto;
        margin-bottom: 0.5em;
        max-width: 60%;
        position: relative;
    }
    .active-link {
        color: #F8E1B4;
    }
    .even-row {
        background-color: #F8E1B4;
        padding: 3px;
    }
    .odd-row {
        background-color: #F2D8A7;
        padding: 3px;
    }
    .head-row {
        font-weight: bold;
        padding: .25em;
        border-bottom: 1px solid #493621;
        border-top: 1px solid #493621;
    }
    .head-row .author {
        min-width: 200px;
        text-align: center;
    }
    .odd-row:hover, .even-row:hover {
        background-color: #BCC747;
    }
    .number, .author, .title, .isbn, .pages {
        display: inline-block;
    }
    .number {
        min-width: 60px;
        max-width: 80px;
        text-align: center;
    }
    .title {
        font-weight: bold;
        min-width: 480px;
        text-align: left;
    }
    .author {
        min-width: 200px;
        text-align: left;
    }
    .isbn {
        min-width: 130px;
        text-align: center;
    }
    .pages {
        min-width: 85px;
        text-align: center;
    }  
    #add-book {
        position: absolute;
        top: -1px;
        right: -1px;
        border-style: solid;
        border-color: #493621;
        border-width: 1px; 
        padding: 10px;    
        border-radius: 0 5px;
        background-color: #C4D4AF;
        cursor: pointer;
    }
    .active {
        background-color: white !important;
    }
</style>
