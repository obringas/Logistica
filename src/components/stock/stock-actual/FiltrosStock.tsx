import { StockFilters } from "@/hooks/useStockData";

interface Props {
  filters: StockFilters;
  onChange: (filters: StockFilters) => void;
  onSubmit: () => void;
  loading: boolean;
}

// Opciones simuladas para filtros estáticos
const campañas = [2017,2018,2019,2020,2021,2022, 2023, 2024,2025];
const productos = [
  { id: 0, nombre: "Todos" },
  { id: 1, nombre: "Producto A" },
  { id: 2, nombre: "Producto B" },
];
const grados = [
  { id: 0, nombre: "Todos" },
  { id: 10, nombre: "Grado 10" },
  { id: 20, nombre: "Grado 20" },
];

export function FiltrosStock({ filters, onChange, onSubmit, loading }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: Number(value) });
  };

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
          >
            {campañas.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
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
              <option key={p.id} value={p.id}>{p.nombre}</option>
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
            {grados.map(g => (
              <option key={g.id} value={g.id}>{g.nombre}</option>
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
