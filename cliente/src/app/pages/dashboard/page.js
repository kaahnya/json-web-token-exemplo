import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListUsers from "@/app/componentes/ListUsers";
import Menu from "@/app/componentes/menu/menu"; 
import 'react-toastify/dist/ReactToastify.min.css';
import './css.css'

export default async function Dashboard() {
    const users = await getUsers();
   
    return (
        <div className="carre">
            <Menu></Menu>
            <Suspense fallback = {<p>Carregando...</p>}>
            <div className="lista">
                <h1>USERS</h1>
                <ListUsers users={users}/>
            </div>
            </Suspense>
        </div>
    );
};