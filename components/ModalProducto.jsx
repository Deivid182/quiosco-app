import { useState, useEffect } from "react"
import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco"
import { formatearDinero } from "@/helpers"

export default function ModalProducto() {

  const { producto, handleSetModal, handleAgregarPedido, pedido } = useQuiosco()
  const [cantidad, setCantidad] = useState(1)
  const [edicion, setEdicion] = useState(false)
  useEffect(() => {
    if(pedido.some(pedidoState => pedidoState.id === producto.id)) {
      const pedidoEdicion = pedido.find(pedidoState => pedidoState.id === producto.id )
      setEdicion(true)
      setCantidad(pedidoEdicion.cantidad)
    } 
  }, [producto, pedido])

    

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image 
          width={300}
          height={400}
          alt={`imagen de ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
        />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button
            onClick={() => handleSetModal()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{producto.nombre} </h1>
        <p className="mt-5 font-black text-amber-500 text-5xl">{formatearDinero(producto.precio)} </p>

        <div className="flex gap-5 mt-3 ">
          <button 
            type="submit"
            onClick={() => {
              if(cantidad <= 1) return 
              setCantidad(cantidad-1)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <p className="text-3xl">{cantidad} </p>
          <button
            type="button"
            onClick={() => setCantidad(cantidad+1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <div>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 cursor-pointer uppercase font-black p-5 rounded-md text-white mt-4 transition-colors"
          onClick={() => handleAgregarPedido({...producto, cantidad})}
        >
          {edicion ? 'Guardar Cambios' : 'Agregar al pedido'}
        </button>
        </div>
      </div>
    </div>
  )
}
