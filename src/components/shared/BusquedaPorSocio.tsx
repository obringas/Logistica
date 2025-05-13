"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // ✅ Importamos el ícono de lupa

interface BusquedaPorSocioProps {
  onBuscar: (filtros: { camp: string; socio: string; fet: string }) => void;
}

export default function BusquedaPorSocio({ onBuscar }: BusquedaPorSocioProps) {
  const [camp, setCamp] = useState("");
  const [socio, setSocio] = useState("");
  const [fet, setFet] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBuscar({ camp, socio, fet });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Buscar por Socio</h3>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        {/* Campo Campaña */}
        <input
          type="text"
          placeholder="Campaña"
          className="p-2 border rounded flex-1"
          value={camp}
          onChange={(e) => setCamp(e.target.value)}
        />

        {/* Campo Número de Socio */}
        <input
          type="text"
          placeholder="Número de Socio"
          className="p-2 border rounded flex-1"
          value={socio}
          onChange={(e) => setSocio(e.target.value)}
        />

        {/* Campo Número FET */}
        <input
          type="text"
          placeholder="Número FET"
          className="p-2 border rounded flex-1"
          value={fet}
          onChange={(e) => setFet(e.target.value)}
        />

        {/* Botón Buscar con Ícono */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded flex items-center">
          <FaSearch className="mr-2" /> Buscar
        </button>
      </form>
    </div>
  );
}
