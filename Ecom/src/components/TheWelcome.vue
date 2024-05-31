<!-- UI Libary: https://primevue.org/datatable/ -->
<!-- CSV Reading Libary: https://www.papaparse.com/ --> 

<template>

  <div class="card">
        <Toast />
        <FileUpload name="AvailList" :custom-upload="true" @uploader="onAdvancedUpload" :multiple="false" accept=".csv" :maxFileSize="10000000000000">
            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
        </FileUpload>
    </div>

    <div class="card">
        <DataTable v-model:selection="selectedProduct" editMode="cell" @cell-edit-complete="onRowEditSave" dataKey="id" scrollable scrollHeight="600px" size="small" stripedRows :value="products" paginator :rows="100" :rowsPerPageOptions="[5, 10, 20, 50, 100]" tableStyle="min-width: 110rem" 
        :pt="{
                column: {
                    bodycell: ({ state }) => ({
                        class: [{ 'pt-0 pb-0': state['d_editing'] }]
                    })
                }
            }">

            <template #header>
                <div style="text-align: left">
                    <Button icon="pi pi-external-link" label="Export" @click="" />
                </div>
            </template>

            <Column selectionMode="multiple" headerStyle="width: 3rem" style="width: 1%">
            </Column>

            <Column field="sku" header="SKU" sortable style="width: 5%">
            </Column>

            <Column field="name" header="Name" sortable style="width: 40%">
            </Column>

            <Column field="qty" header="QTY" sortable style="width: 5%">
            </Column>

            <Column header="Mapped Status" sortable style="width: 10%">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.mappedstatus" :severity="getSeverity(slotProps.data)" />
                </template>
            </Column>

            <Column field="reebeloqty" header="Reebelo QTY" sortable style="width: 10%">
            </Column>

            <Column field="reebelotarget" header="Reebelo Target" sortable style="width: 10%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" autofocus  />
                </template>
            </Column>

        </DataTable>
    </div>

</template>


<script setup>
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';  
import Row from 'primevue/row';
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';
import Papa from "papaparse";
import { useToast } from "primevue/usetoast";
import { ref, onMounted } from 'vue';

const editingRows = ref([]);
const products = ref([]);
const selectedProduct = ref();
const toast = useToast();

// Get Sheets Data on Refresh
onMounted (async()=>{

    const myHeaders = {"Content-Type": "application/json"}
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

    const request = await fetch("http://localhost:2000/GetSheetsData",requestOptions)
    const result = await request.json()
    products.value = result.rows
    console.log(result)
});


// On CSV Avail List Upload
const onAdvancedUpload = async (event) => {

    const file = event.files[0];
    const JSONFile = Papa.parse(file, {download: true,encoding: "UTF-8",complete: async function (results){

        const JSONData = {"data":results.data}

        console.log(JSONData)

        const myHeaders = {"Content-Type": "application/json"}

        const postBody = JSON.stringify(JSONData)

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: postBody,
        redirect: "follow"
        };

        const request = await fetch("http://localhost:2000/TestEndpoint",requestOptions)
        const result = await request.json()

        console.log("Server Response:",result)
        
        ;}})

      toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    };

    
    const onRowEditSave = (event) => {
    let { newData, index } = event;

    products.value[index] = newData;
    };

    const getSeverity = (product) => {
    switch (product.mappedstatus) {
        case 'Mapped':
            return 'success';

        case 'Unmapped':
            return 'warning';

        case 'Not On Reebelo':
            return 'danger';

        default:
            return null;
    }
};


</script>

