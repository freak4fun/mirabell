<!-- src/components/BookListComponent.vue -->

<template>
    <div id="book-table-body">
        <!-- Überschriften -->
        <div class="head-row">
            <div v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key, key: true }" :key="key" >
                <div :class="tc( key )"> {{ key | capitalize }} <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span> </div>
            </div>
            <!--
            <div class="number"> # </div>
            <div class="title"> Title </div>
            <div class="author"> Author </div>
            <div class="isbn"> ISBN </div>    
            <div class="pages"> Pages </div>
            -->
        </div>
        <!-- einzelne Bücher -->
        <div :key="entry[columns[2]]" v-for="(entry, index) in filteredData" :class="{'even-row': index % 2, 'odd-row': !(index % 2)}">
            <div class='number'> {{ index+1 | formatNumber }} </div> 
            <div class='title'> {{ entry[columns[0]] }} </div> 
            <div class='author'> {{ entry[columns[1]] }} </div> 
            <div class='isbn'> {{ entry[columns[2]] | formatIsbn }} </div>
            <div class='pages'> {{  entry[columns[3]]  }} </div> 
            
            <span v-if="isLoggedIn" @click="deleteBook(entry[columns[2]])"><i class="far fa-trash-alt fa-sm"></i></span>
        </div>
    </div>
</template>

<script lang="ts">
// https://dribbble.com/shots/785047-Work-Project
import Vue from "vue"

import Book from "../Book"
import Books from "../Books"

import Vuex from 'vuex'
Vue.use(Vuex)

export default Vue.extend({
    props: [ 'updateMessageBox' ],
    data: function() {
        let gridColumns = [ '_title', '_authors', '_isbn', '_pages' ]
        var sortOrders = {}
        gridColumns.forEach(function (key) {
            sortOrders[key] = 1
        })
        return {
            columns: gridColumns,
            filterKey: '',
            sortKey: '',
            sortOrders: sortOrders
        }
    },
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
        },
        capitalize: function( value: string )
        {
            return value.charAt(1).toUpperCase() + value.slice(2)
        }
    },
    methods: 
    {
        tc: function( value: string )
        {
            let v = value.substring(1).toLowerCase()
            console.log( 'v', v)   
            return v  
        },
        toggleViewShowBook( )
        {
            const isNewBookVisible: boolean = this.$store.getters.newBookIsVisible
            this.$store.dispatch( 'NEW_BOOK_VISIBLE', !isNewBookVisible )
        },
        deleteBook( isbn )
        {
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
        },
        sortBy: function (key) {
            this.sortKey = key
            this.sortOrders[key] = this.sortOrders[key] * -1
        }   
    },
    computed: {
        summeSeiten: function(): number 
        {
            return this.$store.getters.getBooks.reduce( ( sumPages, currentBook ) => 
            {
                return sumPages + +currentBook.pages
            }, 0 )
        },
        isLoggedIn: function(): boolean {
            return this.$store.getters.isLoggedIn
        },
        filteredData: function () 
        {
            var localData = this.$store.getters.getBooks
            console.log( "length", localData.length )
            if( localData.length > 0 )
            {
                var sortKey = this.sortKey
                var filterKey = this.filterKey && this.filterKey.toLowerCase()
                var order = this.sortOrders[sortKey] || 1
                
                if (filterKey) 
                {
                    localData = this.$store.getters.getBooks.filter(function (row) 
                    {
                        return Object.keys(row).some(function (key) 
                        {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                if (sortKey) 
                {
                    localData = this.$store.getters.getBooks.slice().sort(function (a, b) 
                    {
                        a = a[sortKey]
                        b = b[sortKey]
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    })
                }
                return localData
            }

            /*
            console.log( "length", this.$store.getters.getBooks.length )
            if( this.$store.getters.getBooks[0] )
            {
                let iterator = this.$store.getters.getBooks.keys()
                console.log( "xxx", this.$store.getters.getBooks[0]._isbn )
                for (let key of iterator) {
                    console.log(key); // expected output: 0 1 2
                }
            }
            */
            return []
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
    .number, .authors, .title, .isbn, .pages {
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
    .authors {
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
