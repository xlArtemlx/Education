import React,{useState} from 'react';
import 'materialize-css'
import './Register.scss'
import {useHttp} from '../../hooks/http.hook'

interface Values {
  email: string;
  password: string;
}

export const Register = () => {
  const {loading,error,request}= useHttp()

  const [form,setForm] = useState<Values>({
    email: '',
    password: '',
  })
  
  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
    e.preventDefault()
  }

  const reg = async () => {
    try {
      const data = await request('/api/auth/register','POST',{...form})
      console.log(data)

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
            <button onClick={reg} disabled={loading} type="submit">Submit</button>
            </div>
        </div>
    </div>
  );
};
