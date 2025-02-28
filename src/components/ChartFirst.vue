<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { getTransactionTime } from '../services/axios.service';
import { notify } from '../config/toastify.notification';
import SkeletonChartFirst from './component/SkeletonChartFirst.vue';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const lineChartCanvas = ref<HTMLCanvasElement | null>(null);
let lineChartInstance: Chart | null = null;

const labels = ref<string[]>([]);
const dataValues = ref<number[]>([]);
const loading = ref(true);

async function fetchData() {
  try {
    const response = await getTransactionTime();
    const formattedData = response.rows.map((row: any) => ({
      fecha: row.f[0].v,
      total_monto: parseFloat(row.f[1].v)
    }));

    labels.value = formattedData.map((item: any) => item.fecha);
    dataValues.value = formattedData.map((item: any) => item.total_monto);
  } catch (error) {
    notify({
      title: 'No se pudo cargar los datos solicitados',
      icon: 'error',
      color: "#fff",
      position: 'top'
    });
  } finally {
    loading.value = false;
  }
}

async function renderChart() {
  await nextTick();

  if (!lineChartCanvas.value) {
    notify({
        title: 'Error al cargar el grafico',
        icon: 'error',
        color: "#fff",
        position:'top'
    });
    return;
  }

  const ctx = lineChartCanvas.value.getContext('2d');
  if (!ctx) {
    notify({
        title: 'Error al cargar el grafico',
        icon: 'error',
        color: "#fff",
        position:'top'
    });
    return;
  }

  if (lineChartInstance) {
    lineChartInstance.destroy();
  }

  lineChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.value,
      datasets: [{
        label: 'Total Transaccionado por mes ($)',
        data: dataValues.value,
        borderColor: '#56ab92c5',
        borderWidth: 4,
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { color: '#fff' } },
      },
      scales: {
        x: { title: { display: true, text: 'Fecha', color: '#fff' } },
        y: { beginAtZero: true, title: { display: true, text: 'Monto ($)', color: '#fff' } }
      }
    }
  });
}

onMounted(async () => {
  await fetchData();
  renderChart();
});

onBeforeUnmount(() => {
  if (lineChartInstance) {
    lineChartInstance.destroy();
  }
});
</script>
<template>
  <div class="w-full overflow-x-auto">
    <SkeletonChartFirst v-if="loading"/>

    <template v-else>
      <div class="w-[600px] mx-auto">
        <canvas ref="lineChartCanvas"></canvas>
      </div>
    </template>
  </div>
</template>