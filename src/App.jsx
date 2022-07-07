import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import { generateId } from './services/utils';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import ListadoGastos from './components/ListadoGastos';
import Filtro from './components/Filtro';

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto'))
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  // Editar gasto
  const [editarGasto, setEditarGasto] = useState({});

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(presupuesto > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(() => {
    if(Object.keys(editarGasto).length > 0){
      handleNuevoGasto()
    }
  }, [editarGasto])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      // Editar
      const gastosActualizado = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizado)
    } else {
      // Se crea nuevo
      gasto.id = generateId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    setEditarGasto({})
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 300);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <div>
        <Header 
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
          gastos={gastos}
          setGastos={setGastos}
        />
      </div>

      {
        isValidPresupuesto &&
        <>
          <main>
            <Filtro 
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} onClick={handleNuevoGasto} alt="IconoNuevoGasto" />
          </div>
        </>
      }

      {
        modal && 
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          editarGasto={editarGasto}
          setEditarGasto={setEditarGasto}
        />
      }

    </div>
  )
}

export default App
