import React from 'react'
import Navbar from '../components/Navbar'
import HorarioComponente from '../components/HorarioComponente'
const Horario = () => {
  return (
    <>
    <Navbar />
    <h1>Horario</h1> 
    <div classname='horario' style={{background:"white"}}>
    <HorarioComponente />
    </div>
    <button style={{color:'white', border:'2px solid'}}>Cambiar Horarios</button>
    <button></button>
    </>
  )
}

export default Horario