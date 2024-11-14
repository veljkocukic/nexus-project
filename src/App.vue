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

const setLoading = v=> isLoading.value = v

onMounted(async () => {
    const yrs = await getYears(setLoading)
    years.value = yrs
})

const handleYear = async (selectedYear) => {
    const fetchedMakes = await getMakes(selectedYear, setLoading)
    makes.value = fetchedMakes
    year.value = selectedYear
    make.value = fetchedMakes[0]
    handleMake(fetchedMakes[0])
    model.value = ''
}

const handleMake = async (selectedMake) => {
    const fetchedModels = await getModels(year.value, selectedMake, setLoading)
    models.value = fetchedModels
    make.value = selectedMake
    model.value = fetchedModels[0]
}

const handleModel = (selectedModel) => (model.value = selectedModel)
</script>

<template>
  <h1>Nexus Test Assignment</h1>
  <PulseLoader :loading="isLoading"/>
  <Dropdown :value="year" label="Year" :options="years" :function="handleYear" />
  <Dropdown :value="make" label="Make" :options="makes" :function="handleMake" />
  <Dropdown :value="model" label="Model" :options="models" :function="handleModel" />
</template>

<style scoped></style>
