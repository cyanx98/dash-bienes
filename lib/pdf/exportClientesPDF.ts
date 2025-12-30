import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const generateClientesPDF = (clientes: any[]) => {
  if (!clientes || clientes.length === 0) return

  const doc = new jsPDF('p', 'mm', 'a4')

  /* ===== HEADER ===== */
  doc.setFontSize(18)
  doc.setTextColor(40, 40, 40)
  doc.text('Listado de Clientes', 14, 20)

  doc.setFontSize(11)
  doc.setTextColor(120)
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 28)

  /* ===== TABLE ===== */
  autoTable(doc, {
    startY: 35,
    head: [['Nombre', 'Email', 'Teléfono', 'Fecha registro']],
    body: clientes.map(c => [
      c.nombre,
      c.email,
      c.telefono ?? '-',
      new Date(c.created_at).toLocaleDateString(),
    ]),
    theme: 'striped',
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [37, 99, 235], // blue-600
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: { left: 14, right: 14 },
  })

  /* ===== FOOTER ===== */
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(9)
    doc.setTextColor(150)
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 10
    )
  }

    // doc.save('clientes.pdf')
    return doc
}
