<script setup lang="ts">
import ChartCash from '../components/ChartCash.vue';
import ChartFirst from '../components/ChartFirst.vue';
import ChartSecond from '../components/ChartSecond.vue';
import TableTransactions from '../components/TableTransactions.vue';
import TableUser from '../components/TableUser.vue';
import NavbarDashboard from '../components/NavbarDashboard.vue';
import ChartStatus from '../components/ChartStatus.vue';

</script>
<template>
      <div class="bg-[#272a2c] min-h-screen">
        <NavbarDashboard />
        <div >
            <ChartCash/>
            <div class="flex flex-col xl:flex-row justify-around xl:items-center items-start pt-10 pb-10">
              <ChartFirst />
              <ChartSecond />
            </div>
        </div>
        <TableTransactions/>

        <div class="flex justify-around pt-24 pb-20">
          <TableUser/>
          <ChartStatus/>
        </div>

      </div>
</template>