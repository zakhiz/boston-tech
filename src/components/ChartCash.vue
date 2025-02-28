

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCashTransaction } from '../services/axios.service';
import { notify } from '../config/toastify.notification';
import SkeletonChartCash from './component/SkeletonChartCash.vue';

const cashData = ref<{ currency: string; total_monto: number }[]>([]);
const loading = ref(true);

const fetchCashData = async () => {
  try {
    const data = await getCashTransaction();

    cashData.value = data.rows.map((row: any) => ({
      currency: row.f[0].v,
      total_monto: parseFloat(row.f[1].v)
    }));

  } catch (error) {
    notify({
                title: 'Error cargando los datos de transacciones por moneda',
                icon: 'error',
                color: "#fff",
                position:'top'
    });
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCashData);

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(value);
};
</script>

<template>
  <h2 class="w-4/5 mx-auto text-white pt-4 pb-3 font-semibold text-2xl">Registro de transacciones por moneda</h2>

  <div class="flex lg:w-4/5 w-full mx-auto lg:flex-row flex-col gap-10 lg:items-start items-center">
    <SkeletonChartCash  v-if="loading"/>
    <template v-else>
      <div v-for="(item, index) in cashData" :key="index" class="bg-[#56ab91] p-4 rounded-md shadow-md xl:w-[400px] w-[300px]">
        <p class="text-xl font-semibold text-white">{{ item.currency }}</p>
        <p class="text-lg text-white">
          Total: <span class="font-bold">{{ formatCurrency(item.total_monto, item.currency) }}</span>
        </p>
      </div>
    </template>
  </div>
</template>