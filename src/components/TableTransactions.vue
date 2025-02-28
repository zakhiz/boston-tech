<script setup  lang="ts">
import { ref, computed, onMounted } from 'vue';
import { runBigQuery } from '../services/axios.service';
import { dateFilter } from '../utils/functions.utils';
import SkeletonComponent from './component/Skeleton.Component.vue';
import { useDynamicFilters } from '../composables/useDinamicFilters';
import { notify } from '../config/toastify.notification';

const nameColumn = ref<any[]>([]);
const valueColumns = ref<any[]>([]);

const currentPage = ref(1);
const numberOfItems = 5;

const loadingSkeleton = ref(true);

const sortColumn = ref<string | null>(null);
const sortDirection = ref<'asc' | 'desc' | null>(null);

onMounted(() => handleQuery());

const { filters, clearFilters } = useDynamicFilters();

const handleQuery = async (applyFilters = false) => {
  try {
    loadingSkeleton.value = true;

    const data = (await runBigQuery(applyFilters ? filters.value : {})).data;

    if (!data.rows || data.rows.length === 0) {
      notify({
        title: 'El o los filtros seleccionados no tienen datos o son incorrectos',
        icon: 'error',
        color: "#fff",
        position: 'top'
      });

      clearFilters();

      const baseData = (await runBigQuery({})).data;

      nameColumn.value = baseData.schema.fields;
      valueColumns.value = baseData.rows;

      return;
    }

    currentPage.value = 1; 
    nameColumn.value = data.schema.fields;
    valueColumns.value = data.rows;

  } catch (error) {
    notify({
      title: `Ocurrió un error al cargar los datos en el historial`,
      icon: 'error',
      color: "#fff",
      position: 'top'
    });
  } finally {
    loadingSkeleton.value = false;
  }
};


const handleSort = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : (sortDirection.value === 'desc' ? null : 'asc');
    if (sortDirection.value === null) sortColumn.value = null;
  } else {
    sortColumn.value = column;
    sortDirection.value = 'asc';
  };
};

const sortedData = computed(() => {
  if (!valueColumns.value || valueColumns.value.length === 0) return []; 

  if (!sortColumn.value || !sortDirection.value) return valueColumns.value;

  const columnIndex = nameColumn.value.findIndex(col => col.name === sortColumn.value);
  
  return [...valueColumns.value].sort((a, b) => {
    const aValue = a.f[columnIndex]?.v || '';
    const bValue = b.f[columnIndex]?.v || '';

    const isNumeric = !isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue));

    if (isNumeric) {
      return sortDirection.value === 'asc'
        ? parseFloat(aValue) - parseFloat(bValue)
        : parseFloat(bValue) - parseFloat(aValue);
    } else {
      return sortDirection.value === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });
});

const paginatedData = computed(() => {
  if (!sortedData.value || sortedData.value.length === 0) return []; 

  const start = (currentPage.value - 1) * numberOfItems;
  return sortedData.value.slice(start, start + numberOfItems);
});


const totalPages = computed(() => Math.ceil(sortedData.value.length / numberOfItems));

const nextPage = () => currentPage.value = Math.min(currentPage.value + 1, totalPages.value);
const prevPage = () => currentPage.value = Math.max(currentPage.value - 1, 1);
</script>

<template>
  <div>
    <h1 class="text-white text-2xl mb-2 pt-4 text-left w-4/5 mx-auto font-semibold">
      Historial de Transacciones
    </h1>

    <div class="flex flex-wrap gap-4 mb-4 w-4/5 mx-auto">
      <input
        v-model="filters.clientId"
        type="text"
        placeholder="Id Cliente"
        class="p-2 rounded bg-[#56ab91] text-white font-semibold outline-none"
      />

      <select v-model="filters.status" class="p-1 rounded bg-[#56ab91] text-white">
        <option value="">Estados de transaccion</option>
        <option value="OPEN">OPEN</option>
        <option value="AWARDED">AWARDED</option>
        <option value="SENT">SENT</option>
        <option value="LOST">LOST</option>
      </select>

      <select v-model="filters.country" class="p-1 rounded bg-[#56ab91] text-white">
        <option value="">Todos los paises</option>
        <option value="Colombia">Colombia</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="United States">United States</option>
      </select>

      <button @click="handleQuery(true)" class="bg-[#56ab91] text-white px-4 py-2 rounded">
        Aplicar Filtros
      </button>
      <button
        @click="() => { clearFilters(); handleQuery(); }"
        class="bg-red-400 text-white px-4 py-2 rounded"
      >
        Limpiar Filtros
      </button>
    </div>

    <SkeletonComponent v-if="loadingSkeleton" />

    <p class="font-semibold text-white text-center text-xs xl:hidden block pb-2">Deslizar hacia la derecha para ver la tabla correctamente </p>
    <div v-if="!loadingSkeleton" class="w-4/5 mx-auto overflow-x-auto">
      
      <table class="min-w-[600px] w-full text-white border-collapse border border-gray-700 rounded-lg shadow-lg" id="record">
        <thead>
          <tr class="bg-[#56ab92c5]">
            <th
              v-for="(item, index) in nameColumn"
              :key="index"
              @click="handleSort(item.name)"
              class="p-3 text-sm font-semibold border border-gray-600 text-center cursor-pointer select-none hover:bg-[#4b9c7c]"
            >
              {{ item.name.replace(/_/g, ' ') }}
              <span v-if="sortColumn === item.name">
                {{ sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : '' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex" class="hover:bg-[#656a6d75] transition">
            <td
              v-for="(cell, cellIndex) in row.f"
              :key="cellIndex"
              class="p-2 border border-[#56ab92c5] text-xs text-center truncate max-w-[150px]"
            >
              {{ ['Fecha_De_Envio'].includes(nameColumn[cellIndex]?.name) ? dateFilter(cell.v) : cell.v }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center items-center mt-6 space-x-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="bg-[#56ab92c5] text-white px-3 py-3 rounded disabled:opacity-50 hover:bg-gray-700 transition"
      >
        &lt;
      </button>
      <span class="text-white">{{ currentPage }} / {{ totalPages }}</span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="bg-[#56ab92c5] text-white px-3 py-3 rounded disabled:opacity-50 hover:bg-gray-700 transition"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

