<script setup>
import { ref, defineProps,onMounted, onBeforeUnmount, watch } from 'vue'

const open = ref(false)
const props = defineProps({
  label: String,
  options: Array,
  value: String,
  function: Function,
})
const inputValue = ref('')
const filtered = ref(props.options)
const handleOpen = () => {
  open.value = !open.value
}

watch(() => props.options, (newOptions) => {
  filtered.value = newOptions
})

watch(() => props.value, (newValue) => {
  inputValue.value = newValue
})

const handleSelect = (e) => {
  e.stopPropagation()
  open.value = false
  inputValue.value = e.target.innerText
  if (props.function) {
    props.function(e.target.innerText)
  }
}

const handleChange = (e) =>{
  const {value} = e.target
  inputValue.value = value
  filtered.value = props.options.filter(o=>String(o).toLowerCase().startsWith(value.toLowerCase()))
}

const handleOutsideClick = (e) => {
  if (!e.target.closest('.dropdown-container')) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})

</script>

<template>
  <div @click="handleOpen" class="dropdown-container">
    <p class="label">{{ label }}</p>
    <div class="dropdown-wrapper">
      <input placeholder="Select..." :value="inputValue" @input="handleChange" type="text"/>
      <span>▼</span>
    </div>
    <div v-if="open" class="options-container">
      <div @click="handleSelect" class="single-option" v-for="option in filtered" :key="option">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>

input{
  width: 100%;
  height: 100%;
  color: white;
  outline: none;
  border: none;
  background-color: transparent;
  padding: 0 10px;
  font-size: 1rem;
}

p {
  font-size: .8rem;
  font-weight: bold;
  color: white;
  width: 100%;
  text-align: left;
}

.dropdown-container {
  position: relative;
}

.dropdown-wrapper {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 2.5rem;
  background-color: white;
  border-radius: 10px;
  position: relative;
  background-color: #1c2126;
  border: 1px solid #2f363d;
  cursor: pointer;
}

span {
  position: absolute;
  right: 1rem;
  top: 35%;
  user-select: none;
  font-size: 0.65rem;
  color: #fb0;
}
.options-container {
  border-radius: 5px;
  z-index: 9;
  width: 100%;
  overflow: auto;
  position: absolute;
  top: 105%;
  left: 0;
  animation: dropdownExpand 0.4s ease forwards;
}

.single-option {
  padding: 0 5px;
  width: 100%;
  height: 2.5rem;
  background-color: #2f363d;
  transition: 0.2s ease;
  color: white;
  cursor: pointer;
}

.single-option:hover {
  background-color: #4a525a;
}

@keyframes dropdownExpand {
  0% {
    max-height: 0;
    opacity: 0;
  }
  100% {
    max-height: 200px;
    opacity: 1;
  }
}
</style>
