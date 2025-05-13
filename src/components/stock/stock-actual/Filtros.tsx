"use client";

import { useEffect, useState } from "react";
import {
  getPropietarios,
  getGrados,
  getGalpones,
  getEstibas,
  getProductos,
  getCampanias,
} from "@/services/stockService";

interface FiltroParams {
  propietario: string;
  grado: string;
  galpon: string;
  estiba: string;
  tipoProducto: string;
  campania: string;
  cajaDesde: string;
  cajaHasta: string;
  nroCata: string;
}

interface Props {
  onBuscar: (params: FiltroParams) => void;
}

export default function Filtros({ onBuscar }: Props) {
  const [form, setForm] = useState<FiltroParams>({
    propietario: "",
    grado: "",
    galpon: "",
    estiba: "",
    tipoProducto: "",
    campania: "",
    cajaDesde: "",
    cajaHasta: "",
    nroCata: "",
  });

  const [propietarios, setPropietarios] = useState<any[]>([]);
  const [grados, setGrados] = useState<any[]>([]);
  const [galpones, setGalpones] = useState<any[]>([]);
  const [estibas, setEstibas] = useState<any[]>([]);
  const [productos, setProductos] = useState<any[]>([]);
  const [campanias, setCampanias] = useState<any[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setPropietarios(await getPropietarios());
        setGrados(await getGrados());
        setGalpones(await getGalpones());
        setEstibas(await getEstibas());
        setProductos(await getProductos());
        setCampanias(await getCampanias());
      } catch (error) {
        console.error("Error cargando filtros:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <select name="propietario" value={form.propietario} onChange={handleChange} className="border p-2">
        <option value="">-- Propietario --</option>
        {propietarios.map((p) => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>

      <select name="grado" value={form.grado} onChange={handleChange} className="border p-2">
        <option value="">-- Grado --</option>
        {grados.map((g) => (
          <option key={g.id} value={g.id}>{g.nombre}</option>
        ))}
      </select>

      <select name="galpon" value={form.galpon} onChange={handleChange} className="border p-2">
        <option value="">-- Galpón --</option>
        {galpones.map((g) => (
          <option key={g.id} value={g.id}>{g.nombre}</option>
        ))}
      </select>

      <select name="estiba" value={form.estiba} onChange={handleChange} className="border p-2">
        <option value="">-- Estiba --</option>
        {estibas.map((e) => (
          <option key={e.id} value={e.id}>{e.nombre}</option>
        ))}
      </select>

      <select name="tipoProducto" value={form.tipoProducto} onChange={handleChange} className="border p-2">
        <option value="">-- Producto --</option>
        {productos.map((p) => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>

      <select name="campania" value={form.campania} onChange={handleChange} className="border p-2">
        <option value="">-- Campaña --</option>
        {campanias.map((c) => (
          <option key={c.id} value={c.id}>{c.nombre}</option>
        ))}
      </select>

      <input name="cajaDesde" value={form.cajaDesde} onChange={handleChange} className="border p-2" placeholder="Caja Desde" />
      <input name="cajaHasta" value={form.cajaHasta} onChange={handleChange} className="border p-2" placeholder="Caja Hasta" />
      <input name="nroCata" value={form.nroCata} onChange={handleChange} className="border p-2" placeholder="Nro Cata" />

      <div className="col-span-1 md:col-span-3">
        <button onClick={() => onBuscar(form)} className="bg-blue-600 text-white py-2 px-4 rounded mt-2">
          Buscar
        </button>
      </div>
    </div>
  );
}
