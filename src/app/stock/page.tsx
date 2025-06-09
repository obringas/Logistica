"use client";

import { useState } from "react";
//import Filtros from "@/components/stock/stock-actual/Filtros";
//import ResultadoTabla from "@/components/stock/stock-actual/ResultadoTabla";
//import DetalleTabla from "@/components/stock/stock-actual/DetalleTabla";

const mockResultados = [
  {
    id: 1,
    producto: "Tabaco",
    galpon: "Galpón 1",
    estiba: "E1",
    grado: "A",
    kilos: 1230,
    cajas: 10,
  },
  {
    id: 2,
    producto: "Tabaco",
    galpon: "Galpón 2",
    estiba: "E2",
    grado: "B",
    kilos: 1560,
    cajas: 12,
  },
];

const mockDetalle = [
  {
    id: 1,
    lote: "L-001",
    fechaIngreso: "2024-01-15",
    kilos: 600,
    humedad: 12,
    observaciones: "Sin observaciones",
  },
  {
    id: 2,
    lote: "L-002",
    fechaIngreso: "2024-01-18",
    kilos: 630,
    humedad: 13,
    observaciones: "Ligeramente húmedo",
  },
];

export default function Page() {
  const [resultados, setResultados] = useState(mockResultados);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [detalle, setDetalle] = useState(mockDetalle);

  const handleBuscar = (filtros: any) => {
    console.log("Buscar con filtros:", filtros);
    setResultados(mockResultados);
    setDetalleVisible(false);
  };

  const handleDetalleClick = (item: any) => {
    console.log("Ver detalle de:", item);
    setDetalle(mockDetalle); // luego: fetch de backend con item.id
    setDetalleVisible(true);
  };

  const handleVolver = () => {
    setDetalleVisible(false);
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Consultar Stock </h2>
    
    </div>
  );
}
