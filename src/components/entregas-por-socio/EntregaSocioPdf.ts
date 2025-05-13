"use client";

import { EntregaSocio } from "@/services/reportesService";
import pdfMake from "pdfmake/build/pdfmake";
import { fonts } from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { RxFontBold } from "react-icons/rx";


if (typeof window !== "undefined") {
  (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
}


const generatePDF = async (data: EntregaSocio[]) => {
  try {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH
    || '';
    if (!data.length) {
      alert("No hay datos para generar el PDF.");
      return;
    }
    const toBase64 = async (url: string): Promise<string> => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };
    // 🔹 Cargar logo en Base64
    const logoBase64 = await toBase64(`/StockLogistica/assets/images/logo.png`);


    const { socio, fet, nombre, codigo_camp } = data[0];
    const fechaImpresion = new Date().toLocaleDateString();

    // 🔹 Definir columnas
    const primaryColumns = ["fecha", "romaneo", "liquidacion", "", "", "", "", "", "", "", "", "", ""];
    const secondaryColumns = ["", "", "", "x1L", "x2L", "x3L", "x4L", "x1F", "x2F", "x3F", "x4F", "x2K", "x3K"];
    const tertiaryColumns = ["", "", "", "n5X", "nvx", "c1L", "c2L", "c3L", "c4L", "c1F", "c2F", "c3F", "c4F"];
    const tertiaryColumns1 = ["", "", "", "c2K", "c3K", "n5C", "nvc", "b1L", "b2L", "b3L", "b4L", "b1F", "b2F"];
    const tertiaryColumns2 = ["", "", "", "b3F", "b4F", "b2KL", "b3KL", "b2KF", "b3KF", "n5B", "nvb", "t1L", "t2L"];
    const tertiaryColumns3 = ["", "", "", "t1F", "t2F", "t2KL", "t2KF", "n5K", "h1F", "h2F", "h3F", "", ""];
    const tertiaryColumns4 = ["", "", "", "", "", "", "", "", "", "", "", "", "Kilos"];   
    const tertiaryColumns5 = ["", "", "", "", "", "", "", "", "", "", "", "", "Importe"];
    // 🔹 Encabezado de la tabla
    let tableBody: any[][] = [];

    // 📌 **Encabezados**
    tableBody.push([
      {
        colSpan: primaryColumns.length,
        style: "tableHeader",
        table: {
          widths: ["auto", "*", "auto"],
          body: [[
            { image: logoBase64, width: 20, alignment: "left" },
            { text: "COOPROTAB - COMPRA TABACO A PRODUCTORES", alignment: "center", fontSize: 10, bold: true },
            { text: `Fecha: ${fechaImpresion}`, alignment: "right", fontSize: 9 }
          ]]
        },
        layout: "noBorders"
      },
      ...Array(primaryColumns.length - 1).fill({})
    ]);

  

     

    tableBody.push(primaryColumns.map(col => ({
      text: col.toUpperCase(),
      style: "tableHeader",
      alignment: "center",
    })));

    tableBody.push(secondaryColumns.map(col => ({
      text: col.toUpperCase(),
      style: "tableHeader",
      alignment: "center",
    })));

    tableBody.push(tertiaryColumns.map(col => ({
      text: col.toUpperCase(),
      style: "tableHeader",
      alignment: "center",
    })));

    tableBody.push(tertiaryColumns1.map(col => ({
      text: col.toUpperCase(),
      style: "tableHeader",
      alignment: "center",
    })));

    tableBody.push(tertiaryColumns2.map(col => ({
      text: col.toUpperCase(),
      style: "tableHeader",
      alignment: "center",
    })));

    tableBody.push(tertiaryColumns3.map(col => ({
      text: col.toUpperCase(),
      style: "tableHeader",
      alignment: "center",
    })));
    tableBody.push(tertiaryColumns4.map(col => ({
      text: col.toUpperCase(),
      style: "tableHeader",
      alignment: "right",
    })));
    tableBody.push(tertiaryColumns5.map(col => ({
      text: col.toUpperCase(),
      style: "tableHeader",
      alignment: "right",
    })));
    tableBody.push([
      {
        columns: [
          { text: `Cosecha ${codigo_camp}`, alignment: "left" },
          { text: `Productor: ${socio} - ${nombre} | FET: ${fet}`}
        ],      
        fontsize: 10,
        bold: true,
        alignment: "right",
        colSpan: primaryColumns.length
      },
      ...Array(primaryColumns.length - 1).fill({})
    ]);
    // 🔹 Variables para totalizar clases
    let totalClases: Record<string, number> = {};

    // 🔹 Agregamos los datos de cada entrega (máximo 6 por página)
    data.forEach((item, index) => {
      if (index % 6 === 0 && index !== 0) {
        tableBody.push([{ text: "", colSpan: primaryColumns.length, pageBreak: "before", border: [false, false, false, false] }]);
      }
      
      const formatValue = (columnName: string, value: any) => {
        if (columnName === "") return ""; // Si la columna es "", mostrar vacío
        return value !== undefined && value !== null ? value.toString() : "0";
      };
    
      tableBody.push(primaryColumns.map(col => ({
        text: formatValue(col, item[col as keyof EntregaSocio]),
        style: "tableData",
        alignment: "center",
      })));

      tableBody.push(secondaryColumns.map(col => ({
        text: formatValue(col, item[col as keyof EntregaSocio]),
        style: "tableData",
        alignment: "center",
      })));

      tableBody.push(tertiaryColumns.map(col => ({
        text: formatValue(col, item[col as keyof EntregaSocio]),
        style: "tableData",
        alignment: "center",
      })));

      tableBody.push(tertiaryColumns1.map(col => ({
        text: formatValue(col, item[col as keyof EntregaSocio]),
        style: "tableData",
        alignment: "center",
      })));

      tableBody.push(tertiaryColumns2.map(col => ({
        text: formatValue(col, item[col as keyof EntregaSocio]),
        style: "tableData",
        alignment: "center",
      })));

      tableBody.push(tertiaryColumns3.map(col => ({
        text: formatValue(col, item[col as keyof EntregaSocio]),
        style: "tableData",
        alignment: "center",
      })));
      tableBody.push(tertiaryColumns4.map(col => ({
        text: formatValue(col, item[col as keyof EntregaSocio]),
        style: "tableData",
        alignment: "right",
      })));
      tableBody.push(tertiaryColumns5.map(col => ({
        text: formatValue(col, item[col as keyof EntregaSocio]),
        style: "tableData",
        alignment: "right",
      })));

   
    });
    // 🔹 Calculamos los totales, asegurándonos de que sean números válidos
    const totalKilos = data.reduce((sum, item) => {
      const kilos = Number(item.Kilos);
      return sum + (isNaN(kilos) ? 0 : kilos);
    }, 0);

    const importeTotal = data.reduce((sum, item) => {
      const importe = Number(item.Importe);
      return sum + (isNaN(importe) ? 0 : importe);
    }, 0);

    // 🔹 Definir documento PDF
    const docDefinition = {
      pageSize: "A4",
    
      pageMargins: [15, 15, 15, 40], // Asegurar espacio para el footer

      footer: (currentPage: number, pageCount: number) => {
        return {
          margin: [15, 0, 15, 10],
          columns: [
              {
                width: "*",
                stack: [
                  {
                    columns: [
                            {image: logoBase64, width: 20, alignment: "left", margin: [0, 0, 5, 0],},
                            {text: "Reporte generado por COOPROTAB", alignment: "left",fontSize: 9, margin: [5, 5, 0, 0],},
                            ],
                  },
                ],
              },
              {width: "auto", text: `Página ${currentPage} de ${pageCount}`, alignment: "center", fontSize: 9,  margin: [0, 5, 0, 0],},
              ],
          };
         },
      
      content: [
       
        { text: "\n" },
        {
          table: {
            headerRows: 10,
            widths: [...Array(primaryColumns.length).fill("auto")],
            body: tableBody,
          },
          layout: "headerLineOnly",
          style: "tableData", 
        },
        { text: "\n" },
       // 🔹 Totales
       { text:`Total General Kilos: ${totalKilos.toLocaleString()} KG`, style: "total", alignment: "right" },
       { text: `Importe Total: $${importeTotal.toFixed(2)}`, style: "total", alignment: "right" },     

      ],
      styles: {
        header: { fontSize: 12, bold: true },
        subheader: { fontSize: 10, bold: true },
        tableHeader: { bold: true, fontSize: 9.5, fillColor: "#eeeeee", alignment: "center" },
        tableData: { fontSize: 7, alignment: "center" },
      },
      
    };
     
    // Generamos y descargamos el PDF
    pdfMake.createPdf(docDefinition).download(`Reporte_Entregas_${socio}.pdf`);

  } catch (error) {
    console.error("Error al generar el PDF:", error);
    alert("Hubo un problema generando el PDF.");
  }
};

export default generatePDF;
