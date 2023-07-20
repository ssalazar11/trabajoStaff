const express = require('express');
const modeloEstudiante=require('../modelos/estudiante');
const app=express();

app.get("/estudiante", async (request, response)=>{
    const estudiantes=await modeloEstudiante.find({});

    try{
        response.send(estudiantes)
    } catch(error){
        response.status(500).send(error);
    }
});

export default app;