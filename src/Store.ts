import Vue from 'vue'
import Vuex from 'vuex'

import { IBook } from './SimpleBook'
import Book from "./Book"
import Books from "./Books"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        books: new Books()
    },
    actions: {
        ADD_BOOK: function( { commit }, new_book: Book ) {
            return new Promise( ( resolve, reject ) => {
                setTimeout( 
					() => { 
                        if( store.state.books.indexOfIsbn( new_book.isbn ) == -1 )
                        {
                            commit( 'SET_BOOK', new_book )
                            resolve( "'" + new_book.isbn + "' was added." )
                        } 
                        else
                        {
                            reject( "Sorry! '" + new_book.isbn + "' already in list." )
                        }
                    })        
                })
        },
        GET_BOOK: function( { commit }, isbn ) {

                commit( 'ADD_BOOK_MUTATION', isbn  )
        }
    },
    mutations: {
        SET_BOOK: function( state, book )
        {
            console.log( "mutations ADD_BOOK_MUTATION", book )
            state.books.addBook( book )
        },
        GET_BOOK_MUTATION: function( state, isbn )
        {
            console.log( "mutations GET_BOOK_MUTATION", isbn )
            //state.books.push( book )
        }
    },
    getters: {
        book_by_isbn: state => {
            return state.books.getBooks()
        },
        all_books: state => {
            return state.books.getBooks()
        },
        all: state => {
            return state.books
        },        
        getBookByIsbn: (state, getters) => ( isbn ) => {
            return store.state.books.getBookByIsbn( isbn )
        }
          

    }    
})

export default store;