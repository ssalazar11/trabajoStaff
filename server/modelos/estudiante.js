import mongoose from 'mongoose';

const estudiantesSchema = new mongoose.Schema({
    nombre:{
        type: String
    },
    nucleoFamiliar:{
        type:Array
    },
    asignatura:{
        type:Array
    },
    inicioFinalClase:{
        type: Array
    },
    rol:{
        type: mongoose.Types.ObjectId
    },
    horarioOriginal:{
        type:Object
    },
    horarioReemplazo:{
        type:Object
    },
    credenciales:{
        type: Array
    },
    salonAsignado:{
        type: mongoose.Types.ObjectId
    },
    profesor:{
        type:mongoose.Types.ObjectId
    }
});

const estudiante = mongoose.model('estudiante', estudiantesSchema);

export default estudiante;