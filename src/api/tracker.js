import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
const instance = axios.create({
    baseURL:'http://192.168.1.12:1000'
})

// Set a token if you have one, not need to set it everytime you make a req
instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token')
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default instance