<!-- UI Libary: https://primevue.org/datatable/ -->
<!-- CSV Reading Libary: https://www.papaparse.com/ --> 

<template>

  <!-- <div class="card">
        <file_upload />
    </div> -->

    <div class="test">
        <main_table />
    </div>

</template>


<script setup>
import main_table from "../components/reebelo_au/main_table.vue"
import file_upload from "../components/reebelo_au/file_upload.vue"
import { ref, onMounted } from 'vue';
</script>

<style>
    .test {
    margin: 0px;
    width: 199vh;
    height: 90vh;
    }
</style>