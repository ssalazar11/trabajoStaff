import React, {useState}  from 'react'
import axios from 'axios'
const CreateComponente = () => {
    const [userData, setUserData]=useState({
        nombreCompleto:''
    });

    const handleInputChange=(e)=>{
        const {name, value}=e.target;
        setUserData({...userData, [name]:value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            const response=await axios.post('/crearEstudiante', userData);
            console.log('Usuario credo:', response.data);
        }catch(error){
            console.error('Error al crear usuario', error);
        }
    };

  return (
    <div>
        <h2>Crear Usuario</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre</label>
                <input
                type='text'
                name='nombreCompleto'
                value={userData.nombreCompleto}
                onChange={handleInputChange}
                />
            </div>
            <button type='submit'>Crear Usuario</button>
        </form>
    </div>
  )
}

export default CreateComponente