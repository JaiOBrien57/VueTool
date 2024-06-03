<template>
        <Toast />
        <FileUpload name="AvailList" :custom-upload="true" @uploader="onAdvancedUpload" :multiple="false" accept=".csv" :maxFileSize="10000000000000">
            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
        </FileUpload>
</template>


<script setup>
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';
import Papa from "papaparse";
import { useToast } from "primevue/usetoast";
import { ref, onMounted } from 'vue';

const toast = useToast();

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

        const request = await fetch("/api/TestEndpoint",requestOptions)
        const result = await request.json()

        console.log("Server Response:",result)
        
        ;}})

      toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    };


</script>

