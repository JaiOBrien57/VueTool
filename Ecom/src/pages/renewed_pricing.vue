<!-- UI Libary: https://primevue.org/datatable/ -->
<!-- CSV Reading Libary: https://www.papaparse.com/ --> 

<template>

    <div class="test">
        <main_table_pricing />
    </div>

</template>


<script setup>
import main_table_pricing from "../components/renewed_pricing/main_table_pricing.vue"
import { ref, onMounted } from 'vue';
</script>

<style>
    .test {
    margin: 0px;
    width: 199vh;
    height: 90vh;
    }
</style>