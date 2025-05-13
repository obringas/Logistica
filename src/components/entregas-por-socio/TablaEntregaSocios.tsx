"use client";
import DataTable from "@/components/shared/DataTable";
import { IHeaderItem } from "@/components/shared/DataTable";

interface TablaProps {
  datos: any[];
}

export default function TablaEntregaSocios({ datos }: TablaProps) {
    const columns: IHeaderItem[] = [
        { label: "Socio", key: "socio", type: "numeric" },
        { label: "FET", key: "fet", type: "numeric" },
        { label: "Código Campaña", key: "codigo_camp", type: "numeric" },
        { label: "Nombre", key: "nombre", type: "text" },
        { label: "Formulario", key: "formulario", type: "text" },
        { label: "Puerta", key: "puerta", type: "numeric" },
        { label: "Romaneo", key: "romaneo", type: "numeric" },
        { label: "Liquidación", key: "liquidacion", type: "numeric" },
        { label: "CUIT", key: "cuit", type: "text" },
        { label: "Fecha", key: "fecha", type: "date" },
        { label: "Total Kilos", key: "totalKilos", type: "numeric" },
        { label: "Importe Total", key: "importeTotal", type: "currency" },
        { label: "x1L", key: "x1L", type: "numeric" },
        { label: "x2L", key: "x2L", type: "numeric" },
        { label: "x3L", key: "x3L", type: "numeric" },
        { label: "x4L", key: "x4L", type: "numeric" },
        { label: "x1F", key: "x1F", type: "numeric" },
        { label: "x2F", key: "x2F", type: "numeric" },
        { label: "x3F", key: "x3F", type: "numeric" },
        { label: "x4F", key: "x4F", type: "numeric" },
        { label: "x2K", key: "x2K", type: "numeric" },
        { label: "x3K", key: "x3K", type: "numeric" },
        { label: "n5X", key: "n5X", type: "numeric" },
        { label: "nvx", key: "nvx", type: "numeric" },
        { label: "c1L", key: "c1L", type: "numeric" },
        { label: "c2L", key: "c2L", type: "numeric" },
        { label: "c3L", key: "c3L", type: "numeric" },
        { label: "c4L", key: "c4L", type: "numeric" },
        { label: "c1F", key: "c1F", type: "numeric" },
        { label: "c2F", key: "c2F", type: "numeric" },
        { label: "c3F", key: "c3F", type: "numeric" },
        { label: "c4F", key: "c4F", type: "numeric" },
        { label: "c2K", key: "c2K", type: "numeric" },
        { label: "c3K", key: "c3K", type: "numeric" },
        { label: "n5C", key: "n5C", type: "numeric" },
        { label: "nvc", key: "nvc", type: "numeric" },
        { label: "b1L", key: "b1L", type: "numeric" },
        { label: "b2L", key: "b2L", type: "numeric" },
        { label: "b3L", key: "b3L", type: "numeric" },
        { label: "b4L", key: "b4L", type: "numeric" },
        { label: "b1F", key: "b1F", type: "numeric" },
        { label: "b2F", key: "b2F", type: "numeric" },
        { label: "b3F", key: "b3F", type: "numeric" },
        { label: "b4F", key: "b4F", type: "numeric" },
        { label: "b2KL", key: "b2KL", type: "numeric" },
        { label: "b3KL", key: "b3KL", type: "numeric" },
        { label: "b2KF", key: "b2KF", type: "numeric" },
        { label: "b3KF", key: "b3KF", type: "numeric" },
        { label: "n5B", key: "n5B", type: "numeric" },
        { label: "nvb", key: "nvb", type: "numeric" },
        { label: "t1L", key: "t1L", type: "numeric" },
        { label: "t2L", key: "t2L", type: "numeric" },
        { label: "t1F", key: "t1F", type: "numeric" },
        { label: "t2F", key: "t2F", type: "numeric" },
        { label: "t2KL", key: "t2KL", type: "numeric" },
        { label: "t2KF", key: "t2KF", type: "numeric" },
        { label: "n5K", key: "n5K", type: "numeric" },       
        { label: "h1F", key: "h1F", type: "numeric" },
        { label: "h2F", key: "h2F", type: "numeric" },
        { label: "h3F", key: "h3F", type: "numeric" },
      ];
    

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-bold mb-3">Entregas por Socio</h3>

      {datos.length > 0 ? (
        <DataTable columns={columns} data={datos} />
      ) : (
        <p className="text-gray-500">No hay datos disponibles.</p>
      )}
    </div>
  );
}
