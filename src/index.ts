// src/index.ts

import Vue from "vue";
import BooksComponent from "./components/BooksComponent.vue";
import NavigationComponent from "./components/NavigationComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div id="container">
        <header-component />
        <navigation-component />
        <books-component />
        <footer-component />
    </div>
    `,
    data() { 
        return {
            // booklist: new Books()
        }     
    },
    components: {
        BooksComponent,
        NavigationComponent,
        HeaderComponent,
        FooterComponent
    }
});