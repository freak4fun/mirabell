import Vue from 'vue'
import Vuex from 'vuex'

import Book from "./Book"
import Books from "./Books"

Vue.use(Vuex)
// https://vuex.vuejs.org/en/api.html
// https://scotch.io/tutorials/state-management-in-vue-getting-started-with-vue
const store = new Vuex.Store({
    state: {
        books: new Books(),
        settings: {
            showMessageBox: {
                status: false,
                text: '',
                typ: ''
            },
            showNewBook: false,
            isLoggedIn: false //!!localStorage.getItem(“token”)
        }
    },
    actions: {
        ADD_BOOK: function( { commit }, new_book: Book ) {
            return new Promise( ( resolve, reject ) => {
                if( store.state.books.indexOfIsbn( new_book.isbn ) == -1 ) {
                    commit( 'SET_BOOK', new_book )
                    resolve( "'" + new_book.isbn + "' was added." )
                } else {
                    reject( "Sorry! '" + new_book.isbn + "' already in list." )
                }
            })
		},
		ADD_BOOKS: function( { commit }, books: Book[] ) {
            return new Promise( ( resolve, reject ) => {
                commit( 'SET_BOOKS', books )
                resolve( "Books set successfully." )
            })
		},
		DELETE_BOOK: function( { commit }, isbn: string ) {
            return new Promise( ( resolve, reject ) => {
				if( store.state.books.indexOfIsbn( isbn ) != -1 ) {
                    commit( 'REMOVE_BOOK', isbn )
                    resolve( "Book was deleted." )
                } else {
                    reject( "Sorry! There is nothing to delete." )
                }
            })
        },
        // -----
        MESSAGE_BOX_VISIBLE: function( { commit }, isVisible: boolean ) {
            if( isVisible )
            {
                console.log( setTimeout(() => {
                    commit( 'SET_MESSAGE_BOX_VISIBLE', false )    
                }, 5000) );
            }
            commit( 'SET_MESSAGE_BOX_VISIBLE', isVisible )
		},
		 // -----
        NEW_BOOK_VISIBLE: function( { commit }, isVisible: boolean ) {
            commit( 'SET_NEW_BOOK_VISIBLE', isVisible )
        },
        /* begin login */
        login( { commit } ) {
            commit( 'LOGIN_MUTATION' ) // show spinner
            localStorage.setItem( 'token', 'JWT' )
        },
        logout( { commit } ) {
            localStorage.removeItem( 'token' )
            commit( 'LOGOUT_MUTATION' )
        }
		/* ende login */
    },
    mutations: {
        /* start Login */
        LOGIN_MUTATION: (state) => {
            state.settings.isLoggedIn = true
        },
        LOGOUT_MUTATION: (state) => {
            state.settings.isLoggedIn = false
        },
        /* ende login */
        SET_BOOK: function( state, book )
        {
            state.books.addBook( book )
		},
		SET_BOOKS: function( state, books )
        {
			console.log( 'books', books )
			state.books.setBooks( books )
		},
		REMOVE_BOOK: function( state, isbn )
        {
            state.books.deleteBookByIsbn( isbn )
        },
		SET_MESSAGE_BOX_VISIBLE: function( state, isVisible )
        {
            state.settings.showMessageBox.status = isVisible
        },
        SET_NEW_BOOK_VISIBLE: function( state, isVisible )
        {
            state.settings.showNewBook = isVisible
        }
    },
    getters: {
        getBooks: state => {
            return state.books.getBooks()
        },
        getBookByIsbn: (state, getters) => ( isbn ) => {
            return state.books.getBookByIsbn( isbn )
        },
        // -----
        messageBoxIsVisible: state => {
            return state.settings.showMessageBox.status
        },
        // -----
        newBookIsVisible: state => {
            return state.settings.showNewBook
        },
        isLoggedIn: state => {
            return state.settings.isLoggedIn
        }
    }    
})

export default store;