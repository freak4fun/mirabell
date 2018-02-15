<!-- src/components/BookListComponent.vue -->

<template>
    <div id="book-table-body">
        <!-- Überschriften -->
        <div class="head-row">
            <div class="number"> # </div>
            <div v-for="key in columns" @click="sortBy(key)" :class="getClass( key )" :key="key" > 
                {{ key | capitalize }} <span :class="sortOrders[key] > 0 ? 'arrow asc' : 'arrow dsc'" ></span>
            </div>
        </div>
        <!-- einzelne Bücher -->
        
        <div :key="entry[columns[2]]" v-for="(entry, index) in filteredData" :class="{'even-row': index % 2, 'odd-row': !(index % 2)}">
            <div class='number'> {{ index+1 | formatNumber }} </div> 
            <div class='title'> {{ entry[columns[0]] }} </div> 
            <div class='author'> {{ entry[columns[1]] | author }} </div> 
            <div class='isbn'> {{ entry[columns[2]] | formatIsbn }} </div>
            <div class='pages'> {{  entry[columns[3]]  }} </div> 
            
            <span v-if="isLoggedIn" @click="test()" asdf="deleteBook(entry[columns[2]])" ><i class="far fa-trash-alt fa-sm"></i></span>
        </div>
        
        <modal-component :showModal=showModal :close=close>
        <h3 slot="header">custom header</h3>
        <h3 slot="body">custom body</h3>
        <h3 slot="footer">custom footer</h3>
        </modal-component>
    </div>

</template>

<script lang="ts">
// https://dribbble.com/shots/785047-Work-Project
import Vue from "vue"
import ModalComponent from "./ModalComponent.vue"

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
            sortOrders: sortOrders,
            showModal: true
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
        author: function( value: string )
        {
            return value[ 0 ]   
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
        close: function(){
            this.showModal = false
        },
        test: function(){
            
            console.log( "modal", this.showModal ) 
            this.showModal = !this.showModal

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
        },   
        getClass: function( key: string )
        {
            //console.log( "cssClass", key )
            return {
                active: this.sortKey == key,
                title: key == '_title',
                authors: key == '_authors',
                isbn: key == '_isbn',
                pages: key == '_pages'
            }
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
            var localData = []
            //console.log( "length", this.$store.getters.getBooks.length )
            if( this.$store.getters.getBooks.length > 0 )
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
                else
                {
                    localData = this.$store.getters.getBooks
                }
                
                if (sortKey) 
                {
                    localData = localData.slice().sort(function (a, b) 
                    {
                        a = a[sortKey]
                        b = b[sortKey]
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    })
                }          
            }
            return localData
        }
    },
    components: {
        ModalComponent
    }
})
</script>

<style>
.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
}
.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid black;
}
.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid black;
}
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
        max-width: 90%;
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
</style>
