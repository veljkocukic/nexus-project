import axios from 'axios'
const API_TOKEN = import.meta.env.VITE_API_TOKEN

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const getYears = async () => {
  try {
    const { data } = await api.get(`/api/v2/vehicles/years/?token=${API_TOKEN}`)
    return data.map((y) => y.year)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const getMakes = async (year) => {
  try {
    const { data } = await api.get(`/api/v2/vehicles/makes/?year=${year}&token=${API_TOKEN}`)
    return data.map((m) => m.make)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const getModels = async (year, make) => {
  try {
    const { data } = await api.get(
      `/api/v2/vehicles/models/?year=${year}&make=${make}&token=${API_TOKEN}`,
    )
    return data.map((m) => m.model)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
