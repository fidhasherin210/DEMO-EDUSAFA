import React, { useRef } from 'react'
import { X, Download, Printer, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const FeeReceipt = ({
  studentDetails: propStudentDetails,
  feeDetails: propFeeDetails = [],
  totalFee: propTotalFee,
  totalPaid: propTotalPaid,
  balance: propBalance,
  selectedYearName: propSelectedYearName,
  onClose,
}) => {
  const receiptRef = useRef(null)

  // Sample Data (used if props are not provided)
  const sampleStudentDetails = {
    school_name: "Al-Noor International School",
    school_place: "Mumbai, Maharashtra",
    school_address: "Juhu Lane, Andheri West, Mumbai - 400053",
    student_name: "Ahmed Khan",
    name: "Ahmed Khan",
    reg_number: "STU2024001",
    reg_no: "STU2024001",
    class: "10 A",
    std: "10 A",
    place: "Mumbai",
  }

  const sampleFeeDetails = [
    {
      amount: 5000,
      receiver: "Tuition Fee",
      fee_type: "Tuition",
      month: "January 2025",
      paid_date: "05-01-2025"
    },
    {
      amount: 5000,
      receiver: "Tuition Fee",
      fee_type: "Tuition",
      month: "February 2025",
      paid_date: "03-02-2025"
    },
    {
      amount: 2500,
      receiver: "Sports Fee",
      fee_type: "Sports",
      month: "January 2025",
      paid_date: "05-01-2025"
    },
    {
      amount: 1500,
      receiver: "Library Fee",
      fee_type: "Library",
      month: "January 2025",
      paid_date: "05-01-2025"
    },
    {
      amount: 5000,
      receiver: "Tuition Fee",
      fee_type: "Tuition",
      month: "March 2025",
      paid_date: "02-03-2025"
    }
  ]

  const sampleTotalFee = 30000
  const sampleTotalPaid = 19000
  const sampleBalance = 11000
  const sampleSelectedYearName = "2024-2025"

  // Use provided props or fall back to sample data
  const studentDetails = propStudentDetails || sampleStudentDetails
  const feeDetails = propFeeDetails.length > 0 ? propFeeDetails : sampleFeeDetails
  const totalFee = propTotalFee !== undefined ? propTotalFee : sampleTotalFee
  const totalPaid = propTotalPaid !== undefined ? propTotalPaid : sampleTotalPaid
  const balance = propBalance !== undefined ? propBalance : sampleBalance
  const selectedYearName = propSelectedYearName || sampleSelectedYearName

  const generateReceiptNumber = () => {
    const timestamp = Date.now().toString().slice(-8)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `RCP-${timestamp}${random}`
  }

  const receiptNumber = generateReceiptNumber()
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric'
  })

  const getStatus = () => {
    if (balance === 0) return { text: 'PAID IN FULL', color: '#059669', bg: '#ecfdf5', border: '#6ee7b7', icon: CheckCircle }
    if (totalPaid > 0) return { text: 'PARTIALLY PAID', color: '#d97706', bg: '#fffbeb', border: '#fcd34d', icon: Clock }
    return { text: 'PENDING', color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', icon: AlertCircle }
  }

  const status = getStatus()
  const pct = totalFee > 0 ? Math.min(Math.round((totalPaid / totalFee) * 100), 100) : 0

  // Build fee history rows from feeDetails prop
  const feeHistory = feeDetails && feeDetails.length > 0 ? feeDetails : []

  const handleDownloadPDF = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const navy = [15, 23, 42]
    const blue = [37, 99, 235]
    const gray = [100, 116, 139]
    const lightGray = [248, 250, 252]
    const green = [5, 150, 105]
    const red = [220, 38, 38]
    const amber = [217, 119, 6]

    const pageW = 210

    // ── Header stripe ──────────────────────────────────────────
    doc.setFillColor(...navy)
    doc.rect(0, 0, pageW, 36, 'F')

    // School name
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(13).setFont('helvetica', 'bold')
    doc.text(studentDetails?.school_name || 'School Name', 14, 13)
    doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(148, 163, 184)
    doc.text(studentDetails?.school_place || studentDetails?.school_address || '', 14, 20)
    doc.setFontSize(7).setTextColor(100, 116, 139)
    doc.text('OFFICIAL FEE RECEIPT', 14, 27)

    // Receipt box top-right
    doc.setFillColor(30, 41, 59)
    doc.roundedRect(pageW - 68, 5, 54, 26, 2, 2, 'F')
    doc.setTextColor(148, 163, 184)
    doc.setFontSize(6.5).setFont('helvetica', 'normal')
    doc.text('RECEIPT NO.', pageW - 65, 12)
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(7.5).setFont('helvetica', 'bold')
    doc.text(receiptNumber, pageW - 65, 18)
    doc.setTextColor(148, 163, 184)
    doc.setFontSize(6.5).setFont('helvetica', 'normal')
    doc.text(currentDate, pageW - 65, 24)

    // Status badge
    const sColor = balance === 0 ? [5, 150, 105] : totalPaid > 0 ? [217, 119, 6] : [220, 38, 38]
    doc.setFillColor(...sColor)
    doc.roundedRect(14, 38, 45, 7, 1.5, 1.5, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(7).setFont('helvetica', 'bold')
    const statusText = balance === 0 ? 'PAID IN FULL' : totalPaid > 0 ? 'PARTIALLY PAID' : 'PENDING'
    doc.text(statusText, 19, 43.5)

    // ── Student Details ────────────────────────────────────────
    let y = 52
    doc.setFillColor(...lightGray)
    doc.rect(14, y, pageW - 28, 6, 'F')
    doc.setTextColor(...gray)
    doc.setFontSize(7).setFont('helvetica', 'bold')
    doc.text('STUDENT DETAILS', 17, y + 4.2)

    y += 8
    const studentRows = [
      ['Student Name', studentDetails?.student_name || studentDetails?.name || '—'],
      ['Reg. No.', studentDetails?.reg_number || studentDetails?.reg_no || '—'],
      ['Class', studentDetails?.class || studentDetails?.std || '—'],
      ['Place', studentDetails?.place || '—'],
      ['Academic Year', selectedYearName || '—'],
    ]

    const colW = (pageW - 28) / 2 - 4
    studentRows.forEach((row, i) => {
      const col = i % 2
      const row2 = Math.floor(i / 2)
      const xPos = 14 + col * (colW + 8)
      const yPos = y + row2 * 9

      doc.setTextColor(...gray)
      doc.setFontSize(7).setFont('helvetica', 'normal')
      doc.text(String(row[0] ?? ''), xPos, yPos)
      doc.setTextColor(...navy)
      doc.setFontSize(8.5).setFont('helvetica', 'bold')
      doc.text(String(row[1] ?? '—'), xPos, yPos + 4.5)
    })

    // ── Fee History Table (Payment Records) ────────────────────
    y += Math.ceil(studentRows.length / 2) * 9 + 8

    doc.setFillColor(...lightGray)
    doc.rect(14, y, pageW - 28, 6, 'F')
    doc.setTextColor(...gray)
    doc.setFontSize(7).setFont('helvetica', 'bold')
    doc.text('PAYMENT HISTORY', 17, y + 4.2)
    y += 8

    if (feeHistory.length > 0) {
      autoTable(doc, {
        startY: y,
        head: [['#', 'Receiver', 'Month', 'Paid Amount (₹)', 'Date']],
        body: feeHistory.map((f, idx) => {
          const paidAmount = f.amount || 0
          return [
            String(idx + 1),
            String(f.receiver || f.fee_type || '—'),
            String(f.month || '—'),
            String('₹ ' + paidAmount.toLocaleString()),
            String(f.paid_date || '—'),
          ]
        }),
        theme: 'grid',
        headStyles: {
          fillColor: navy,
          textColor: [255, 255, 255],
          fontSize: 7.5,
          fontStyle: 'bold',
          halign: 'center',
          cellPadding: 3,
        },
        bodyStyles: { fontSize: 7.5, cellPadding: 3, textColor: [30, 41, 59] },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        columnStyles: {
          0: { halign: 'center', cellWidth: 8 },
          3: { halign: 'right', textColor: green },
          4: { halign: 'center', cellWidth: 28 },
        },
        margin: { left: 14, right: 14 },
      })
      y = doc.lastAutoTable.finalY + 6
    } else {
      doc.setTextColor(...gray)
      doc.setFontSize(8).setFont('helvetica', 'italic')
      doc.text('No payment history available.', 14, y + 5)
      y += 12
    }

    // ── Summary Row ────────────────────────────────────────────
    autoTable(doc, {
      startY: y,
      head: [],
      body: [
        ['Total Fee', `₹ ${(totalFee || 0).toLocaleString()}`,
         'Total Paid', `₹ ${(totalPaid || 0).toLocaleString()}`,
         'Balance', `₹ ${(balance || 0).toLocaleString()}`]
      ],
      theme: 'plain',
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: gray, cellWidth: 22 },
        1: { fontStyle: 'bold', textColor: blue, cellWidth: 28 },
        2: { fontStyle: 'bold', textColor: gray, cellWidth: 22 },
        3: { fontStyle: 'bold', textColor: green, cellWidth: 28 },
        4: { fontStyle: 'bold', textColor: gray, cellWidth: 20 },
        5: { fontStyle: 'bold', textColor: balance === 0 ? green : red, cellWidth: 28 },
      },
      margin: { left: 14, right: 14 },
    })

    y = doc.lastAutoTable.finalY + 10

    // ── Divider + Footer ───────────────────────────────────────
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.3)
    doc.line(14, y, pageW - 14, y)
    y += 8

    doc.setTextColor(...gray)
    doc.setFontSize(7).setFont('helvetica', 'normal')
    doc.text('Authorized Signature', 14, y)
    doc.setDrawColor(203, 213, 225)
    doc.setLineWidth(0.5)
    doc.line(14, y + 10, 70, y + 10)

    doc.setTextColor(148, 163, 184)
    doc.setFontSize(6.5)
    doc.text('This is a computer generated receipt and does not require a physical signature.', pageW - 14, y, { align: 'right' })
    doc.text(`${receiptNumber} · ${currentDate}`, pageW - 14, y + 6, { align: 'right' })

    doc.save(`Fee_Receipt_${studentDetails?.student_name || 'Student'}_${receiptNumber}.pdf`)
  }

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`<!DOCTYPE html><html>
      <head>
        <title>Fee Receipt – ${receiptNumber}</title>
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body { font-family: 'Courier New', Courier, monospace; background:#fff; color:#0f172a; font-size:11px; padding:20px; max-width:520px; margin:0 auto; }
          .receipt-paper { border:1px solid #cbd5e1; border-radius:4px; overflow:hidden; }
          @media print { body { padding:0; } .no-print { display:none!important; } }
        </style>
      </head>
      <body>
        <div class="receipt-paper">${receiptRef.current.outerHTML}</div>
        <script>window.onload=()=>{setTimeout(()=>{window.print();window.onafterprint=()=>window.close();},500)}<\/script>
      </body></html>`)
    printWindow.document.close()
  }

  const StatusIcon = status.icon

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-3 py-6 flex flex-col items-center justify-start">

        {/* Action bar */}
        <div className="no-print w-full max-w-[440px] flex items-center justify-between mb-3 px-3 py-2 bg-white/8 backdrop-blur-md rounded-xl border border-white/10">
          <span className="text-[11px] font-semibold text-white/50 tracking-widest uppercase">Fee Receipt</span>
          <div className="flex items-center gap-1.5">
            <button onClick={handleDownloadPDF}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[11px] font-semibold tracking-wide transition-colors">
              <Download className="w-3 h-3" /> PDF
            </button>
            <button onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-[11px] font-semibold transition-colors">
              <Printer className="w-3 h-3" /> Print
            </button>
            <button onClick={onClose}
              className="w-7 h-7 flex items-center justify-center bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Receipt Paper ── */}
        <div ref={receiptRef}
          className="w-full max-w-[440px] bg-white shadow-2xl"
          style={{ fontFamily: "'Courier New', Courier, monospace", border: '1px solid #cbd5e1' }}>

          {/* Top perforation strip */}
          <div style={{ height: 8, background: 'repeating-linear-gradient(90deg,#0f172a 0,#0f172a 8px,transparent 8px,transparent 16px)', opacity: 0.06 }} />

          {/* Header */}
          <div style={{ background: '#0f172a', padding: '14px 18px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <div>
                <div style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                  {studentDetails?.school_name || 'School Name'}
                </div>
                <div style={{ color: '#64748b', fontSize: 9, marginTop: 2, fontFamily: 'sans-serif' }}>
                  {studentDetails?.school_place || studentDetails?.school_address || ''}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ color: '#475569', fontSize: 8, letterSpacing: 1 }}>RECEIPT NO.</div>
                <div style={{ color: '#94a3b8', fontSize: 9, fontWeight: 700, marginTop: 1 }}>{receiptNumber}</div>
                <div style={{ color: '#475569', fontSize: 8, marginTop: 1 }}>{currentDate}</div>
              </div>
            </div>

            {/* Status + Title row */}
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: status.color, flexShrink: 0 }} />
                <span style={{ color: status.color, fontSize: 8, fontWeight: 700, letterSpacing: 1.5, fontFamily: 'sans-serif' }}>{status.text}</span>
              </div>
              <span style={{ color: '#334155', fontSize: 8, letterSpacing: 2, fontFamily: 'sans-serif', fontWeight: 600 }}>OFFICIAL FEE RECEIPT</span>
            </div>
          </div>

          {/* Dashed separator */}
          <div style={{ borderBottom: '1.5px dashed #e2e8f0', margin: '0' }} />

          {/* Student details */}
          <div style={{ padding: '10px 18px 8px' }}>
            <div style={{ color: '#94a3b8', fontSize: 8, letterSpacing: 1.5, fontWeight: 700, marginBottom: 7, fontFamily: 'sans-serif' }}>STUDENT DETAILS</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
              <tbody>
                {[
                  ['Name',          studentDetails?.student_name || studentDetails?.name],
                  ['Reg. No.',      studentDetails?.reg_number || studentDetails?.reg_no],
                  ['Class',         studentDetails?.class || studentDetails?.std],
                  ['Place',         studentDetails?.place],
                  ['Academic Year', selectedYearName],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ color: '#64748b', paddingBottom: 3, width: '38%', fontSize: 9, fontFamily: 'sans-serif', verticalAlign: 'top' }}>{label}</td>
                    <td style={{ color: '#94a3b8', width: 6, paddingBottom: 3 }}>:</td>
                    <td style={{ color: '#0f172a', fontWeight: 700, paddingBottom: 3, fontSize: 10, fontFamily: 'sans-serif' }}>{value || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dashed separator */}
          <div style={{ borderBottom: '1.5px dashed #e2e8f0' }} />

          {/* Payment History */}
          <div style={{ padding: '10px 18px 8px' }}>
            <div style={{ color: '#94a3b8', fontSize: 8, letterSpacing: 1.5, fontWeight: 700, marginBottom: 7, fontFamily: 'sans-serif' }}>PAYMENT HISTORY</div>

            {feeHistory.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 9 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ textAlign: 'left', padding: '4px 4px', color: '#64748b', fontWeight: 600, fontSize: 8, fontFamily: 'sans-serif', borderBottom: '1px solid #e2e8f0' }}>#</th>
                    <th style={{ textAlign: 'left', padding: '4px 4px', color: '#64748b', fontWeight: 600, fontSize: 8, fontFamily: 'sans-serif', borderBottom: '1px solid #e2e8f0' }}>Receiver</th>
                    <th style={{ textAlign: 'left', padding: '4px 4px', color: '#64748b', fontWeight: 600, fontSize: 8, fontFamily: 'sans-serif', borderBottom: '1px solid #e2e8f0' }}>Month</th>
                    <th style={{ textAlign: 'right', padding: '4px 4px', color: '#64748b', fontWeight: 600, fontSize: 8, fontFamily: 'sans-serif', borderBottom: '1px solid #e2e8f0' }}>Paid Amount</th>
                    <th style={{ textAlign: 'center', padding: '4px 4px', color: '#64748b', fontWeight: 600, fontSize: 8, fontFamily: 'sans-serif', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {feeHistory.map((f, i) => {
                    const paidAmount = f.amount || 0
                    return (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <td style={{ padding: '3.5px 4px', color: '#94a3b8', fontSize: 9 }}>{i + 1}</td>
                        <td style={{ padding: '3.5px 4px', color: '#0f172a', fontSize: 9, fontFamily: 'sans-serif' }}>{f.receiver || '—'}</td>
                        <td style={{ padding: '3.5px 4px', color: '#0f172a', fontSize: 9, fontFamily: 'sans-serif' }}>{f.month || '—'}</td>
                        <td style={{ padding: '3.5px 4px', textAlign: 'right', color: '#059669', fontFamily: 'sans-serif', fontSize: 9 }}>₹{paidAmount.toLocaleString()}</td>
                        <td style={{ padding: '3.5px 4px', textAlign: 'center', color: '#64748b', fontFamily: 'sans-serif', fontSize: 8 }}>{f.paid_date || '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <p style={{ color: '#94a3b8', fontSize: 9, fontStyle: 'italic', fontFamily: 'sans-serif' }}>No payment history available.</p>
            )}
          </div>

          {/* Dashed separator */}
          <div style={{ borderBottom: '1.5px dashed #e2e8f0' }} />

          {/* Summary totals */}
          <div style={{ padding: '8px 18px', background: '#f8fafc' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ fontFamily: 'sans-serif', fontSize: 9, color: '#64748b', padding: '2.5px 0', width: '34%' }}>Total Fee</td>
                  <td style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, color: '#1e40af', textAlign: 'right', padding: '2.5px 0' }}>₹ {(totalFee || 0).toLocaleString()}</td>
                </tr>
                <tr>
                  <td style={{ fontFamily: 'sans-serif', fontSize: 9, color: '#64748b', padding: '2.5px 0' }}>Total Paid</td>
                  <td style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, color: '#059669', textAlign: 'right', padding: '2.5px 0' }}>₹ {(totalPaid || 0).toLocaleString()}</td>
                </tr>
                <tr>
                  <td colSpan={2}><div style={{ height: 1, background: '#e2e8f0', margin: '4px 0' }} /></td>
                </tr>
                <tr>
                  <td style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, color: '#0f172a', padding: '2px 0' }}>Balance Due</td>
                  <td style={{ fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, color: balance === 0 ? '#059669' : '#dc2626', textAlign: 'right', padding: '2px 0' }}>₹ {(balance || 0).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            {/* Progress bar */}
            <div style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 8, color: '#94a3b8', fontFamily: 'sans-serif' }}>Payment progress</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: '#475569', fontFamily: 'sans-serif' }}>{pct}%</span>
              </div>
              <div style={{ height: 4, background: '#e2e8f0', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 99,
                  width: `${pct}%`,
                  background: balance === 0 ? '#059669' : totalPaid > 0 ? '#d97706' : '#dc2626',
                  transition: 'width 0.7s ease'
                }} />
              </div>
            </div>
          </div>

          {/* Dashed separator */}
          <div style={{ borderBottom: '1.5px dashed #e2e8f0' }} />

          {/* Footer */}
          <div style={{ padding: '10px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ color: '#94a3b8', fontSize: 8, fontFamily: 'sans-serif', marginBottom: 12 }}>Authorized Signature</div>
              <div style={{ width: 100, borderBottom: '1.5px dashed #94a3b8' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 8, color: '#94a3b8', fontFamily: 'sans-serif', lineHeight: 1.6 }}>
                Computer Generated Receipt<br />
                <span style={{ color: '#cbd5e1' }}>{receiptNumber}</span>
              </div>
            </div>
          </div>

          {/* Bottom perforation strip */}
          <div style={{ height: 8, background: 'repeating-linear-gradient(90deg,#0f172a 0,#0f172a 8px,transparent 8px,transparent 16px)', opacity: 0.06 }} />
        </div>

      </div>
    </div>
  )
}

export default FeeReceipt