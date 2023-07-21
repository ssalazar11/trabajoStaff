import express, { response } from 'express';
import Estudiantes from '../modelos/Estudiante.js';
const app=express();



app.get("/obtenerEstudiante", async (req, res)=>{
    try{
        console.log(Estudiantes);
        const estudiantes=await Estudiantes.find();
        console.log(estudiantes);
        res.send(estudiantes);
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

app.post("/crearEstudiante", async(req, res) => {
    try{
        console.log(req.body);
        const data=new Estudiantes(req.body);
        await data.save();
        res.status(201).send("estudiante creado exitosamente")
    } catch(error){
        res.status(500).send(error);
    }
});

app.patch("/actualizarEstudiante/:id", async(req, res) => {
    try{
        console.log(req.body);
        const estudianteActualizado=await Estudiantes.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.send(estudianteActualizado);
    } catch(error){
        res.status(500).send(error);
    }
});

app.delete("/borrarEstudiante/:id", async(req, res) => {
    try{
        const estudiante=await Estudiantes.findByIdAndDelete(req.params.id);
        if (!estudiante) res.status(404).send("no encontrado");
        res.status(200).send();
    } catch(error){
        res.status(500).send(error);
    }
})

export default app;