import Image from "next/image"
import Categoria from "./Categoria"
import useQuiosco from "@/hooks/useQuiosco"

export default function Sidebar() {

  const {categorias} = useQuiosco()

  return (
    <>
      <Image 
        width={100}
        height={100}
        src={'/assets/img/logo.svg'}
        alt={'logo quiosco'}
        priority
        className="mx-auto mb-2"
      />

      <nav>
        {categorias.map(categoria => (
          <Categoria 
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </nav>
    </>
  )
}
