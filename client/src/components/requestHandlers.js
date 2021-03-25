import numbers from "../api/numbers"


export const handleReset = async (setNumber) => {
    const response = await numbers.post('/number/reset')
    setNumber(response.data.number.value)
}

export const handleIncrement = async (setNumber) => {
    const response = await numbers.post('/number')
    setNumber(response.data.number.value)
}

export const getCurrentNumber = async (setNumber) => {
    const response = await numbers.get('/number')
    setNumber(response.data.number.value)
}