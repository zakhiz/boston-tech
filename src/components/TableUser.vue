<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTopUsers } from "../services/axios.service";
import { notify } from "../config/toastify.notification";

const topUsers = ref<{ userId: string; total_transacciones: number; total_monto: number, moneda: string }[]>([]);

const getDataTableUser = async () => {
  try {
    const response = await getTopUsers();
    topUsers.value = response.rows.map((row: any) => ({
      userId: row.f[0].v,
      moneda: row.f[1].v,
      total_transacciones: parseInt(row.f[2].v),
      total_monto: parseFloat(row.f[3].v),
    }));

  } catch (error) {
    notify({
        title: 'Error al cargar datos en la tabla de ranking de usuarios',
        icon: 'error',
        color: "#fff",
        position:'top'
      });
  };
};

function formatMoney(value: number) {
  return `$${value.toLocaleString()}`;
}

onMounted(() => {getDataTableUser()});


</script>


<template>

  <div class="w-[600px] mx-47" id="ranking">
    <h2 class="text-xl font-bold text-white mb-4">Ranking de Usuarios con más transacciones</h2>
  
      <div class="overflow-x-auto rounded-lg shadow-lg">
        <table class="w-full border border-[#56ab92c5] bg-transparent text-white">
          <thead class="bg-[#56ab92c5] text-gray-200  text-sm">
            <tr>
              <th class="px-4 py-3 text-left">#</th>
              <th class="px-4 py-3 text-left">Usuario</th>
              <th class="px-4 py-3 text-right">Moneda</th>
              <th class="px-4 py-3 text-right">Transacciones</th>
              <th class="px-4 py-3 text-right">Total Movido</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in topUsers" :key="user.userId" class="  hover:bg-[#56ab92c5]">
              <td class="px-4 py-3">{{ index + 1 }}</td>
              <td class="px-4 py-3 break-all">{{ user.userId }}</td>
              <td class="px-4 py-3 text-center">{{ user.moneda }}</td>
              <td class="px-4 py-3 text-center">{{ user.total_transacciones }}</td>
              <td class="px-4 py-3 text-right">{{ formatMoney(user.total_monto) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
