'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './css.css';

export default function Login() {
  const [user, setUser] = useState({
    nome: '',
    senha: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
      if(userAuth.token === undefined){
        toast.error("email ou senha incorretos");
      }
      push('/pages/dashboard');
    } catch {
      toast.error("erro na apliacação")
      refresh();
    }
  }
  return (
    <div className="form">
      <h1>Login</h1>
      <form onSubmit={handlerLogin}>
        <input
          placeholder="E-mail"
          name="nome"
          type="text"
          onChange={(e) => { setUser({ ...user, nome: e.target.value }) }}>
        </input>
        <input
          placeholder="Senha"
          type="password"
          name="senha"
          onChange={(e) => { setUser({ ...user, senha: e.target.value }) }}>
        </input>
        <button className="botua">ENTRAR</button>
      </form>
      <ToastContainer/>
    </div>
  )
}
