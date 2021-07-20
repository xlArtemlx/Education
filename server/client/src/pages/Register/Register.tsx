import React,{useState,useEffect,useContext} from 'react';
import 'materialize-css'
import './Register.scss'
import {useHttp} from '../../hooks/http.hook'
import { useMessage } from '../../hooks/useMessage';
import { AuthContext } from '../../context/AuthContext';

interface Values {
  email: string;
  password: string;
}

export const Register = () => {
  const {loading,error,request,clearError}= useHttp()
  const auth = useContext(AuthContext)
  const message = useMessage()
  const [form,setForm] = useState<Values>({
    email: '',
    password: '',
  })

  useEffect(()=>{
    message(error)
    clearError()
  },[error,message,clearError])
  
  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
    e.preventDefault()
  }

  const reg = async () => {
    try {
      const data:any = await request('/api/auth/register','POST',{...form})
      message(data.message)

    }catch(e){

    }
  }

  const log = async () => {
    try {
      const data:any = await request('/api/auth/login','POST',{...form})
      if(data){
        auth.login(data.token,data.userId)
      }
      message(data.message)

    }catch(e){

    }
  }

  const test = async () => {
    try {
      const data:any = await request('/api/board/board','GET')
      message(data.message)

    }catch(e){

    }
  } 

  return (
    <div className='row'>
        <h1>Signup</h1>
        <div>
            <div className='style'>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                placeholder="example@gmail.com"
                type="email"
                onChange={changeHandler}
            />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" placeholder="Password"  onChange={changeHandler}/>
            <button onClick={reg} disabled={loading} type="submit">Регистрация</button>
            <button onClick={log} disabled={loading} type="submit">Войти</button>
            <button onClick={test} disabled={loading} type="submit">test</button>
            </div>
        </div>
    </div>
  );
};
