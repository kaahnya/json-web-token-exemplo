'use client'
import { useState } from "react";
import handlerAcessUser from "../../functions/handlerAcess"
import 'react-toastify/dist/ReactToastify.min.css';
import Menu from "@/app/componentes/menu/menu"; 
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import './css.css'


export default function Alter() {
    const [alter, setAlter] = useState({
      name: '', email: '', password: ''
    });

    const { push, refresh } = useRouter();

    const handlerAlter = async (e) => {
        e.preventDefault();
        try {
          await handlerAcessUser(user);
          push('/pages/alter');
        } catch {
          refresh();
        }
    
     const success = true;
     if (success) {
        toast.success('Login alterado com sucesso!');
     } else {
        toast.error('Ocorreu um erro ao alterar o login.');
      }
    }

    return (
  <div><Menu></Menu>
    <div className="form">
      <h1>ALTER</h1>
      <form onSubmit={handlerAlter}>
      <input
          placeholder='Nome'
          type="name" onChange={(e) => { setAlter({ ...alter, name: e.target.value }) }}/>
        <input
          placeholder='E-mail'
          type="email" onChange={(e) => { setAlter({ ...alter, email: e.target.value }) }}/>
        <input
          placeholder='Senha'
          type='password' onChange={(e) => { setAlter({ ...alter, password: e.target.value }) }}/>
        <button>ALTERAR DADOS</button>
      </form>
      <ToastContainer/>
    </div>
    </div>
  )
}
