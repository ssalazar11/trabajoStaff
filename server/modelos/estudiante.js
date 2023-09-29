import mongoose from 'mongoose';

const estudiantesSchema = new mongoose.Schema({
    Codigo_estudiante:String,
    Primer_nombre:String,
    Segundo_nombre:String,
    Primer_apellido:String,
    Segundo_apellido:String,
    Codigo_tipo_identificacion:String,
    Numero_identificacion:String,
    Genero:String,
    Email:String,
    Telefono:String,
    Celular:String,
    Fecha_nacimiento:String,
    Lugar_nacimiento:String,
    Lugar_residencia:String,
    Direccion:String,
    Familiares_relacionados:{
        
    },
});

const Estudiantes = mongoose.model('Estudiantes', estudiantesSchema, 'Estudiantes');
console.log(Estudiantes);

export default Estudiantes;