<!-- src/components/MessageComponent.vue -->

<template>
    <div v-show="currentMessage.show" id="message-box" class="message-box" :class="this.showClass" @click="closeMessage">
        {{ currentMessage.text }}
    </div> 
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
    props: ['currentMessage', 'updateMessageBox'],
    data() {
        return {
            showClass: {
                'message-box-error': false,
                'message-box-success': false,
                'message-box-info': false,
                'message-box-warning': true
            }
        }
    },
    methods: {
        closeMessage()
        {
            this.currentMessage.show = false
            this.updateMessageBox( this.currentMessage )
        }
    },
    watch: {
        messageProp: function() 
        {
            const prefix = 'message-box-'
            this.showClass[ prefix + 'error' ] = this.currentMessage.typ == 'error'
            this.showClass[ prefix + 'success' ] = this.currentMessage.typ == 'success'
            this.showClass[ prefix + 'info' ] = this.currentMessage.typ == 'info'
            this.showClass[ prefix + 'warning' ] = this.currentMessage.typ == 'warning'
        }
    }
})
</script>

<style>
.message-box-error {
    background-color: #F05B47;
}
.message-box-success {
    background-color: #BCC747;
}
.message-box-warning {
    background-color: #FFD041;
}
.message-box-info {
    background-color: #69D2E7;
}
#message-box {
    padding: 1.5em;
    border-radius: 5px; 
    width: 50%;
    text-align: center;
    margin: 0 auto 1em auto;
    border: 1px solid transparent;
}
</style>
