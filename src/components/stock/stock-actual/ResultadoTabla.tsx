"use client";

interface ResultadoItem {
  id: number;
  producto: string;
  galpon: string;
  estiba: string;
  grado: string;
  kilos: number;
  cajas: number;
}

interface Props {
  data: ResultadoItem[];
  onDetalleClick: (item: ResultadoItem) => void;
}

export default function ResultadoTabla({ data, onDetalleClick }: Props) {
  const totalKilos = data.reduce((sum, item) => sum + item.kilos, 0);
  const totalCajas = data.reduce((sum, item) => sum + item.cajas, 0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Galpón</th>
            <th className="p-2 border">Estiba</th>
            <th className="p-2 border">Grado</th>
            <th className="p-2 border text-right">Kilos</th>
            <th className="p-2 border text-right">Cajas</th>
            <th className="p-2 border"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-2 border">{item.producto}</td>
              <td className="p-2 border">{item.galpon}</td>
              <td className="p-2 border">{item.estiba}</td>
              <td className="p-2 border">{item.grado}</td>
              <td className="p-2 border text-right">{item.kilos.toLocaleString()}</td>
              <td className="p-2 border text-right">{item.cajas}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => onDetalleClick(item)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Ver detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-200">
          <tr>
            <td className="p-2 border font-bold" colSpan={4}>Totales</td>
            <td className="p-2 border text-right font-bold">{totalKilos.toLocaleString()}</td>
            <td className="p-2 border text-right font-bold">{totalCajas}</td>
            <td className="p-2 border"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
