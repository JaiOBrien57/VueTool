<template>

    <div class="bg-white relative rounded-lg w-max">

        <div class="flex items-center px-4 py-3 bg-white border rounded-lg" style="position: sticky; top: 0px;">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3 shadow focus:transition">Update Prices</button>
            <input class="shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500 focus:transition font-medium bg-slate-50" id="username" type="text" placeholder="Search">
        </div>

        <div style="height: 90vh; overflow-y: auto;">

            <table class="w-full text-sm text-left text-gray-500">

                <thead class="text-gray-700 uppercase bg-gray-50" style="position: sticky; top: 0px;">
                    <tr>
                        <th class="px-4 py-3 font-medium text-gray-900 text-center">ID</th>
                        <th class="px-4 py-3 font-medium text-gray-900 text-center">SKU</th>
                        <th class="px-4 py-3 font-medium text-gray-900">Name</th>
                        <th class="px-4 py-3 font-medium text-gray-900 text-center">Mapped Status</th>
                        <th class="px-4 py-3 font-medium text-gray-900 text-center">Target</th>
                        <th class="px-4 py-3 font-medium text-gray-900 text-center">Min</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="product in products" :key="product.id" class="border-b hover:bg-slate-50">
                        <td class="px-4 py-2 font-medium text-gray-900 text-center">{{ product.id }}</td>
                        <td class="px-4 py-2 font-medium text-gray-900 text-center">{{ product.sku }}</td>
                        <td class="px-4 py-2 text-gray-900">{{ product.name }}</td>
                        <td class="px-4 py-2 text-gray-900 text-center">{{ product.mappedstatus }}</td>
                        <td class="px-4 py-2 text-gray-900">
                            <input v-model="product.sheettarget" type="currency" placeholder="Empty" class="rounded bg-transparent leading-tight focus:outline-none focus:ring focus:border-blue-500 focus:bg-white focus:transition w-20 text-center"></input>
                        </td>
                        <td class="px-4 py-2 text-gray-900">
                            <input v-model="product.sheetmin" type="currency" placeholder="Empty" class="rounded bg-transparent leading-tight focus:outline-none focus:ring focus:border-blue-500 focus:bg-white focus:transition w-20 text-center"></input>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>

    </div>

</template>









<script setup>
import { ref, onMounted } from 'vue';

const products = ref([]);


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



</script>

