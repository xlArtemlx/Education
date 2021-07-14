import { useState,useCallback } from "react";
import axios from 'axios'

export const useHttp = () => {
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const request = useCallback( async(url:string ,method = "GET",body = null,headers = {} ) => {
        setLoading(true)
      const bod = JSON.stringify({"email":'sddasd@sdssd.ru',"password":'123456'})
        try{
            const response = await axios({
                method: 'post',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                  },
                data: bod
              });
            // const data = await response
            // if(!response.ok){
            //     throw new Error(data.message||'Ошибка подключения')
            // }
            setLoading(false)
            console.log(response)
            return //data

        }catch(e){
            console.log(e)
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])

    const clearError = () => setError(null)
    return {loading,request,error,clearError}
}