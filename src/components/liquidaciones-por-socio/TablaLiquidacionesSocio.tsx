"use client";
import DataTable from "@/components/shared/DataTable";
import { IHeaderItem } from "@/components/shared/DataTable";

interface TablaProps {
  datos: any[];
}

export default function TablaLiquidacionesSocio({ datos }: TablaProps) {
  const columns: IHeaderItem[] = [
    { label: "FET", key: "fet", type: "text" },
    { label: "Socio", key: "socio", type: "text" },
    { label: "Nombre", key: "nombre", type: "text" },
    { label: "Fecha", key: "fecha", type: "date" },
    { label: "Puerta", key: "puerta", type: "text" },
    { label: "Romaneo", key: "romaneo", type: "text" },
    { label: "Formulario", key: "formulario", type: "text" },
    { label: "Liquidación", key: "liquidacion", type: "text" },
    { label: "Kilos", key: "kilos", type: "numeric" },
    { label: "Bruto", key: "bruto", type: "currency" },
    { label: "Código Campaña", key: "codigo_Camp", type: "text" },
  ];

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-bold mb-3">Liquidaciones por Socio</h3>

      {datos.length > 0 ? (
        <DataTable columns={columns} data={datos} />
      ) : (
        <p className="text-gray-500">No hay datos disponibles.</p>
      )}
    </div>
  );
}
