import mongoose from 'mongoose';

const estudiantesSchema = new mongoose.Schema({
    nombre:String,
    nucleoFamiliar:Array,
    asignatura:Array,
    inicioFinalClases:Array,
    rol:mongoose.Types.ObjectId,
    horarioOriginal:{
        dia:String,
        hora:String,
    },
    horarioReemplazo:{
        dia:String,
        hora:String,
    },
    credenciales:Array,
    salonAsignado:mongoose.Types.ObjectId,
    profesor:mongoose.Types.ObjectId
});

const Estudiantes = mongoose.model('Estudiantes', estudiantesSchema, 'Estudiantes');
console.log(Estudiantes);

export default Estudiantes;