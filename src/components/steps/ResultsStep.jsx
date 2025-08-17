import { useState, useEffect } from "react"
import StepContainer from "../StepContainer"
import Button from "../Button"
import { courseRecommendationAPI } from "../../services/api"

const ResultsStep = ({ formData, prevStep }) => {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await courseRecommendationAPI.getRecommendations(formData)
      setRecommendations(data.recommendations || [])
    } catch (err) {
      setError(err.message || 'Failed to fetch recommendations')
    } finally {
      setLoading(false)
    }
  }

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

  const getTestScores = () => {
    const testNames = {
      ielts_score: "IELTS",
      pte_score: "PTE Academic",
      toefl_score: "TOEFL iBT",
      duolingo_score: "Duolingo English Test",
    }

    const scores = []
    Object.entries(testNames).forEach(([key, name]) => {
      if (formData[key]) {
        scores.push(`${name}: ${formData[key]}`)
      }
    })
    
    return scores.length > 0 ? scores.join(", ") : "Not specified"
  }

  // Function to display user-friendly qualification names
  const getQualificationDisplayName = (value) => {
    const displayNames = {
      "grade_12th": "Grade 12th (High School)",
      "3_year_bachelor_degree": "3 Year Bachelor's Degree",
      "4_year_bachelor_degree": "4 Year Bachelor's Degree",
      "grade_10th": "Grade 10th",
      "grade_11th": "Grade 11th",
      "master_degree": "Master's Degree",
      "2_year_post_secondary_diploma": "2 Year Post-Secondary Diploma",
      "1_year_post_secondary_certificate": "1 Year Post-Secondary Certificate"
    }
    return displayNames[value] || value
  }

  const summaryItems = [
    { label: "Course", value: formData.course_name, icon: "📚" },
    { label: "Level", value: formData.level_group, icon: "🎯" },
    { label: "Country", value: formData.institution_country, icon: "🌍" },
    { label: "Budget", value: formatAmount(formData.cost_amount, formData.course_cost_currency), icon: "💰" },
    { label: "Qualification", value: getQualificationDisplayName(formData.minimum_qualification), icon: "🎓" },
    { label: "English Tests", value: getTestScores(), icon: "📝" },
  ]

  const handleStartOver = () => {
    window.location.reload()
  }

  const handleRetry = () => {
    fetchRecommendations()
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

  const getRelevanceColor = (relevance) => {
    const relevanceNum = parseFloat(relevance.replace('%', ''))
    if (relevanceNum > -5000) return 'bg-green-100 text-green-800'
    if (relevanceNum > -8000) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  if (loading) {
    return (
      <StepContainer
        title="Getting Your Recommendations"
        subtitle="Please wait while we analyze your preferences and find the best matches"
        icon="⏳"
      >
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your preferences...</p>
        </div>
      </StepContainer>
    )
  }

  if (error) {
    return (
      <StepContainer
        title="Oops! Something went wrong"
        subtitle="We couldn't fetch your recommendations at the moment"
        icon="❌"
      >
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRetry} variant="primary">
              Try Again
            </Button>
            <Button onClick={prevStep} variant="secondary">
              Go Back
            </Button>
          </div>
        </div>
      </StepContainer>
    )
  }

  return (
    <StepContainer
      title="Your Course Recommendations"
      subtitle={`Found ${recommendations.length} courses that match your preferences`}
      icon="✨"
    >
      <div className="space-y-8">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 opacity-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Preferences Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summaryItems.map((item, index) => (
              <div
                key={item.label}
                className="flex items-center space-x-3 opacity-100"
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <span className="text-sm text-gray-600">{item.label}:</span>
                  <span className="ml-2 font-medium text-gray-800">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="opacity-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Courses</h3>
          {recommendations.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No courses found matching your criteria. Try adjusting your preferences.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={rec.course._id}
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 opacity-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{rec.course.course_name}</h4>
                      <p className="text-gray-600 mb-2 font-medium">{rec.course.institution_name}</p>
                      <p className="text-gray-500 mb-3">{rec.course.institution_city}, {rec.course.institution_country}</p>
                      
                      {rec.course.course_summary && (
                        <p className="text-gray-600 mb-3 text-sm line-clamp-3">
                          {rec.course.course_summary}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRelevanceColor(rec.relevance)}`}>
                          {rec.relevance}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {rec.course.level_group}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {formatDuration(rec.course.course_duration, rec.course.course_duration_unit)}
                        </span>
                        {rec.course.rank && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                            Rank: {rec.course.rank}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Cost:</span>
                          <p className="font-medium">{formatAmount(rec.course.cost_amount, rec.course.course_cost_currency)}/{rec.course.course_cost_unit}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">IELTS:</span>
                          <p className="font-medium">{rec.course.ielts_score || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">TOEFL:</span>
                          <p className="font-medium">{rec.course.toefl_score || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">PTE:</span>
                          <p className="font-medium">{rec.course.pte_score || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 opacity-100">
          <Button onClick={prevStep} variant="secondary" className="flex-1">
            ← Edit Preferences
          </Button>
          <Button onClick={handleStartOver} variant="primary" className="flex-1">
            Start New Search
          </Button>
        </div>
      </div>
    </StepContainer>
  )
}

export default ResultsStep
