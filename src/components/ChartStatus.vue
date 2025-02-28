<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { getUserTransactionStatus } from "../services/axios.service";
import { notify } from "../config/toastify.notification";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface UserStatus {
  status: string;
  total_users: number;
}

const barChartCanvas = ref<HTMLCanvasElement | null>(null);
let barChartInstance: Chart | null = null;
const userStatusData = ref<UserStatus[]>([]);

async function fetchData() {
  try {
    const response = await getUserTransactionStatus();
    userStatusData.value = response.rows.map((row: any) => ({
      status: row.f[1].v.toString(),
      total_users: parseInt(row.f[2].v),
    }));
   
  } catch (error) {
    notify({
        title: 'Error al cargar datos sobre status',
        icon: 'error',
        color: "#fff",
        position:'top'
    });
  }
}

async function renderChart() {
  await nextTick();

  if (!barChartCanvas.value) {
    notify({
        title: 'Error al cargar el grafico',
        icon: 'error',
        color: "#fff",
        position:'top'
    });
    return;
  }

  const ctx = barChartCanvas.value.getContext("2d");
  if (!ctx) {
    notify({
        title: 'No se pudo inicializar el grafico',
        icon: 'error',
        color: "#fff",
        position:'top'
    });
    return;
  }

  if (barChartInstance) {
    barChartInstance.destroy();
  }

  barChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
        labels: userStatusData.value.map((data) => data.status),
        datasets: [
        {
            label: "Usuarios con este estado más frecuente",
            data: userStatusData.value.map((data) => data.total_users),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            borderRadius: 5,
            barPercentage: 0.7
        },
        ],
    },
    options: {
        responsive: true,
        plugins: {
        legend: { position: "top", labels: {color: '#fff'}},
        title: { display: true, text: "Distribución de Estados Más Frecuentes",color: '#fff' },
        tooltip: {
            callbacks: {
            label: function (tooltipItem) {
                const value = tooltipItem.raw as number; 
                return `${tooltipItem.label}: ${value.toLocaleString()} usuarios`;
            }
            }
        }
        },
        scales: {
        y: { beginAtZero: true }
        }
    }
    });

}

onMounted(async () => {
  await fetchData();
  renderChart();
});

onBeforeUnmount(() => {
  if (barChartInstance) {
    barChartInstance.destroy();
  }
});
</script>

<template>
    <div class="w-[600px]  mx-auto mt-4">
      <canvas ref="barChartCanvas"></canvas>
    </div>
</template>