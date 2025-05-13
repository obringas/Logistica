"use client";

interface DetalleItem {
  id: number;
  lote: string;
  fechaIngreso: string;
  kilos: number;
  humedad: number;
  observaciones: string;
}

interface Props {
  data: DetalleItem[];
  onVolver: () => void;
}

export default function DetalleTabla({ data, onVolver }: Props) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Detalle de Stock</h2>

      <table className="min-w-full border border-gray-300 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Lote</th>
            <th className="p-2 border">Fecha Ingreso</th>
            <th className="p-2 border text-right">Kilos</th>
            <th className="p-2 border text-right">Humedad (%)</th>
            <th className="p-2 border">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-2 border">{item.lote}</td>
              <td className="p-2 border">{item.fechaIngreso}</td>
              <td className="p-2 border text-right">{item.kilos.toLocaleString()}</td>
              <td className="p-2 border text-right">{item.humedad}%</td>
              <td className="p-2 border">{item.observaciones}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={onVolver}
        className="bg-gray-700 text-white py-2 px-4 rounded"
      >
        Volver
      </button>
    </div>
  );
}