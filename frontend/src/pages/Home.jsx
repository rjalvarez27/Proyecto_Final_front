import { Header } from '../components/Header.jsx'
import { Nav } from '../components/Nav.jsx'
import { Aside } from '../components/Aside.jsx'
import { FyP } from '../components/FyP.jsx'
import { Preloader } from '../components/Preloader.jsx'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function Home(){
    const navigate = useNavigate()
    const token = Cookies.get('token')
    const [id, setId] = useState()
    const [user, setUser] = useState()

  useEffect(() => {
    const hanledToken = async () => {
        if (!token) {
            alert('Por favor inicia sesion')
            setTimeout(function () {
                navigate("/login");
            }, 2000);
            return
        } else {
            try {
                const response = await axios.get(`http://localhost:3000/social/recovery/${token}`);
                setId(response.data.message)
            } catch (error) {
                console.error('error:', error.message);
            }
        }
    }
    const hanledUser = async () => {
        if (id) {
            try {
                const response = await axios.get(`http://localhost:3000/social/user/${id}`);
                setUser(response.data)
            } catch (error) {
                console.error('error:', error.message);
            }
        }
    }
    hanledToken()
    hanledUser()
}, [token, id]);

  return(
      <>
        <Header/>
        {<Nav name={user?.name} username={user?.username} id={id}/>}
        <Aside />
        <FyP/>
        <Preloader/>
      </>
  )
}

