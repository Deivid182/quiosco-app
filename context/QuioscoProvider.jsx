import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import { useRouter } from "next/router";
const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

  const router = useRouter()

  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState({})
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)
  const [pedido, setPedido] = useState([])
  const [nombre, setNombre] = useState('')
  const [total, setTotal] = useState(0)
  

  const obtenerCategorias = async ()=> {
    try {
      const {data} = await axios('/api/categorias')
      setCategorias(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActual(categorias[0])
  }, [categorias])

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => total + (producto.precio * producto.cantidad) , 0)
    setTotal(nuevoTotal)
  }, [pedido])

  const handleClickCategoria = id => {
    const categoria = categorias.filter(cat =>cat.id === id)
    setCategoriaActual(categoria[0]);
    router.push('/')
  }

  const handleSetProducto = producto => {
    setProducto(producto)
  }

  const handleSetModal = () => {
    setModal(!modal)
  }

  const handleAgregarPedido = ({categoriaId, ...producto}) => {
    //evitar repetidos
    if(pedido.some(productoState => productoState.id === producto.id)){
      const productoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
      setPedido(productoActualizado)
      toast.success('Guardado Correctamente')
    } else {
      setPedido([...pedido, producto])
      toast.success('Agregado al pedido')
    }
    setModal(false)
  }

  const handleEditarCantidades = (id) => {

    const productoActualizar = pedido.filter(producto => producto.id === id)
    setProducto(productoActualizar[0])

    setModal(true)
  }

  const handleEliminarProducto = id => {
    const pedidoActualizado = pedido.filter(productoState => productoState.id !== id )  
    setPedido(pedidoActualizado)
  }

  const colocarOrden = async(e) => {
		e.preventDefault();

    try {
      await axios.post('/api/ordenes',  {pedido, nombre, total, fecha: Date.now().toString()})

      setCategoriaActual(categorias[0])
      setPedido([])
      setNombre('')
      setTotal(0)

      toast.success('Pedido realizado correctamente')
      setTimeout(() =>{
        router.push('/')
      }, 2000)
    } catch (error) {
      console.log(error)
    }

	};

  return (
    <QuioscoContext.Provider 
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        handleSetModal,
        modal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        total,
        colocarOrden
      }}
    >
       {children}
    </QuioscoContext.Provider>
  )
}

export {
  QuioscoProvider
}

export default QuioscoContext