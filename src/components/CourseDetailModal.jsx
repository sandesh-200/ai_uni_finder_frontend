import { useState, useEffect } from "react"

const CourseDetailModal = ({ isOpen, onClose, courseData }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  const formatAmount = (amount, currency) => {
    const currencySymbols = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      CAD: "C$",
      AUD: "A$",
      CHF: "CHF",
      SGD: "S$",
      JPY: "¥",
      KRW: "₩",
      INR: "₹",
    }
    const symbol = currencySymbols[currency] || currency
    return `${symbol}${Number.parseFloat(amount).toLocaleString()}`
  }

  const formatDuration = (duration, unit) => {
    if (unit === 'months') {
      const years = Math.floor(duration / 12)
      const months = duration % 12
      if (years > 0 && months > 0) {
        return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`
      } else if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}`
      } else {
        return `${months} month${months > 1 ? 's' : ''}`
      }
    }
    return `${duration} ${unit}`
  }

  const getInstitutionLogo = (logoFilename) => {
    if (!logoFilename) return null
    return `https://app.adventus.io/publicimages/${logoFilename}`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Course Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {courseData && (
            <div className="space-y-6">
              {/* Institution Header */}
              <div className="flex items-start gap-6 pb-6 border-b border-gray-200">
                {courseData.institution_logo && (
                  <div className="flex-shrink-0">
                    <img
                      src={getInstitutionLogo(courseData.institution_logo)}
                      alt={`${courseData.institution_name} logo`}
                      className="w-32 h-32 object-contain rounded-lg border border-gray-200 bg-white"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{courseData.course_name}</h1>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">{courseData.institution_name}</h2>
                  <p className="text-lg text-gray-600 mb-3">{courseData.institution_city}, {courseData.institution_country}</p>
                  {courseData.rank && (
                    <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                      Rank: {courseData.rank}
                    </div>
                  )}
                </div>
              </div>

              {/* Course Summary */}
              {courseData.course_summary && (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Overview</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{courseData.course_summary}</p>
                </div>
              )}

              {/* Key Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Details */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Level</span>
                      <span className="text-gray-900">{courseData.level_group}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Duration</span>
                      <span className="text-gray-900">{formatDuration(courseData.course_duration, courseData.course_duration_unit)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Delivery</span>
                      <span className="text-gray-900 capitalize">{courseData.course_delivery}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 font-medium">Cost</span>
                      <span className="text-gray-900 font-semibold">
                        {formatAmount(courseData.cost_amount, courseData.course_cost_currency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Entry Requirements</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Qualification</span>
                      <span className="text-gray-900">{courseData.min_qualification}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">IELTS</span>
                      <span className="text-gray-900">{courseData.ielts_score || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">TOEFL</span>
                      <span className="text-gray-900">{courseData.toefl_score || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">PTE</span>
                      <span className="text-gray-900">{courseData.pte_score || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 font-medium">Duolingo</span>
                      <span className="text-gray-900">{courseData.duolingo_score || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intakes */}
              {courseData.intakes && courseData.intakes.length > 0 && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Intakes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseData.intakes.map((intake, index) => (
                      <div key={intake.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">{intake.name}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Application Opens</span>
                            <span className="text-gray-900">{formatDate(intake.application_open)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Application Closes</span>
                            <span className="text-gray-900">{formatDate(intake.application_close)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Term Starts</span>
                            <span className="text-gray-900">{formatDate(intake.term_start)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Work Permit */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Work & Career</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Work Permit</span>
                      <span className={`font-medium ${courseData.has_work_permit ? 'text-green-600' : 'text-red-600'}`}>
                        {courseData.has_work_permit ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    {courseData.careers_offered && courseData.careers_offered !== 'null' && (
                      <div className="pt-2">
                        <span className="text-gray-600 font-medium">Careers</span>
                        <p className="text-gray-900 mt-1">{courseData.careers_offered}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailModal 