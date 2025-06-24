interface HexLabel {
  hex: string;
  decimal: number;
}

export function openHtmlLabelSheet(
  data: HexLabel[],
  format: "decimal" | "hex" = "decimal"
) {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Avery J8659 Label Sheet</title>
    <style>
      @page {
        size: A4;
        margin: 0;
      }
  
      @media print {
        body {
          margin: 0 !important;
          padding: 0 !important;
        }
        .label-sheet {
          display: grid;
          grid-template-columns: repeat(10, 17.78mm);
          grid-template-rows: repeat(27, 10mm);
          gap: 0mm 2.58mm !important;
          padding-top: 12.7mm;
          padding-left: 4.2mm;
          width: 210mm;
          height: 297mm;
          box-sizing: border-box;
          font-size: 9pt;
        }
        .label {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 10mm;
          width: 17.78mm;
          box-sizing: border-box;
          text-align: center;
        }
      }
    </style>
  </head>
  <body>
    <div class="label-sheet">
      ${(<HexLabel[]>data).map((item: HexLabel) => `<div class="label">${format === "decimal" ? item.decimal : item.hex}</div>`).join("")}
    </div>
    <script>
      window.onload = () => window.print();
    </script>
  </body>
  </html>`;

  const newWindow = window.open("", "_blank");
  if (newWindow) {
    newWindow.document.write(html);
    newWindow.document.close();
  }
}
