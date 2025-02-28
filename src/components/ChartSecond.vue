<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { getCashTransactionStatus } from '../services/axios.service';
import SkeletonChartSecond from './component/SkeletonChartSecond.vue';
import { notify } from '../config/toastify.notification';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const cityChartCanvas = ref<HTMLCanvasElement | null>(null);
let cityChartInstance: Chart | null = null;

const cityLabels = ref<string[]>([]);
const cityValues = ref<number[]>([]);
const colors = ref<string[]>([]);
const loading = ref(true); 

const generateRandomColors = (count: number) => {
  return Array.from({ length: count }, () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`);
}

const GetDataChartSecond = async () => {
  try {
    const response = await getCashTransactionStatus();
    const formattedData = response.rows.map((row: any) => ({
      city: row.f[0].v,
      total_transacciones: parseInt(row.f[1].v)
    }));

    const validData = formattedData.filter((item: any) => typeof item.city === "string" && item.city.trim() !== "");

    cityLabels.value = validData.map((item: any) => item.city);
    cityValues.value = validData.map((item: any) => item.total_transacciones);
    colors.value = generateRandomColors(cityLabels.value.length);

  } catch (error) {
    notify({
        title: 'Error al cargar datos en el grafico',
        icon: 'error',
        color: "#fff",
        position:'top'
      });
  } finally {
    loading.value = false; 
  }
}

async function renderChart() {
  await nextTick();

  if (!cityChartCanvas.value) {
    notify({
        title: 'Error al cargar el grafico',
        icon: 'error',
        color: "#fff",
        position:'top'
    });
    return;
  }

  const ctx = cityChartCanvas.value.getContext("2d");
  if (!ctx) {
    notify({
        title: 'Error al cargar el grafico',
        icon: 'error',
        color: "#fff",
        position:'top'
    });
    return;
  }

  if (cityChartInstance) {
    cityChartInstance.destroy();
  }

  cityChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: cityLabels.value,
      datasets: [
        {
          label: "Total de Transacciones",
          data: cityValues.value,
          backgroundColor: colors.value,
          borderRadius: 5,
          barPercentage: 0.6
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top", labels: { color: '#fff' } },
        title: { display: true, text: "Ciudades con más Transacciones", color: '#fff' },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const value = cityValues.value[tooltipItem.dataIndex];
              return `${tooltipItem.label}: ${value.toLocaleString()} transacciones`;
            }
          }
        }
      },
      scales: {
        y: { 
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return `${Number(value).toLocaleString()} transacciones`;
            }
          },
        }
      }
    }
  });
}

onMounted(async () => {
  await GetDataChartSecond();
  renderChart();
});

onBeforeUnmount(() => {
  if (cityChartInstance) {
    cityChartInstance.destroy();
  }
});
</script>

<template>
  <div class="w-full overflow-x-auto">
    <SkeletonChartSecond  v-if="loading"/>
    <template v-else>
        <div class="w-[600px] h-[300px] mx-auto">
          <canvas ref="cityChartCanvas"></canvas>
        </div>
    </template>
  </div>
</template>

