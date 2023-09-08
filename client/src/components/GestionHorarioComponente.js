import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GestionHorarioComponente = () => {
  const [datoEstudiante, setDatoEstudiante] = useState([]);
  const [seleccion, setSeleccion] = useState("");

  useEffect(() => {
    axios.get('/obtenerEstudiante')
      .then(response => {
        setDatoEstudiante(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSelectChange = (event) => {
    setSeleccion(event.target.value);
  };

  const handleEnviarClick = () => {
    if (seleccion) {
      const seleccionData = { seleccion };
      console.log(seleccion);
      axios.post('/guardarSeleccion', seleccionData)
        .then(response => {
          console.log("Selección enviada con éxito:", response.data);
        })
        .catch(error => {
          console.error("Error al enviar datos:", error);
        });
    } else {
      console.warn("No hay selección para enviar.");
    }
  };

  return (
    <div className="p-4 space-y-4">

      <h2 className="text-slate-200">Estudiante:</h2>
      <select
        value={seleccion}
        onChange={handleSelectChange}
        className="block w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
      >
        <option value="">Selecciona un elemento</option>
        {datoEstudiante.map(item => (
          <option key={item._id} value={item.nombre}>
            {item.nombre}
          </option>
        ))}
      </select>
      <button
        onClick={handleEnviarClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
      >
        Enviar
      </button>
    </div>
  );
}

export default GestionHorarioComponente;
