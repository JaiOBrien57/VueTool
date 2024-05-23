<script setup>
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';  
import Row from 'primevue/row';
import { ref } from 'vue'

const Counta = ref(0);

function Test(){
  Counta.value = Counta.value+1
  console.log("Clicked",Counta)
}

</script>

<template>
  <Button label="Submit" @click="Test"/>
  <p>
    Count:{{ Counta }}
    </p>

    <!-- <DataTable :value="customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" style="width: 25%"></Column>
    <Column field="country.name" header="Country" style="width: 25%"></Column>
  </DataTable> -->

</template>
