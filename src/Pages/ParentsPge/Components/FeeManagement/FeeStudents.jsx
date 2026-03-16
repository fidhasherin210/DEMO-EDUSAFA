import React, { useState, useEffect } from 'react'
import {
  CalendarDays,
  CheckCircle,
  AlertCircle,
  Receipt,
  FileText,
  Clock,
  User,
  ChevronDown,
  Wallet,
  CreditCard,
} from 'lucide-react'
import FeeReceipt from './FeeReceipt'

function FeeStudents() {
  const { studentId } = { studentId: "STU001" } // Sample student ID

  // Sample Data
  const sampleAcademicYears = [
    { id: 1, year: "2024-2025", is_current: true },
    { id: 2, year: "2023-2024", is_current: false },
    { id: 3, year: "2022-2023", is_current: false },
  ]

  const sampleStudentDetails = {
    name: "John Doe",
    class: "10th Grade",
    section: "A",
    roll_number: "101",
    father_name: "Robert Doe",
    mother_name: "Sarah Doe",
    address: "123 Main Street, City",
    phone: "+91 9876543210"
  }

  const sampleFeeRecords = {
    "1": [ // For year 2024-2025
      {
        month: "January 2024",
        amount: 5000,
        receiver: "Admin Office",
        paid_date: "2024-01-15"
      },
      {
        month: "February 2024",
        amount: 5000,
        receiver: "Admin Office",
        paid_date: "2024-02-12"
      },
      {
        month: "March 2024",
        amount: 5000,
        receiver: "Admin Office",
        paid_date: "2024-03-10"
      },
      {
        month: "April 2024",
        amount: 5000,
        receiver: "Admin Office",
        paid_date: "2024-04-14"
      }
    ],
    "2": [ // For year 2023-2024
      {
        month: "June 2023",
        amount: 4500,
        receiver: "Admin Office",
        paid_date: "2023-06-10"
      },
      {
        month: "July 2023",
        amount: 4500,
        receiver: "Admin Office",
        paid_date: "2023-07-12"
      },
      {
        month: "August 2023",
        amount: 4500,
        receiver: "Admin Office",
        paid_date: "2023-08-15"
      }
    ],
    "3": [ // For year 2022-2023
      {
        month: "July 2022",
        amount: 4000,
        receiver: "Admin Office",
        paid_date: "2022-07-08"
      },
      {
        month: "August 2022",
        amount: 4000,
        receiver: "Admin Office",
        paid_date: "2022-08-10"
      }
    ]
  }

  const [academicYears, setAcademicYears] = useState([])
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedYearName, setSelectedYearName] = useState('')
  const [feeDetails, setFeeDetails] = useState([])
  const [totalFee, setTotalFee] = useState(null)
  const [totalPaid, setTotalPaid] = useState(null)
  const [balance, setBalance] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [yearLoading, setYearLoading] = useState(false)
  const [studentDetails, setStudentDetails] = useState(null)
  const [showReceipt, setShowReceipt] = useState(false)

  // Load academic years on component mount
  useEffect(() => {
    const loadAcademicYears = () => {
      setYearLoading(true)
      try {
        const years = sampleAcademicYears
        setAcademicYears(years)
        
        // Auto-select current year or first year
        const current = years.find(year => year.is_current) || years[0]
        if (current) {
          setSelectedYear(current.id.toString())
          setSelectedYearName(current.year)
        }
      } catch (error) {
        console.error("Error loading academic years:", error)
      } finally {
        setYearLoading(false)
      }
    }

    loadAcademicYears()
  }, [])

  // Load fee records when year changes
  useEffect(() => {
    if (!selectedYear) return

    const loadFeeRecords = () => {
      setLoading(true)
      try {
        // Simulate API call delay
        setTimeout(() => {
          const records = sampleFeeRecords[selectedYear] || []
          const total = records.reduce((sum, record) => sum + record.amount, 0)
          
          setStudentDetails(sampleStudentDetails)
          setFeeDetails(records)
          setTotalFee(total)
          setTotalPaid(total) // Assuming all fees are paid
          setBalance(0)
          
          const year = academicYears.find(y => y.id.toString() === selectedYear)
          setSelectedYearName(year ? year.year : '')
          setMessage('')
          setLoading(false)
        }, 500) // Simulate network delay
      } catch (error) {
        console.error('Error loading fee details:', error)
        setMessage('Failed to load fee details. Please try again.')
        setStudentDetails(null)
        setFeeDetails([])
        setTotalFee(null)
        setTotalPaid(null)
        setBalance(null)
        setLoading(false)
      }
    }

    loadFeeRecords()
  }, [selectedYear, academicYears])

  const paidAmountPercentage = totalFee > 0 ? Math.min(100, (totalPaid / totalFee) * 100) : 0

  const handleYearChange = (e) => {
    const yearId = e.target.value
    setSelectedYear(yearId)
    const selected = academicYears.find(y => y.id.toString() === yearId)
    setSelectedYearName(selected ? selected.year : '')
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0)
  }

  // Show receipt modal
  if (showReceipt && studentDetails) {
    return (
      <FeeReceipt
        studentDetails={studentDetails}
        feeDetails={feeDetails}
        totalFee={totalFee}
        totalPaid={totalPaid}
        balance={balance}
        selectedYearName={selectedYearName}
        onClose={() => setShowReceipt(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-1">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-2 px-4 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto max-w-8xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  Check Fee Details
                </h1>
                <p className="text-xs text-white/90">
                  Check and Download Fee Receipt
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Year Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4">
          <div className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg">
                  <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700">
                    Academic Year
                  </label>
                  <p className="text-xs text-gray-400 mt-0.5">Select year to view fee details</p>
                </div>
              </div>
              
              <YearSelector
                academicYears={academicYears}
                selectedYear={selectedYear}
                onChange={handleYearChange}
                disabled={yearLoading}
              />
            </div>

            {/* Progress Bar */}
            {selectedYearName && totalFee !== null && !loading && (
              <ProgressBar
                yearName={selectedYearName}
                paid={totalPaid}
                total={totalFee}
                percentage={paidAmountPercentage}
                formatCurrency={formatCurrency}
              />
            )}
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <AlertMessage message={message} />
        )}

        {/* Summary Cards */}
        {!loading && totalFee !== null && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            <SummaryCard
              title="Total"
              amount={totalFee}
              icon={<CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />}
              bgColor="bg-blue-50"
              textColor="text-blue-600"
              formatCurrency={formatCurrency}
            />
            <SummaryCard
              title="Paid"
              amount={totalPaid}
              icon={<CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />}
              bgColor="bg-green-50"
              textColor="text-green-600"
              formatCurrency={formatCurrency}
            />
            <SummaryCard
              title="Balance"
              amount={balance}
              icon={<Wallet className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${balance === 0 ? 'text-green-500' : 'text-red-500'}`} />}
              bgColor={balance === 0 ? 'bg-green-50' : 'bg-red-50'}
              textColor={balance === 0 ? 'text-green-600' : 'text-red-600'}
              formatCurrency={formatCurrency}
            />
          </div>
        )}

        {/* Fee Records Section */}
        {!loading && selectedYear && (
          <FeeRecordsTable
            feeDetails={feeDetails}
            studentDetails={studentDetails}
            onViewReceipt={() => setShowReceipt(true)}
            formatCurrency={formatCurrency}
          />
        )}

        {/* No Selection State */}
        {!selectedYear && !loading && (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

// Helper Components
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <div className="p-1.5 bg-gray-50 rounded-lg shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{value}</p>
    </div>
  </div>
)

const YearSelector = ({ academicYears, selectedYear, onChange, disabled }) => (
  <div className="relative w-full sm:w-64">
    <select
      className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-8"
      value={selectedYear}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">Select Year</option>
      {academicYears.map((year) => (
        <option key={year.id} value={year.id}>
          {year.year} {year.is_current ? '(Current)' : ''}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
  </div>
)

const ProgressBar = ({ yearName, paid, total, percentage, formatCurrency }) => (
  <div className="mt-4">
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-xs font-medium text-gray-600">
        {yearName} Progress
      </span>
      <span className="text-xs font-semibold text-blue-600">
        {formatCurrency(paid)} / {formatCurrency(total)}
      </span>
    </div>
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
    <div className="flex justify-between mt-1 text-[10px] sm:text-xs text-gray-400">
      <span>0%</span>
      <span>{Math.round(percentage)}% Paid</span>
      <span>100%</span>
    </div>
  </div>
)

const AlertMessage = ({ message }) => (
  <div className="mb-4 p-3 sm:p-4 bg-amber-50 border border-amber-100 rounded-xl">
    <div className="flex items-start gap-2">
      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs sm:text-sm font-medium text-amber-800">{message}</p>
        <p className="text-[10px] sm:text-xs text-amber-600 mt-1">
          Please contact the administration if you believe this is an error.
        </p>
      </div>
    </div>
  </div>
)

const FeeRecordsTable = ({ feeDetails, studentDetails, onViewReceipt, formatCurrency }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="px-4 sm:px-5 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800">
            Payment History
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
            {feeDetails.length} payment{feeDetails.length !== 1 ? 's' : ''} found
          </p>
        </div>
        {feeDetails.length > 0 && studentDetails && (
          <button
            onClick={onViewReceipt}
            className="inline-flex items-center px-2.5 sm:px-3 py-1.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-xs font-medium border border-blue-200 shadow-sm"
          >
            <Receipt className="w-3.5 h-3.5 mr-1.5" />
            Receipt
          </button>
        )}
      </div>
    </div>

    {feeDetails.length > 0 ? (
      <div className="space-y-2 p-4">
        {feeDetails.map((fee, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors">
            {/* Top row: Month and Amount */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                  {fee.month}
                </span>
              </div>
              <span className="text-sm font-bold text-green-600">{formatCurrency(fee.amount)}</span>
            </div>
            
            {/* Bottom row: Receiver and Date */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">To:</span>
                  <span className="font-medium text-gray-700">{fee.receiver}</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">On:</span>
                  <span className="text-gray-600">{fee.paid_date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8 sm:py-10">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-xl mb-3">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
        </div>
        <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1">No Records Found</h3>
        <p className="text-[10px] sm:text-xs text-gray-400">No fee payments recorded for this year</p>
      </div>
    )}
  </div>
)

const SummaryCard = ({ title, amount, icon, bgColor, textColor, formatCurrency }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
    <div className="flex items-center justify-between mb-1.5">
      <div className={`p-1.5 ${bgColor} rounded-lg`}>
        {icon}
      </div>
      <span className="text-[10px] sm:text-xs font-medium text-gray-400">{title}</span>
    </div>
    <p className={`text-xs sm:text-sm font-bold ${textColor} truncate`}>
      {formatCurrency(amount)}
    </p>
  </div>
)

const EmptyState = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-2xl mb-4">
      <CalendarDays className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
    </div>
    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
      Select Academic Year
    </h3>
    <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto">
      Choose an academic year to view fee payment details and history
    </p>
  </div>
)

export default FeeStudents