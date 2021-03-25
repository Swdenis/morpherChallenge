import axios from 'axios'

const port = '5000'
const baseURL = ''
const localUrl = "http://localhost:5000"

export default axios.create({
    baseURL: baseURL
})