<!-- https://primevue.org/datatable/ -->

<template>
  <Button label="Submit" @click="Test"/>
  <p>
    Count:{{ Counta }}
    </p>

    <div class="card">
        <DataTable v-model:selection="selectedProduct" :value="customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                <template #header>
                <div style="text-align: left">
                    <Button icon="pi pi-external-link" label="Export" @click="" />
                </div>
            </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="model" header="Model" sortable style="width: 25%"></Column>
            <Column field="qty" header="QTY" sortable style="width: 25%"></Column>
        </DataTable>
    </div>
</template>




<script setup>
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';  
import Row from 'primevue/row';
import { ref, onMounted } from 'vue';

const customers = ref([{"id":1,"model":"iPhone 11","qty":1},{"id":2,"model":"iPhone 12","qty":4},{"id":3,"model":"iPhone 11","qty":1},{"id":4,"model":"iPhone 12","qty":4},{"id":5,"model":"iPhone 11","qty":1},{"id":6,"model":"iPhone 12","qty":4},{"id":7,"model":"iPhone 11","qty":1},{"id":8,"model":"iPhone 12","qty":4},{"id":9,"model":"iPhone 11","qty":1},{"id":10,"model":"iPhone 12","qty":4}]);
const selectedProduct = ref();
const Counta = ref(0);


function Test(){
  Counta.value = Counta.value+1
  console.log("Clicked",Counta)
}

</script>

