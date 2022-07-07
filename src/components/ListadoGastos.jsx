import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({ 
  gastos, 
  setEditarGasto, 
  eliminarGasto, 
  setFiltro, 
  filtro, 
  gastosFiltrados 
}) => {
  return (
    <div className='listado-gastos contenedor'>
      {
        filtro ? 
          <>
            <h2>{ gastosFiltrados.length ? 'Gastos' : 'Aún no hay gastos'}</h2>
            {
              
              gastosFiltrados.map( gasto => (
                <Gasto 
                    gasto={gasto}
                    key={gasto.id}
                    setEditarGasto={setEditarGasto}
                    eliminarGasto={eliminarGasto}
                    setFiltro={setFiltro}
                />
              ))
            }
          </>
         : 
        <>
          <h2>{ gastos.length ? 'Gastos' : 'Aún no hay gastos'}</h2>
          {
            gastos.map( gasto => (
                <Gasto 
                    gasto={gasto}
                    key={gasto.id}
                    setEditarGasto={setEditarGasto}
                    eliminarGasto={eliminarGasto}
                    setFiltro={setFiltro}
                />
            ))
          }
        </>
      }
    </div>
  )
}

export default ListadoGastos
