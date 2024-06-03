<template>

        <DataTable v-model:expandedRows="expandedRows" :rowStyle="rowStyle" columnResizeMode="fit" :loading="loading" rowHover editMode="cell" @cell-edit-complete="onRowEditSave" dataKey="id" paginator :rows="20" :rowsPerPageOptions="[5, 10, 20, 50, 100]" scrollable scrollHeight="80vh" size="small" stripedRows :value="products" tableStyle="min-height: 80vh; font-size: 14px;"
        :pt="{
                column: {
                    bodycell: ({ state }) => ({
                        class: [{ 'pt-0 pb-0': state['d_editing'] }]
                    })
                }
            }">

            <template #header>
                <div style="text-align: left;">
                    <div class="card flex justify-content-center flex-wrap gap-3">
                    <SplitButton label="Update All" :model="items" @click="save"></SplitButton>
                </div>
                </div>
            </template>

            <Column expander style="width: 5rem" />

            <Column selectionMode="multiple" >
            </Column>

            <Column field="sku" header="SKU" >
            </Column>

            <Column field="name" header="Name" sortable>
            </Column>

            <Column field="qty" header="QTY" sortable>
            </Column>

            <Column header="Status" sortable>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.mappedstatus" :severity="getSeverity(slotProps.data)" />
                </template>
            </Column>

            <Column field="reebeloqty" header="R-QTY">
            </Column>

            <Column field="reebelotarget" header="R-Target">
            </Column>

            <Column field="reebelomin" header="R-Min">
            </Column>

            <Column field="pricetowin" header="Price To Win">
            </Column>

            <Column field="lostby" header="Lost By" sortable>
            </Column>

            <Column field="sheettarget" header="Target" style="width: 11vh; height: 4vh;" sortable>
                <template #body="{ data, field }">
                {{ formatCurrency(data[field]) }}
            </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" mode="currency" currency="USD" locale="en-US" autofocus style="font-size: 14px; width: 9vh; height: 3vh;"  />
                </template>
            </Column>

            <Column field="sheetmin" header="Min" style="width: 11vh; height: 4vh;" sortable>
                <template #body="{ data, field }">
                {{ formatCurrency(data[field]) }}
            </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" mode="currency" currency="USD" locale="en-US" autofocus style="font-size: 14px; width: 9vh; height: 3vh;"  />
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="p-3">
                    <h5>Expanded Data</h5>
                    <DataTable :value="slotProps.data.expanddata">
                        <Column field="id" header="Id" sortable style="font-size: 14px;"></Column>
                        <Column field="name" header="Name" sortable style="font-size: 14px;" ></Column>
                    </DataTable>
                </div>
            </template>

        </DataTable>

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
import SplitButton from 'primevue/splitbutton';
import { useToast } from "primevue/usetoast";
import { ref, onMounted } from 'vue';

const editingRows = ref([]);
const products = ref([]);
const selectedProduct = ref();
const loading = ref(true);

// Get Sheets Data on Refresh
onMounted (async()=>{

    const myHeaders = {"Content-Type": "application/json"}
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

    const request = await fetch("/api/GetSheetsData",requestOptions)
    const result = await request.json()
    products.value = result.rows
    loading.value = false;
    console.log(result)
});




// On Row Save
const onRowEditSave = (event) => {
    let { newData, index } = event;

    products.value[index] = newData;
};



// Return Mapped Colours
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


// Format Currency
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

// Format Row Colour
const rowStyle = (data) => {
    if (data.lostby !== '') {
        return { background: '#faa5a5'};
    }
};

// BTN Format
const items = [
    {
        label: 'Update-Woo',
        command: () => {
            console.log("Update Clicked");
        }
    },{
    label: 'Update-Reebelo',
        command: () => {
            console.log("Update Clicked");
        }
    }]


</script>

