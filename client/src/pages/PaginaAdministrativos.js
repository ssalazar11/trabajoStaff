import React, {useEffect, useState} from 'react'
import axios from 'axios';

const PaginaAdministrativos = () => {
    const[data, setData]=useState([]);
    const[showData, setShowData]=useState(false);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await axios.get('api/administrativos');
                setData(response.data);
            }catch(error){
                console.error('error al obtener los datos:',error);
            }
        };
        fetchData();
    },[]);

    const handleShowData=()=>{
        setShowData(true);
    }

  return (
    <div style={{brackground:'white'}}>
        <button onClick={handleShowData} style={{brackground:'white'}}>Mostrar Datos</button>
        {showData && data.length>0?(
           <div>
            <h2>Datos administrativos:</h2>
            <ul style={{background:'white'}}>
                {data.map((item)=>(
                    <li key={item.Codigo}>
                        <strong>Nombre completo:</strong>{item.Primer_nombre}, {item.Primer_apellido}, <strong>Correo</strong>, {item.Email}
                    </li>
                ))}
            </ul>
           </div> 
        ):(
            <p>Cargando datos...</p>
        )}
    </div>
  )
}

export default PaginaAdministrativos