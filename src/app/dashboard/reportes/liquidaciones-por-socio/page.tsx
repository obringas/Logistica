"use client";
import { useState } from "react";
import BusquedaPorSocio from "@/components/shared/BusquedaPorSocio";
import TablaLiquidacionesSocio from "@/components/liquidaciones-por-socio/TablaLiquidacionesSocio";
import { obtenerliquidaciones, Entrega } from "@/services/reportesService";
import * as XLSX from "xlsx"; // ✅ Importamos la librería para exportar a Excel

export default function LiquidacionesPorSocio() {
  const [resultado, setResultado] = useState<Entrega[]>([]);
  const [cargando, setCargando] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");

  const getDatos = async (filtros: { camp: string; socio: string; fet: string }) => {
    setCargando(true);
    setErrorMensaje("");

    try {
      const data = await obtenerliquidaciones(filtros.camp, filtros.socio ? Number(filtros.socio) : null, filtros.fet);
      setResultado(data);
    } catch (error) {
      setErrorMensaje("Error al obtener los datos.");
    }

    setCargando(false);
  };

  // ✅ Función para Exportar a Excel
  const exportToExcel = () => {
    if (resultado.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(resultado);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Liquidaciones");
    XLSX.writeFile(workbook, "Liquidaciones_Por_Socio.xlsx");
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Liquidaciones por Socio</h2>
      <BusquedaPorSocio onBuscar={getDatos} />

      {cargando && <p className="text-blue-500">Cargando datos...</p>}
      {errorMensaje && <p className="text-red-500">{errorMensaje}</p>}
      {!cargando && resultado.length > 0 && <p className="text-green-500">Se encontraron {resultado.length} registros.</p>}
      {!cargando && resultado.length === 0 && <p className="text-yellow-500">No hay datos para mostrar.</p>}

      {resultado.length > 0 && (
        <>
          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white p-2 rounded mb-4"
          >
            📥 Exportar a Excel
          </button>
          <TablaLiquidacionesSocio datos={resultado} />
        </>
      )}
    </div>
  );
}
