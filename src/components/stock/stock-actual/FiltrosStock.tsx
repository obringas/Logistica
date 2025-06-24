import { useEffect, useState } from "react";
import { StockFilters } from "@/hooks/useStockData";
import { useGradoData } from "@/hooks/useGrados";
import { useCampaniaData } from "@/hooks/useCampaniaData"; // 👈 nuevo hook

interface Props {
  filters: StockFilters;
  onChange: (filters: StockFilters) => void;
  onSubmit: () => void;
  loading: boolean;
}

const campañas = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const productos = [
  { id: 0, codigo: 0, descripcion: "Todos" },
  { id: 1, codigo: 6, descripcion: "Fardito" },
  { id: 2, codigo: 100, descripcion: "Lamina" },
  { id: 3, codigo: 200, descripcion: "Scrap Grande" },
  { id: 4, codigo: 300, descripcion: "Scrap Chico" },
  { id: 5, codigo: 400, descripcion: "Palo Largo" },
  { id: 6, codigo: 500, descripcion: "Palo Mezcla" },
  { id: 7, codigo: 600, descripcion: "Palo Corto" },
  { id: 8, codigo: 900, descripcion: "Fibra" },
  { id: 9, codigo: 1000, descripcion: "Tabaco Importado" },
  { id: 10, codigo: 9999, descripcion: "SIN TIPO PRODUCTO" },
];

export function FiltrosStock({ filters, onChange, onSubmit, loading }: Props) {
  const [gradosOptions, setGradosOptions] = useState([{ id: 0, nombre: "Todos" }]);
  const { grados, fetchGrados } = useGradoData();
  const { campanias, fetchCampanias, loading: loadingCampanias } = useCampaniaData(); // 👈 usamos el hook


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: Number(value) });
  };
    useEffect(() => {
    fetchCampanias(); // 👈 carga automática al montar el componente
  }, []);

  useEffect(() => {
    if (!filters.codCampania) return;

    fetchGrados(filters.codCampania, 3);
  }, [filters.codCampania]);

  useEffect(() => {
    const mapped = grados.map(g => ({
      id: g.idGradoMarca,
      nombre: g.nombreGradoMarca,
    }));
    setGradosOptions([{ id: 0, nombre: "Todos" }, ...mapped]);

    // Si no hay grado seleccionado aún, ponemos -1
    if (filters.idGrado === undefined || filters.idGrado === null) {
      onChange({ ...filters, idGrado: 0 });
    }
  }, [grados]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Campaña</label>
          <select
            name="codCampania"
            value={filters.codCampania}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              disabled={loadingCampanias}
          >
            {loadingCampanias ? (
              <option>Cargando...</option>
            ) : (
              campanias.map(c => (
                <option key={c.codigo_Camp} value={c.codigo_Camp}>
                  {c.codigo_Camp}
                </option>
              ))
            )}         
          
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Producto</label>
          <select
            name="idProducto"
            value={filters.idProducto}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {productos.map(p => (
              <option key={p.id} value={p.id}>{p.descripcion}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Grado</label>
          <select
            name="idGrado"
            value={filters.idGrado}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {gradosOptions.map(g => (
              <option key={`grado-${g.id}`} value={g.id}>{g.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Caja Desde</label>
          <input
            type="number"
            name="cajaDesde"
            value={filters.cajaDesde}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Caja Hasta</label>
          <input
            type="number"
            name="cajaHasta"
            value={filters.cajaHasta}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Nro de Cata</label>
          <input
            type="number"
            name="nroCataBuscar"
            value={filters.nroCataBuscar}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={onSubmit}
          disabled={loading}
          className={`px-5 py-2 rounded-lg text-sm font-semibold text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Consultando..." : "Buscar"}
        </button>
      </div>
    </div>
  );
}
