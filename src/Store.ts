import Vue from 'vue'
import Vuex from 'vuex'

import { IBook } from './SimpleBook'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        books: new Array<IBook>()
    },
    actions: {
        ADD_BOOK: function( { commit }, new_book ): boolean {
            console.log( "actions ADD_BOOK", new_book )
            var set_book = {
                book: new_book
            }   
            commit( 'ADD_BOOK_MUTATION', set_book )     
            return false
        },
        GET_BOOK: function( { commit }, isbn ) {

                commit( 'ADD_BOOK_MUTATION', isbn  )
        }
    },
    mutations: {
        ADD_BOOK_MUTATION: function( state, book )
        {
            console.log( "mutations ADD_BOOK_MUTATION", book )
            state.books.push( book )
        },
        GET_BOOK_MUTATION: function( state, isbn )
        {
            console.log( "mutations GET_BOOK_MUTATION", isbn )
            //state.books.push( book )
        }
    },
    getters: {
        book_by_isbn: state => {
            console.log( "book_by_isbn", state.books )
            var filtered = state.books.filter(function(el){
                return true //el.isbn == isbn
            })
            return filtered
        },
        all_books: state => {
            console.log( "getters all_books", state.books )
            var filtered = state.books.filter(function(el){
                return true   
            })
            return filtered
        }
    }    
})

export default store;