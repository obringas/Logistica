"use client";
import { useState } from "react";
import BusquedaPorSocio from "@/components/shared/BusquedaPorSocio";
import TablaEntregaSocios from "@/components/entregas-por-socio/TablaEntregaSocios";
import { obtenerentregas, Entrega, EntregaSocio } from "@/services/reportesService";
import * as XLSX from "xlsx"; // ✅ Librería para exportar a Excel
import  generatePDF from "@/components/entregas-por-socio/EntregaSocioPdf"; // ✅ Importamos la función de generación de PDF

import { FaFilePdf } from "react-icons/fa"; // ✅ Icono de PDF
import { FaFileExcel } from "react-icons/fa"; // ✅ Icono de Excel

export default function EntregasPorSocio() {
  const [buscando, setBuscando] = useState(false);
  const [resultado, setResultado] = useState<Entrega[]>([]);
  const [cargando, setCargando] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");

  const handleBuscar = () => {
    setBuscando(true);
  };

  const getDatos = async (filtros: { camp: string; socio: string; fet: string }) => {
    setCargando(true);
    setErrorMensaje("");

    try {
      const data = await obtenerentregas(filtros.camp, filtros.socio ? Number(filtros.socio) : null, filtros.fet);
      setResultado(data);
    } catch (error) {
      setErrorMensaje("Error al obtener los datos.");
    }

    setCargando(false);
  };

  // ✅ Función para convertir el resultado a tipo `Entrega[]`
  const transformToEntregaArray = (data: any[]): EntregaSocio[] => {
    return data.map((item) => ({
      socio: item.socio ?? 0,
      fet: item.fet ?? 0,
      codigo_camp: item.codigo_camp ?? 0,
      nombre: item.nombre ?? "",
      formulario: item.formulario ?? "",
      puerta: item.puerta ?? 0,
      romaneo: `${item.puerta ?? 0}-${item.romaneo ?? 0}`, // Concatenación como string
      liquidacion: `${item.formulario ?? ""}-${item.liquidacion ?? 0}`, // Concatenación como string
      cuit: item.cuit ?? "",
      fecha: item.fecha ? new Date(item.fecha).toISOString().split('T')[0] : "", // Convierte a 'YYYY-MM-DD'
      Kilos: item.totalKilos ?? 0,
      Importe: item.importeTotal ?? 0,

        // Clases de compra
        x1L: item.x1L ?? 0,
        x2L: item.x2L ?? 0,
        x3L: item.x3L ?? 0,
        x4L: item.x4L ?? 0,
        x1F: item.x1F ?? 0,
        x2F: item.x2F ?? 0,
        x3F: item.x3F ?? 0,
        x4F: item.x4F ?? 0,
        x2K: item.x2K ?? 0,
        x3K: item.x3K ?? 0,
        n5X: item.n5X ?? 0,
        nvx: item.nvx ?? 0,
        c1L: item.c1L ?? 0,
        c2L: item.c2L ?? 0,
        c3L: item.c3L ?? 0,
        c4L: item.c4L ?? 0,
        c1F: item.c1F ?? 0,
        c2F: item.c2F ?? 0,
        c3F: item.c3F ?? 0,
        c4F: item.c4F ?? 0,
        c2K: item.c2K ?? 0,
        c3K: item.c3K ?? 0,
        n5C: item.n5C ?? 0,
        nvc: item.nvc ?? 0,
        b1L: item.b1L ?? 0,
        b2L: item.b2L ?? 0,
        b3L: item.b3L ?? 0,
        b4L: item.b4L ?? 0,
        b1F: item.b1F ?? 0,
        b2F: item.b2F ?? 0,
        b3F: item.b3F ?? 0,
        b4F: item.b4F ?? 0,
        b2KL: item.b2KL ?? 0,
        b3KL: item.b3KL ?? 0,
        b2KF: item.b2KF ?? 0,
        b3KF: item.b3KF ?? 0,
        n5B: item.n5B ?? 0,
        nvb: item.nvb ?? 0,
        t1L: item.t1L ?? 0,
        t2L: item.t2L ?? 0,
        t1F: item.t1F ?? 0,
        t2F: item.t2F ?? 0,
        t2KL: item.t2KL ?? 0,
        t2KF: item.t2KF ?? 0,
        n5K: item.n5K ?? 0,
        sss: item.sss ?? 0,
        h1F: item.h1F ?? 0,
        h2F: item.h2F ?? 0,
        h3F: item.h3F ?? 0,
    }));
};


  // ✅ Función para Exportar a Excel
  const exportToExcel = () => {
    if (resultado.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(resultado);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entregas");
    XLSX.writeFile(workbook, "Entregas_Por_Socio.xlsx");
  };

  // ✅ Función para Exportar a PDF
  const exportToPDF = () => {
    if (resultado.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    const entregaArray: EntregaSocio[] = transformToEntregaArray(resultado); // 🔥 Convertimos `resultado` a `Entrega[]`
    generatePDF(entregaArray);
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Entregas por Socio</h2>
      <BusquedaPorSocio onBuscar={getDatos} />

      {cargando && <p className="text-blue-500">Cargando datos...</p>}
      {errorMensaje && <p className="text-red-500">{errorMensaje}</p>}
      {!cargando && resultado.length > 0 && <p className="text-green-500">Se encontraron {resultado.length} registros.</p>}
      {!cargando && resultado.length === 0 && <p className="text-yellow-500">No hay datos para mostrar.</p>}

      {resultado.length > 0 && (
        <>
          <div className="flex gap-4 mb-4">
            {/* 📥 Botón de Exportar a Excel */}
            <button
              onClick={exportToExcel}
              className="bg-green-500 text-white p-2 rounded flex items-center gap-2"
            >
              <FaFileExcel /> Exportar a Excel
            </button>

            {/* 📄 Botón de Exportar a PDF */}
            <button
              onClick={exportToPDF}
              className="bg-red-500 text-white p-2 rounded flex items-center gap-2"
            >
              <FaFilePdf /> Exportar a PDF
            </button>
          </div>

          <TablaEntregaSocios datos={resultado} />
        </>
      )}
    </div>
  );
}
