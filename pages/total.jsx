import Layout from "@/layout/Layout";
import { useEffect, useCallback } from "react";
import useQuiosco from "@/hooks/useQuiosco";
import { formatearDinero } from "@/helpers";

export default function Total() {
	const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

	const comprobarPedido = useCallback(() => {
		return pedido.length === 0 || nombre === '' || nombre.length < 3;
	}, [pedido, nombre]);

	useEffect(() => {
		comprobarPedido();
	}, [pedido, comprobarPedido]);


	return (
		<Layout pagina={"Total"}>
			<h1 className="text-4xl font-black">Total y confirmar pedido</h1>
			<p className="text-xl my-10">Confirma tu pedido a continuacion</p>

			<form onSubmit={colocarOrden}>
				<div>
					<label
						htmlFor="nombre"
						className="block uppercase text-slate-800 font-bold text-xl"
					>
						Nombre
					</label>
					<input
						type="text"
						className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
						id="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
					/>
				</div>
				<div className="mt-10">
					<p className="text-2xl">
						Total a pagar <span className="font-bold">{formatearDinero(total)} </span>
					</p>
				</div>

				<div className="mt-10">
					<input
						type={"submit"}
						value={"Confirmar Pedido"}
						className={`${comprobarPedido() ? 'bg-indigo-200' : 'bg-indigo-600'} text-white cursor-pointer p-2 uppercase rounded-md text-center font-bold w-full lg:w-auto`}
            disabled={comprobarPedido()}
					/>
				</div>
			</form>
		</Layout>
	);
}
