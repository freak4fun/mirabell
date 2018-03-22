<!-- src/components/NavigationComponent.vue -->

<template>
    <span>
    <nav>
         <p>
            Home | New Book | Books Overview | <a href="#" v-if="isLoggedIn" @click="logout"><i class="fas fa-sign-out-alt"></i></a>
            <a href="#" v-if="!isLoggedIn" @click="login"><i class="fas fa-sign-in-alt"></i></a>
        </p>
    </nav>   

    <modal-component :showModal=showModal :close=close>
        <h3 slot="header">Login</h3>
        <h3 slot="body">
            Passwort: <input type="password" v-model="pwd" />
        </h3>
        <h3 slot="buttons">
            <button class="modal-default-button" @click="close()">
                Abbrechen
            </button>
            <button class="modal-default-button" @click="login()">
                OK
            </button>
        </h3>
        <h3 slot="footer"></h3>
    </modal-component>
    </span>

</template>

<script lang="ts">
import Vue from "vue"

import Vuex from 'vuex'
Vue.use(Vuex)

import ModalComponent from "./ModalComponent.vue"
import crypto  from "crypto-js"
import axios from "axios"

export default Vue.extend({
     data:function(){
        return {
            showModal: false,
            pwd: ''
        }
     },
    computed: {
        isLoggedIn(): boolean {
            return this.$store.getters.isLoggedIn
        }    
    },
    methods: {
        close: function(){
            this.showModal = false
        },
        logout() {
            this.$store.dispatch( 'logout' )
        },
        login() {
            //var token = crypto.MD5( this.pwd ).toString()
            
            this.showModal = true

            axios.get( 'http://localhost:3000/auth/' + crypto.MD5( this.pwd ).toString() )
            .then( ( response ) => {
                console.log( 'auth', response.data, crypto.MD5( 'secret' ).toString() )  
                if( response.data === true )
                {
                    this.$store.dispatch( 'login' )
                    this.pwd = ''
                    this.close()
                }
                //console.log( 'auth', response.data, crypto.MD5( 'secret' ).toString() )                    
            })
        }
    },
    components: {
        ModalComponent
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
.modal-default-button {
    border: 1px solid black;
    padding: 3px;
    margin: 3px;
    min-width: 50px;
}
</style>
