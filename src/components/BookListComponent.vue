<!-- src/components/BookListComponent.vue -->

<template>
    <div id="book-table"><!-- BookListComponent -->
        <div id="add-book" @click="toggleViewShowBook">New Book</div><!-- Add Book Button -->
        <div id="book-table-top"><!-- Table-Header -->
            Books Overview 
        </div>
        <div id="book-table-body"><!-- body -->
            <div class="head-row"><!-- Head-Row -->
                <div class="number"> # </div>
                <div class="title"> Title </div>
                <div class="author"> Author </div>
                <div class="isbn"> ISBN </div>    
                <div class="pages"> Pages </div>
            </div>
            <div :key="value.isbn" v-for="(value, index) in this.booklist" :class="{'even-row': index % 2, 'odd-row': !(index % 2)}">
                <div class="number"> {{ index+1 | formatNumber }} </div>
                <div class="title"> {{ value.title }} </div>
                <div class="author"> {{ value.authors[ 0 ] }} </div>
                <div class="isbn"> {{ value.isbn | formatIsbn }} </div>    
                <div class="pages"> {{ value.pages }} </div>
            </div>
        </div> 
        <div id="book-table-foot"><!-- Table-Footer -->
            <div class="number"></div> 
            <div class="title"></div>  
            <div class="author"></div>  
            <div class="isbn"><strong>Sum of Pages:</strong> </div>  
            <div class="pages"><strong>38293</strong> </div>
        </div>
    </div>  
</template>

<script lang="ts">
// https://dribbble.com/shots/785047-Work-Project
import Vue from "vue"

export default Vue.extend({
    props: [ 'booklist', 'updateShowNewBook', 'showNewBook' ],
    data() {
        return {            
        }
    },
    filters: {
        formatNumber: function( value: number ): string 
        {
            let pages: string = value.toString()
            switch (pages.length) 
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
            this.updateShowNewBook( !this.showNewBook )
        }
    },
    computed: {
        summeSeiten: function():number 
        {
            return this.booklist.reduce( ( sumPages, currentBook ) => sumPages + currentBook.pages, 0 )
        }
    },
    components: {}
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
        padding: .25em;
    }
    .odd-row {
        background-color: #F2D8A7;
        padding: .25em;
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
