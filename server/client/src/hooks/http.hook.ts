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
              });
            // const data = await response
            // if(!response.ok){
            //     throw new Error(data.message||'Ошибка подключения')
            // }
            setLoading(false)
            return //data

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