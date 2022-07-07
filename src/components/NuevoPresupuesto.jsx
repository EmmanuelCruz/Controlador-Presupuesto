import { useState } from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();
        if(!presupuesto || presupuesto<0){
            setMensaje('No es un presupuesto válido')
            return;
        }
        setMensaje('');
        setIsValidPresupuesto(true)
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handlePresupuesto} className='formulario' action="">
                <div className='campo'>
                    <label htmlFor="presupuesto">Definir presupuesto</label>
                    <input
                        id='presupuesto'
                        className='nuevo-presupuesto'
                        placeholder='Añade tu presupuesto'
                        type="number"
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                    />

                    <input type="submit" value="Añadir"/>

                    { mensaje && 
                        <Mensaje tipo="error">{mensaje}</Mensaje>
                    }
                </div>
            </form>
        </div>
    )
}

export default NuevoPresupuesto
