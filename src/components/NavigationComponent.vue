<!-- src/components/NavigationComponent.vue -->

<template>
    <nav>
         <p>
            Home | New Book | Books Overview | <a href="#" v-if="isLoggedIn" @click="logout"><i class="fas fa-sign-out-alt"></i></a>
            <a href="#" v-if="!isLoggedIn" @click="login"><i class="fas fa-sign-in-alt"></i></a>
        </p>
    </nav>    
</template>

<script lang="ts">
import Vue from "vue"

import Vuex from 'vuex'
Vue.use(Vuex)

export default Vue.extend({
    computed: {
        isLoggedIn(): boolean {
            return this.$store.getters.isLoggedIn
        }    
    },
    methods: {
        logout() {
            this.$store.dispatch( 'logout' )
        },
        login() {
            this.$store.dispatch( 'login' )
        }
    }    
})
</script>

<style>
a {
    text-decoration: none;
    color: black;
    border: 1px solid black;
    border-radius: 3px;
    padding: 1px 13px;
    background-color: #C4D4AF;
}
nav {
    border-bottom: 1px solid #493621;
    background-color: #F0A830;
    color: #493621;
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
    width: 100%;
    text-align: center;
    z-index: 1000;
}
.active-link {
    color: #F8E1B4;
}
</style>
