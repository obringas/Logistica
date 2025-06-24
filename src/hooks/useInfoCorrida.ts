import { useState } from "react";
import {
  obtenerBlends,
  obtenerOperaciones,
  buscarCorrida,
  CorridaRequest,
  CorridaResponse, // <--- Agregamos la interfaz correcta
  BlendRequest,
  OperacionRequest,
  obtenerProductos, // <-- nuevo
  ProductoResultadoItem,
  obtenerSobrantes,
  obtenerMermas, // <-- nuevo
  obtenerReprocesos, // <-- nuevo
  ReprocesosResponse,
  ProductoCajaResponse,
  obtenerCajas
} from "@/services/procesoService";

export function useInfoCorrida() {
  const [campania, setCampania] = useState<number | null>(null);
  const [blendSeleccionado, setBlendSeleccionado] = useState<number | null>(null);
  const [operacionSeleccionada, setOperacionSeleccionada] = useState<number | null>(null);

  const [blends, setBlends] = useState<{ nroBlend: number; descripcion: string }[]>([]);
  const [operaciones, setOperaciones] = useState<{ nroOperacionMp: number }[]>([]);

  const [resultados, setResultados] = useState<CorridaResponse[]>([]); // <--- Usamos CorridaResponse
 const [productos, setProductos] = useState<ProductoResultadoItem[]>([]);
 const [sobrantes, setSobrantes] = useState<ProductoResultadoItem[]>([]);
 const [mermas, setMermas] = useState<CorridaResponse[]>([])
  const [reprocesos, setReprocesos] = useState<ReprocesosResponse[]>([]); // <-- nuevo
  const [loading, setLoading] = useState(false);
  const [cajas, setCajas] = useState<ProductoCajaResponse[]>([]); // <-- nuevo

  const cargarBlends = async (campania: number) => {
    setCampania(campania);
    setBlendSeleccionado(null);
    setOperacionSeleccionada(null);
    setOperaciones([]);
    try {
      const data = await obtenerBlends({ campania } as BlendRequest); // <--- Ajustamos argumento
      setBlends(data);
    } catch (error) {
      console.error("Error al obtener blends:", error);
    }
  };

  const cargarOperaciones = async (nroBlend: number) => {
    setBlendSeleccionado(nroBlend);
    setOperacionSeleccionada(null);
    try {
      const data = await obtenerOperaciones({ nroBlend } as OperacionRequest); // <--- Ajustamos argumento
      setOperaciones(data);
    } catch (error) {
      console.error("Error al obtener operaciones:", error);
    }
  };

  const buscar = async () => {
    if (!campania || !operacionSeleccionada) return;
    setLoading(true);
    try {
      const filtros: CorridaRequest = {
        campania,
        nroOperacion: operacionSeleccionada,
      };
      const data = await buscarCorrida(filtros);
      setResultados(data);
       const totalVerde = data.find((r) => r.claseGi.trim().toUpperCase() === "TOTAL")?.kilos ?? 0;

      const productosResponse = await obtenerProductos({
        nroOperacion: operacionSeleccionada,
        campaña: campania,
        totalVerde,
        soloAceptado: false,
      });

      setProductos(productosResponse);

      const sobrantesResponse = await obtenerSobrantes({
        nroOperacion: operacionSeleccionada,
        campaña: campania,
        totalVerde,
        soloAceptado: false,
      });
      setSobrantes(sobrantesResponse);
      
      const mermasResponse = await obtenerMermas({
        campania,
        nroOperacion: operacionSeleccionada,
      });
      setMermas(mermasResponse);
      const reprocesosResponse = await obtenerReprocesos({
        nroBlend: blendSeleccionado ?? 0,
        nroOperacion: operacionSeleccionada,
      });
      setReprocesos(reprocesosResponse);


    } catch (error) {
      console.error("Error al buscar corrida:", error);
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

   const buscarCajas = async () => {
    if (!campania || !operacionSeleccionada) return;
    setLoading(true);
    try {
      const filtros: CorridaRequest = {
        campania,
        nroOperacion: operacionSeleccionada,
      };
      const data = await obtenerCajas(filtros);
      setCajas(data);    
      
    } catch (error) {
      console.error("Error al buscar corrida:", error);
      setCajas([]);
    } finally {
      setLoading(false);
    }
   }

  return {
    campania,
    setCampania,
    setBlendSeleccionado, // 👈 agregar esto
    blendSeleccionado,
    operacionSeleccionada,
    setOperacionSeleccionada, // 👈 agregar esto
    blends,
    operaciones,
    resultados,
    productos, // <-- nuevo
    sobrantes, // <-- nuevo
    mermas, // <-- nuevo
    reprocesos, // <-- nuevo
    loading,
    cargarBlends,
    cargarOperaciones,
    buscar,
    buscarCajas,
    cajas
  };
}
