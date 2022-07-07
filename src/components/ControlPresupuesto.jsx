import React from 'react'
import { useState, useEffect } from 'react';
import {CircularProgressbar, buildStyles} from '@rhazegh/react-circular-progressbar'
import "@rhazegh/react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ( {presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto} ) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);
    
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad+total, 0)
        const totalDisponible = presupuesto - totalGastado
        const nuevoPorcentaje = ((presupuesto - totalDisponible) / presupuesto) * 100
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                value={porcentaje}
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#ED1111': '#3B82F6',
                    backgroundColor: '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: '#3B82F6',
                    textColor: porcentaje > 100 ? '#ED1111': '#3B82F6'
                })}
                text={`${porcentaje.toFixed(2)}% Gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleResetApp}>
                Resetear app
            </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={disponible<0 ? 'negativo' : ''}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
        </div>
    )
}

export default ControlPresupuesto
