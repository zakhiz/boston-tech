<script setup lang="ts"></script>

<template>
    <div v-for="index in 2" :key="index" class="bg-[#56ab91] p-4 rounded-md shadow-md xl:w-[400px] w-[300px]">
      <div class="h-6 bg-gray-700 rounded animate-pulse mb-2 transition-all ease-in-out duration-400"></div>
      <div class="h-4 bg-gray-700 rounded animate-pulse w-3/4 transition-all ease-in-out duration-400"></div>
    </div>
  </template>