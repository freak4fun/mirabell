<!-- src/components/NavigationComponent.vue -->

<template>
    <nav>
         <p>
            Home | New Book | <span class="active-link">Books Overview</span>
        </p>
    </nav>    
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
    
})
</script>

<style>
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
