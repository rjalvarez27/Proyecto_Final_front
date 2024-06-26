import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { validCorreo } from "../components/Regext.jsx";
import axios from "axios";
import Swal from 'sweetalert2';
import "../styles/recovery.css";


export function RecoverEmail() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.email) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "El campo Email es obligatorio",
                showConfirmButton: false,
                timer: 1200
              });
            return
        }
        if (!validCorreo.test(data.email)) {
            alert('Por favor verifique el dato ingresado')
        }
        else if (validCorreo.test(data.email)) {
            try {
                const response = await axios.post(`http://localhost:3000/social/recovery/${data.email}`, data);
                console.log(response.data)
                if (response) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se ha enviado un email para recuperar su contraseña",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    setTimeout(function () {
                        navigate("/");
                    }, 3000);
                    return
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "El email no se encuentra registrado",
                        showConfirmButton: false,
                        timer: 1200
                      });
                }
            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: `${error.response.data.message}`,
                    showConfirmButton: false,
                    timer: 1200
                  });
            }
        }
    }
    return (
        <div className="flex flex-col">
            <div className='flex-col'>
                <NavLink to="/" className="flex justify-end"><img src="../src/images/principales/home.png" alt="home" className="w-12 m-2" /></NavLink>
            </div>
            <div className="recovery-body">
                <div className="recovery-box">
                    <img src="../src/images/principales/logo.png" alt="logo" className="w-[90px] m-2" />
                </div>
                <div className="recovery-box2">
                    <h3 className="text-2xl font-black  text-center">Recuperar Password</h3>
                    <form className='flex-col bg-transparent m-5' onSubmit={handleSubmit}>
                        <h3 className="text-xl font-black m-1">Email*</h3>
                        <label className='flex border border-gray-800 rounded-lg shadow-lg bg-white  m-1'>
                            <input type="Email" className='p-1 rounded-md text-center w-full  py-2' name="email" id="email" onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="" />
                        </label>
                        <p className="text-sm text-justify m-1 font-bold ">Ingrese su correo electronico y presione enviar para recibir un codigo para recuperar su cuenta </p>
                        <div className="flex justify-center m-5 ">
                            <input type="submit" value="Enviar" className='bg-black hover:bg-gray-800 text-white font-bold py-2 px-10 rounded-lg' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}   