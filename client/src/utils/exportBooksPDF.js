import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const exportBooksPDF = (books) => {

  const doc = new jsPDF()

  // TITLE
  doc.setFontSize(20)

  doc.text(
    'Library Books Report',
    14,
    20
  )

  // TABLE COLUMNS
  const tableColumn = [

    'Title',

    'Author',

    'Category',

    'Status',

  ]

  // TABLE ROWS
  const tableRows = []

  books.forEach((book) => {

    const rowData = [

      book.title,

      book.author,

      book.category,

      book.available
        ? 'Available'
        : 'Borrowed',

    ]

    tableRows.push(rowData)

  })

  // GENERATE TABLE
  autoTable(doc, {

    head: [tableColumn],

    body: tableRows,

    startY: 30,

  })

  // DOWNLOAD PDF
  doc.save('books-report.pdf')
}

export default exportBooksPDF