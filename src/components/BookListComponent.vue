<!-- src/components/BookListComponent.vue -->

<template>
    <div id="book-list">
        <h2>Buchliste</h2>

        <ul id="booklist">
            <li class="head">
                <div class="number">#</div>
                <div class="title">Titel</div>
                <div class="author">Autor</div>
                <div class="isbn">ISBN</div>    
                <div class="pages">Seiten</div>
            </li>
            <li v-for="(value, key) in this.booklist">
                <div class="number"> {{ key+1 | formatNumber }} </div>
                <div class="title"> {{ value.title }} </div>
                <div class="author"> {{ value.authors[ 0 ] }} </div>
                <div class="isbn"> {{ value.isbn | formatIsbn }} </div>    
                <div class="pages"> {{ value.pages }} </div>
            </li>
            <li>
                <div class="number"></div>
                <div class="title"></div>
                <div class="author"></div>
                <div class="isbn"></div>    
                <div class="pages">{{summeSeiten}}</div>
            </li>
            
        </ul>

    </div>
</template>

<script lang="ts">
// https://dribbble.com/shots/785047-Work-Project
import Vue from "vue"

export default Vue.extend({
    props: [ 'booklist' ],
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
#book-list {
    background-color: whitesmoke;
    padding: 5px;
    border: 1px dashed black;
}
#booklist {
    list-style: none;
    cursor: default;
}
#booklist li {
    background-color: white;
    border: 1px solid gainsboro;
    padding: 5px;
    border-radius: 3px;
    margin-bottom: 3px;
    box-shadow: 3px 3px 1px grey;
}
#booklist li:hover {
    background-color: gainsboro;
}
#booklist .head {
    background-color: #39414D;
    color: white;
    font-weight: bold;
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
</style>
