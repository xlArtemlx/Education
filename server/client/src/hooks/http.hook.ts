import { useState,useCallback } from "react";
import axios from 'axios'

export const useHttp = () => {
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const request = useCallback( async(url:string ,method = "GET",body = null,headers = {} ) => {
        setLoading(true)
        try{
            const response = await axios({
                method: method,
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                  },
                data: body
              })
              .catch((e)=>{
                setLoading(false)
                setError(e.response.data.message)
                throw new Error(e.response.data.message||'Ошибка подключения')
              })
            setLoading(false)
            const data = response.data
            return data

        }catch(e){
            console.log(e.response.data.message)
            setLoading(false)
            setError(e.response.data.message)
            throw e
        }
    },[])

    const clearError = useCallback(() => setError(null),[])
    return {loading,request,error,clearError}
}