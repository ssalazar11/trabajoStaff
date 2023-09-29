import axios from 'axios'
import express from 'express'
import dotenv from 'dotenv'
import Estudiantes from '../server/modelos/Estudiante.js';

dotenv.config();

const apiKey=process.env.API_KEY;
const apiUrlAdmin=process.env.API_ADMIN;
const apiUrlEstudiante=process.env.API_ESTUDIANTE;
const app=express();



const getApiAdministrativos = async (req, res) => {
    try {
        const response = await axios.get(apiUrlAdmin, {
            headers: {
                'Cache-Control': 'no-cache',
                'Api-Key': apiKey
            },
        });
        // Responde con los datos obtenidos de la API
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        // Responde con un error en caso de que ocurra un problema al obtener los datos de la API
        res.status(500).json({ error: 'Error al obtener los datos de la API' });
    }
};


const getApiEstudiante= async(req, res) =>{
    const id =req.params.id;
    const modifiedApiUrlEstudiante=`${apiUrlEstudiante}${id}`;
    try{
        const response =await axios.get(modifiedApiUrlEstudiante,{
            headers:{
                'cache-control': 'no-cache',
                'Api-Key':apiKey
            },
        });
        console.log(res.json(response.data));
    } catch(error){
        console.log('Error al obtener los datos de la API', error);
        res.status(500).json({error:'Error al obtener los datos de la API'});
    }
};

const getApiEstudianteMongo=async(req, res)=>{
    const id=req.params.id;
    const modifiedApiUrlEstudiante=`${apiUrlEstudiante}${id}`;
    try{
        const response =await axios.get(modifiedApiUrlEstudiante,{
            headers:{
                'cache-control': 'no-cache',
                'Api-Key':apiKey
            },
        });
        const data= new Estudiantes(response.data);
        await data.save();
        res.status(201).send("estudiante creado exitosamente");
    }catch(error){
        console.log('error', error);
        res.status(500).send(error);
    }
};

app.post('/api/guardarEstudianteq10/:id', getApiEstudianteMongo);
app.get('/api/estudiante/:id', getApiEstudiante);
app.get('/api/administrativos', getApiAdministrativos);

export default app;
