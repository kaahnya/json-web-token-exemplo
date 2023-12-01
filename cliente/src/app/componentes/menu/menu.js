import './css.css'

export default function Menu(){
    return(
        <div className='menu'> 
            <ul>
                <li><h1 className='home'>HOME</h1></li>
                <li><a href="../../pages/dashboard">USERS</a></li>
                <li><a href="./register">REGISTER</a></li>
            </ul>
        </div>
    )
}