<template>

        <DataTable v-model:expandedRows="expandedRows" columnResizeMode="fit" :loading="loading" rowHover editMode="cell" @cell-edit-complete="onRowEditSave" dataKey="id" paginator :rows="20" :rowsPerPageOptions="[5, 10, 20, 50, 100]" scrollable scrollHeight="80vh" size="small" stripedRows :value="products" tableStyle="min-height: 80vh; font-size: 14px;"
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

            <Column field="mainmodel" header="Model" sortable>
            </Column>

            <Column field="brand" header="Brand" sortable>
            </Column>

            <Column field="model" header="Model">
            </Column>

            <Column field="Connectivity" header="Connectivity" >
            </Column>

            <Column field="gb" header="GB" >
            </Column>

            <Column field="currbudget" header="Budget Cost Ex" style="width: 11vh; height: 4vh;" sortable>
                <template #body="{ data, field }">
                {{ formatCurrency(data[field]) }}
            </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" mode="currency" currency="USD" locale="en-US" autofocus style="font-size: 14px; width: 9vh; height: 3vh;"  />
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="p-3">

                    <h5>Dealer Pricing</h5>
                    <DataTable :value="slotProps.data.expanddealer">

                        <Column header="(A)" style="font-size: 14px; width: 20%;">
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.dealerA" style="background: #c6eee1; color: #000000"/>
                            </template>
                        </Column>

                        <Column header="(B+)" style="font-size: 14px; width: 20%;" >
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.dealerBPlus" style="background: #c6eee1; color: #000000"/>
                            </template>
                        </Column>

                        <Column header="(B-)" style="font-size: 14px; width: 20%;" >
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.dealerBMinus" style="background: #c6eee1; color: #000000"/>
                            </template>
                        </Column>

                        <Column header="(C+)" style="font-size: 14px; width: 20%;" >
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.dealerCPlus" style="background: #ffd3b3; color: #000000"/>
                            </template>
                        </Column>

                        <Column header="(C-)" style="font-size: 14px; width: 20%;" >
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.dealerCMinus" style="background: #f871717d; color: #000000"/>
                            </template>
                        </Column>

                    </DataTable>

                    <h5>Trade In Pricing</h5>
                    <DataTable :value="slotProps.data.expandtradein">

                        <Column header="As New" style="font-size: 14px; width: 20%;">
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.asNewTradeIn" style="background: #c6eee1; color: #000000"/>
                            </template>
                        </Column>

                        <Column header="Working" style="font-size: 14px; width: 20%;" >
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.workingTradeIn" style="background: #c6eee1; color: #000000" />
                            </template>
                        </Column>

                        <Column header="Faulty" style="font-size: 14px; width: 20%;" >
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.FaultyTradeIn" style="background: #c6eee1; color: #000000" />
                            </template>
                        </Column>

                        <Column header="dead" style="font-size: 14px; width: 20%;" >
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.DeadTradeIn" style="background: #f871717d; color: #000000"/>
                            </template>
                        </Column>

                        <Column header="" style="font-size: 14px; width: 20%;" >
                            <template #body="slotProps">
                            </template>
                        </Column>

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

    const request = await fetch("/api/GetSheetsDataPricing",requestOptions)
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

