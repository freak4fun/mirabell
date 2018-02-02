<!-- src/components/BooksComponent.vue -->

<template>
    <main>
        <message-component :updateMessageBox="updateMessageBox" :currentMessage="messageBox" />
        <new-book-component :updateMessageBox="updateMessageBox" />
        <book-list-component :updateMessageBox="updateMessageBox" />
        
        <button @click="saveToFile($event)">speichern</button>
        <button @click="loadFromFile($event)">laden</button>
        <button @click="importBooks($event)">import</button>
        <br />
        <br />
        <button @click="test($event)">test</button>
        
    </main>
</template>

<script lang="ts">

import Vue from "vue"
import MessageComponent from "./MessageComponent.vue"
import NewBookComponent from "./NewBookComponent.vue"
import BookListComponent from "./BookListComponent.vue"
import axios from "axios"

import Vuex from 'vuex'
Vue.use(Vuex)

import Book from "../Book"
import Books from "../Books"
import book_import from '../book_import'

export default Vue.extend({
    data() {
        return {
            fileName: 'booklist.json',
            messageBox: { 'text': '', 'typ': 'none' }
        }
    },
    mounted() {
        this.loadFromFile()
    },
    methods: {
        updateMessageBox( status ) {
            this.messageBox = status
        },
        buildForm()
        {
            const fileData = JSON.stringify( this.$store.getters.getBooks )
            console.log( fileData )
            const myFile = new File( [ fileData ], this.fileName, {
                type: "text/json"
            })
            const formData = new FormData()
            formData.append( 'fileInput', myFile )
            return formData
        },
        saveToFile() 
        {
            axios.post( 'http://localhost:3000/', this.buildForm() )
            .then(response => {
                console.log( "post_response", response )
            })
            .catch(e => {
                console.log( 'post_errors', e )
            })
        },
        loadFromFile()
        { 
            console.log( 'store', this.$store.getters.getBooks )
            const fullDownloadPath = 'http://localhost:3000/uploads/' + this.fileName
            axios.get( fullDownloadPath )
            .then( ( response ) => {
                this.$store.dispatch( 'ADD_BOOKS', response.data )
                .then( 
                    ( result ) => 
                    { 
                        this.$store.dispatch( 'MESSAGE_BOX_VISIBLE', false )
                        this.updateMessageBox( { 'text': result, 'typ': 'success' } ) 
                    },
                    ( error ) => 
                    {
                        this.$store.dispatch( 'MESSAGE_BOX_VISIBLE', false )
                        this.updateMessageBox( { 'text': error, 'typ': 'error' } )
                    }
                )    
            });
        }, 
        importBooks()
        {
            console.group( 'import' )
            console.log( 'import', book_import )
            for( let b of book_import)
                this.$store.dispatch( 'ADD_BOOK', new Book(b.isbn, b.title, [ b.authors[0] ], b.pages) )
                                
        },     
        test: function()
        {
            // https://www.eurobuch.de/
            // --- Bücher vestätigen !!!

            let booksToAdd = [
                { isbn: '9783492311113', authors: [ 'Frederik T. Olsson' ], title: 'Das Netz',                          pages: 672 },
                { isbn: '9783499291333', authors: [ 'Daniel Suarez' ],      title: 'Bios',                              pages: 544 },
                { isbn: '9783644442917', authors: [ 'Daniel Suarez' ],      title: 'Darknet',                           pages: 480 },
                { isbn: '9783644525313', authors: [ 'Daniel Suarez' ],      title: 'Control',                           pages: 496 },
                { isbn: '9783644442818', authors: [ 'Daniel Suarez' ],      title: 'Daemon',                            pages: 640 },
                { isbn: '9783644495715', authors: [ 'Daniel Suarez' ],      title: 'Kill Decision',                     pages: 496 },
                { isbn: '9783462307931', authors: [ 'Tom Hillenbrand' ],    title: 'Drohnenland',                       pages: 432 },
                { isbn: '9783462308204', authors: [ 'Dave Eggers' ],        title: 'Der Circle',                        pages: 560 },
                { isbn: '9783641074319', authors: [ 'Marc Elsberg' ],       title: 'BLACKOUT - Morgen ist es zu spät',  pages: 800 },
                { isbn: '9783492978026', authors: [ 'Andreas Brandhorst' ], title: 'Das Erwachen',                      pages: 736 },
                { isbn: '978-3-442-48344-0', authors: [ 'Dan Sehlberg' ],   title: 'Mona',                              pages: 512 },
                { isbn: '9783644557116', authors: [ 'Patrick Lee' ],        title: 'Das Signal',                        pages: 464 },
                { isbn: '978-3-7341-0093-2', authors: [ 'Marc Elsberg' ],   title: 'ZERO - Sie wissen, was du tust',    pages: 496 },
                { isbn: '9783426439890', authors: [ 'Veit Etzold' ],        title: 'Dark Web',                          pages: 592 },
                { isbn: '9783841211309', authors: [ 'Karl Olsberg' ],       title: 'Mirror',                            pages: 400 }, 
                { isbn: '9783827076731', authors: [ 'Karl Olsberg' ],       title: 'Delete',                            pages: 464 },          
                { isbn: '9783833310058', authors: [ 'Karl Olsberg' ],       title: 'Enter',                             pages: 432 },            
                { isbn: '9783746623672', authors: [ 'Karl Olsberg' ],       title: 'Das System',                        pages: 367 },            
                { isbn: '9783746626895', authors: [ 'Karl Olsberg' ],       title: 'Glanz',                             pages: 400 },            
                { isbn: '9783499239410', authors: [ 'Adam Fawer' ],         title: 'Null',                              pages: 585 },            
                { isbn: '9783442480593', authors: [ 'Drew Chapman' ],       title: 'Der Analyst',                       pages: 544 },            
                { isbn: '9783641481797', authors: [ 'Drew Chapman' ],       title: 'Der Trader',                        pages: 544 },
                { isbn: '9783426509760', authors: [ 'Anthony Francis' ],    title: 'Skindancer: Magisches Tattoo',      pages: 412 },
                { isbn: '9783570309612', authors: [ 'James Dashner' ],      title: 'Tödliches Netz',                    pages: 416 },           
                { isbn: '9783570309636', authors: [ 'James Dashner' ],      title: 'Das Spiel ist aus',                 pages: 448 },            
                { isbn: '9783641140021', authors: [ 'James Dashner' ],      title: 'Gegen die Spielregeln',             pages: 416 },            
                { isbn: '9783641156992', authors: [ 'Ramez Naam' ],         title: 'Crux',                              pages: 752 },           
                { isbn: '9783453315600', authors: [ 'Ramez Naam' ],         title: 'Nexus',                             pages: 624 },            
                { isbn: ' 9783404206070', authors: [ 'Jim C. Hines' ],      title: 'Drei Engel für Armand',             pages: 445 },            
                { isbn: '9783838702476', authors: [ 'Stephan Russbült' ],   title: 'Die Oger',                          pages: 496 },            
                { isbn: '9783641134792', authors: [ 'Will Jordan' ],        title: 'Operation Black List',              pages: 544 },     

                { isbn: '9783453316485', authors: [ 'Thomas Carl Sweterlitsch' ], title: 'Tomorrow & Tomorrow',         pages: 480 },            
                { isbn: '9783404207091', authors: [ 'Peter F. Hamilton' ],  title: 'Die Dämonenfalle',                  pages: 352 },            
                { isbn: '9783734101731', authors: [ 'Bruce McCabe' ],       title: 'Unfehlbar',                         pages: 512 },            
                { isbn: '9783426519912', authors: [ 'Thore D. Hansen' ],    title: 'Silent Control',                    pages: 496 },            
            //  { isbn: ' 978-3940626356', authors: [ 'William Hertling' ], title: 'Avogadro Corp.', pages: 308 },            
                { isbn: '9783959811446', authors: [ 'Vernor Vinge' ],       title: 'Das Ende des Regenbogens',          pages: 450 },            
                { isbn: '9783596186143', authors: [ 'Barry Eisler' ],       title: 'Todescode',                         pages: 368 },            
                { isbn: '9783784433608', authors: [ 'James Douglas' ],      title: 'Totale Kontrolle',                  pages: 395 },            
                { isbn: '9783453317161', authors: [ 'Cixin Liu' ],          title: 'Die drei Sonnen',                   pages: 592 },            
                { isbn: '9783404606931', authors: [ 'James Bowen' ],        title: 'Bob, der Streuner',                 pages: 252 },            
                { isbn: '9783861902799', authors: [ 'Richard A. Clarke' ],  title: 'Break Point',                       pages: 317 },            

                { isbn: '9783492266857', authors: [ 'Jeff Carlson' ],       title: 'Plasma',                            pages: 416 },            
                { isbn: '9783865522368', authors: [ 'Ben Coes' ],           title: 'Power Down - Zielscheibe USA',      pages: 608 }            
                
//              { isbn: '', authors: [ '' ], title: '', pages:  }            
            ]   
  
        }
    },
    components: {
        NewBookComponent,
        BookListComponent,
        MessageComponent
    }
})
</script>

<style>
main {
    padding-top: 4.25em;
    padding-bottom: 3.75em;
}
</style>
