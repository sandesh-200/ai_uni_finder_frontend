import { useState, useEffect } from "react"
import StepContainer from "../StepContainer"
import Button from "../Button"

const QualificationsStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({})
  const [selectedTests, setSelectedTests] = useState(new Set())

  const qualificationLevels = [
    { display: "Grade 12th (High School)", value: "grade_12th" },
    { display: "3 Year Bachelor's Degree", value: "3_year_bachelor_degree" },
    { display: "4 Year Bachelor's Degree", value: "4_year_bachelor_degree" },
    { display: "Grade 10th", value: "grade_10th" },
    { display: "Grade 11th", value: "grade_11th" },
    { display: "Master's Degree", value: "master_degree" },
    { display: "2 Year Post-Secondary Diploma", value: "2_year_post_secondary_diploma" },
    { display: "1 Year Post-Secondary Certificate", value: "1_year_post_secondary_certificate" }
  ]

  const englishTests = [
    { key: "ielts_score", name: "IELTS", maxScore: 9, step: 0.5 },
    { key: "pte_score", name: "PTE Academic", maxScore: 90, step: 1 },
    { key: "toefl_score", name: "TOEFL iBT", maxScore: 120, step: 1 },
    { key: "duolingo_score", name: "Duolingo English Test", maxScore: 160, step: 5 },
  ]

  // Synchronize selectedTests with existing formData when component mounts or formData changes
  useEffect(() => {
    const existingTests = new Set()
    englishTests.forEach(test => {
      if (formData[test.key] && formData[test.key] !== "") {
        existingTests.add(test.key)
      }
    })
    setSelectedTests(existingTests)
  }, [formData])

  const handleInputChange = (field, value) => {
    // Validate test scores
    if (field.includes('_score')) {
      const test = englishTests.find(t => t.key === field)
      if (test) {
        const numValue = parseFloat(value)
        
        // Check for negative values
        if (numValue < 0) {
          setErrors(prev => ({ ...prev, [field]: `${test.name} score cannot be negative` }))
          return
        }
        
        // Check for values above maximum
        if (numValue > test.maxScore) {
          setErrors(prev => ({ ...prev, [field]: `${test.name} score cannot exceed ${test.maxScore}` }))
          return
        }
      }
    }

    updateFormData({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleTestTypeChange = (testType) => {
    const newSelectedTests = new Set(selectedTests)
    if (newSelectedTests.has(testType)) {
      // Remove test from selection
      newSelectedTests.delete(testType)
      // Clear the score
      updateFormData({ [testType]: "" })
    } else {
      // Add test to selection
      newSelectedTests.add(testType)
    }
    setSelectedTests(newSelectedTests)
    setErrors({})
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!formData.minimum_qualification) {
      newErrors.minimum_qualification = "Minimum qualification level is required"
    }

    // Check if at least one English test has a score
    const hasTestScore = Array.from(selectedTests).some(testKey => formData[testKey] && formData[testKey] !== "")
    if (!hasTestScore) {
      newErrors.english_tests = "At least one English test score is required"
    }

    // Validate all selected test scores
    Array.from(selectedTests).forEach(testKey => {
      if (formData[testKey] && formData[testKey] !== "") {
        const test = englishTests.find(t => t.key === testKey)
        if (test) {
          const numValue = parseFloat(formData[testKey])
          
          if (numValue < 0) {
            newErrors[testKey] = `${test.name} score cannot be negative`
          } else if (numValue > test.maxScore) {
            newErrors[testKey] = `${test.name} score cannot exceed ${test.maxScore}`
          }
        }
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  return (
    <StepContainer
      title="Qualifications"
      subtitle="Tell us about your educational background and English proficiency"
      icon="🎓"
    >
      <div className="space-y-6">
        <div className="opacity-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Qualification Level *</label>
          <select
            value={formData.minimum_qualification}
            onChange={(e) => handleInputChange("minimum_qualification", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.minimum_qualification ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select qualification level</option>
            {qualificationLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.display}
              </option>
            ))}
          </select>
          {errors.minimum_qualification && (
            <p className="text-red-500 text-sm mt-1">
              {errors.minimum_qualification}
            </p>
          )}
        </div>

        <div className="opacity-100">
          <label className="block text-sm font-medium text-gray-700 mb-3">English Test Types *</label>
          <p className="text-sm text-gray-500 mb-3">Select one or more English tests you have taken</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {englishTests.map((test) => (
              <button
                key={test.key}
                type="button"
                onClick={() => handleTestTypeChange(test.key)}
                className={`w-full p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedTests.has(test.key)
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="text-sm font-medium">{test.name}</div>
                <div className="text-xs text-gray-500">Max: {test.maxScore}</div>
                {formData[test.key] && formData[test.key] !== "" && (
                  <div className="text-xs text-blue-600 mt-1 font-medium">
                    Score: {formData[test.key]}
                  </div>
                )}
              </button>
            ))}
          </div>
          {errors.english_tests && (
            <p className="text-red-500 text-sm mt-1">
              {errors.english_tests}
            </p>
          )}
        </div>

        {/* Show input fields for selected tests */}
        {Array.from(selectedTests).map((testKey) => {
          const test = englishTests.find(t => t.key === testKey)
          return (
            <div key={testKey} className="opacity-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">{test.name} Score *</label>
              <input
                type="number"
                min="0"
                max={test.maxScore}
                step={test.step}
                value={formData[testKey] || ""}
                onChange={(e) => handleInputChange(testKey, e.target.value)}
                placeholder={`Enter your ${test.name} score (Max: ${test.maxScore})`}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors[testKey] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[testKey] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[testKey]}
                </p>
              )}
            </div>
          )
        })}

        <div className="flex justify-between pt-6 opacity-100">
          <Button onClick={prevStep} variant="secondary">
            ← Previous
          </Button>
          <Button onClick={validateAndNext} variant="primary">
            Get Recommendations →
          </Button>
        </div>
      </div>
    </StepContainer>
  )
}

export default QualificationsStep
