import Image from "next/image"
import { formatearDinero } from "@/helpers"
import useQuiosco from "@/hooks/useQuiosco"

export default function Producto({producto}) {

  const { handleSetProducto, handleSetModal } = useQuiosco()
  const {  nombre, imagen, precio } = producto

  return (
    <div className="border m-1 flex flex-col items-center p-3">
      <Image 
        width={200}
        height={300}
        src={`/assets/img/${imagen}.jpg`}
        alt={`icono de ${nombre}`}
      />

      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre} </h3>
        <p className="mt-5 font-black text-amber-500 text-4xl">Precio: {formatearDinero(precio)} </p>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 cursor-pointer text-white p-3 rounded-md uppercase font-black mt-3 w-full text-xl transition-colors"
          onClick={() => {
            handleSetProducto(producto)
            handleSetModal()
          } }
        >
          Agregar
        </button>
      </div>
    </div>
  ) 
}
