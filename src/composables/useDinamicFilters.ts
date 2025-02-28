import { ref } from 'vue';

export const useDynamicFilters = () => {
  const filters = ref({
    clientId: '',
    status: '',
    country: '',
  });

  const clearFilters = () => {
    filters.value.clientId = "";
    filters.value.status = "";
    filters.value.country = "";
  };
  

  return {
    filters,
    clearFilters,
  };
};
