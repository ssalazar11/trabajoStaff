import React from 'react'

const LoginComponente = () => {
    const handleSubmit=(event)=>{
        event.preventDefault();
    }
    
  return (
    <div className='divPrincial' style={{background: 'white'}}>
        <form onSubmit={handleSubmit}>
            <div classname='input-container'>
                <label for='nombre'>Nombre de usuario</label>
                <input type='text' name='nombre' id='nombre'></input>
            </div>
            <div className='input-container'>
                <label for='pass'>Contraseña</label>
                <input type='password' name='pass' id='pass'></input>
            </div>
            <div className='button-container'>
                <input type='submit'></input>
            </div>
        </form>
    </div>
  )
}

export default LoginComponente