import React from 'react'

const Filtro = ({setFiltro}) => {
    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label htmlFor="filtrar">Filtrar gastos</label>
                    <select name="filtroGastos" id="filtrar" onChange={e => setFiltro(e.target.value)}>
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
            </form>
        </div>
    )
}

export default Filtro
