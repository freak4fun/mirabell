// src/index.ts


import Vue from "vue";
import BooksComponent from "./components/BooksComponent.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        <books-component />
    </div>
    `,
    data() { 
        return {
            // booklist: new Books()
        }     
    },
    components: {
        BooksComponent,
    }
});