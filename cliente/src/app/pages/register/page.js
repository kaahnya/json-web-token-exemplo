'use client'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { postUser } from '@/app/functions/handlerAcessAPI';
import Menu from "@/app/componentes/menu/menu"; 
import { ToastContainer, toast } from 'react-toastify';
import './css.css'

export default function Register() {
  const [registro, setRegistro] = useState({
    nome: '', senha: '', senhaagain: ''
  });

  const { push, refresh } = useRouter();

  const handlerFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await postUser(registro);
      push('/pages/dashboard');
    } catch {
      return toast.error('Error');
  }

  const success = true;
   if (success) {
      toast.success('Usuário cadastrado com sucesso!');
    } else {
      toast.error('Ocorreu um erro ao cadastrar o usuário.');
    }
  };
    return (
  <div><Menu></Menu>
    <div className="form">
      <h1>REGISTER</h1>
      <form onSubmit={handlerFormSubmit}>
      <input
          name="nome"
          placeholder='Nome'
          type="name" onChange={(e) => { setRegistro({ ...registro, nome: e.target.value }) }}/>
        <input
          placeholder="Senha"
          name="senha"
          type="password" onChange={(e) => { setRegistro({ ...registro, senha: e.target.value }) }}/>
        <input
          name="senhaagain"
          placeholder='Senha'
          type='password' onChange={(e) => { setRegistro({ ...registro, senhaagain: e.target.value }) }}/>
        <button className="butao">CADASTRAR</button>
      </form>
      <ToastContainer/>
    </div>
  </div>
  )
}