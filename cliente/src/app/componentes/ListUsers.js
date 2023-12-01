import './css.css';

export default async function ListUsers({users}) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return(
        <div className='user'>   
            <section>{users?.map((user, index) =><h2 key={index}>✉️{' '}{user.nome}</h2>)}</section>
        </div>
    );
}         