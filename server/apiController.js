import axios from 'axios'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const apiKey=process.env.API_KEY;
const apiUrl='https://api.q10.com/v1/administrativos?Limit=30&Offset=1';
const app=express();

const getApiAdministrativos = async (req, res) => {
    try {
        const response = await axios.get(apiUrl, {
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

app.get('/api/administrativos', getApiAdministrativos);

export default app;
