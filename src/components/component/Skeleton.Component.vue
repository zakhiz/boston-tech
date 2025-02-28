<script setup lang="ts">
</script>
<template>
    <div class="mx-auto rounded-lg shadow-lg overflow-hidden">
            <table class="w-4/5 mx-auto border-collapse">
            <thead>
                <tr class="bg-gray-800">
                <th v-for="index in 7" :key="index" class="p-3 text-sm font-semibold border border-gray-700">
                    <div class="h-4 bg-gray-700 rounded animate-pulse"></div>
                </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in 5" :key="row">
                <td v-for="col in 7" :key="col" class="p-3 border border-gray-700">
                    <div class="h-4 bg-gray-700 rounded animate-pulse"></div>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
</template>