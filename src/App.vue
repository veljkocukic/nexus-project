<script setup>
import { ref, onMounted } from 'vue'
import { getYears, getModels, getMakes } from './utils/api'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Dropdown from '@/components/drop-down.vue'

const make = ref()
const model = ref()
const year = ref()

const years = ref([])
const models = ref([])
const makes = ref([])
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const yrs = await getYears()
    years.value = yrs
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    isLoading.value = false
  }
})

const handleYear = async (selectedYear) => {
  try {
    isLoading.value = true
    const fetchedMakes = await getMakes(selectedYear)
    makes.value = fetchedMakes
    year.value = selectedYear
    make.value = fetchedMakes[0]
    model.value = ''
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    isLoading.value = false
  }
}

const handleMake = async (selectedMake) => {
  try {
    isLoading.value = true
    const fetchedModels = await getModels(year.value, selectedMake)
    models.value = fetchedModels
    make.value = selectedMake
    model.value = fetchedModels[0]
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    isLoading.value = false
  }
}

const handleModel = (selectedModel) => (model.value = selectedModel)
</script>

<template>
  <h1>Nexus Test Assignment</h1>
  <div v-if="isLoading"><PulseLoader /></div>
  <Dropdown :value="year" label="Year" :options="years" :function="handleYear" />
  <Dropdown :value="make" label="Make" :options="makes" :function="handleMake" />
  <Dropdown :value="model" label="Model" :options="models" :function="handleModel" />
</template>

<style scoped></style>
