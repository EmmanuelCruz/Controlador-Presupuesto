import React from 'react'
import { useState, useEffect } from 'react';
import CloseButton from '../img/cerrar.svg';
import Mensaje from './Mensaje';

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, editarGasto, setEditarGasto }) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [id, setId] = useState('')

    useEffect(() => {
        if(Object.keys(editarGasto).length > 0){
            setNombre(editarGasto.nombre)
            setCantidad(editarGasto.cantidad)
            setCategoria(editarGasto.categoria)
            setId(editarGasto.id)
        }
    }, [])

    const ocultarModal = () => {
        setEditarGasto({})
        setTimeout(() => {
            setModal(false);
        }, 300);
        setAnimarModal(false);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, categoria].includes('') || cantidad <= 0){
            setMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
                setMensaje('');
            }, 3000);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id});
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img onClick={ocultarModal} src={CloseButton} alt="Cerrar" />
            </div>

            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} action="">
                <legend>{editarGasto.nombre ? 'Editar Gasto': 'Nuevo Gasto'} </legend>

                <div className='campo'>
                    <label htmlFor="nombre">Nombre del Gasto</label>
                    <input 
                        type="text"
                        placeholder='Ingresa el nombre de gasto'
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        type="number"
                        placeholder='Ingresa la cantidad'
                        id="cantidad"
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='categoria'>Categoria</label>
                    <select
                        id='categoria'
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione categoría --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="varios">Gastos varios</option>
                        <option value="casa">Casa</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Subscripciones</option>
                    </select>
                </div>

                <input type="submit" value={editarGasto.nombre ? 'Guardar cambios': 'Agregar gasto'}/>
                {
                    mensaje &&
                    <Mensaje tipo='error'>
                        {mensaje}
                    </Mensaje>
                }
            </form>
        </div>
    )
}

export default Modal
