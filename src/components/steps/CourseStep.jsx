import { useState } from "react"
import StepContainer from "../StepContainer"
import Button from "../Button"

const CourseStep = ({ formData, updateFormData, nextStep }) => {
  const [errors, setErrors] = useState({})

  const levelOptions = [
    "Undergraduate",
    "Postgraduate (Taught)",
    "Other",
    "Vocational",
    "Doctorate (PhD)",
    "Postgraduate (Research)",
    "Language and English Pathways",
    "Primary and Secondary Education"
  ]

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!formData.course_name.trim()) {
      newErrors.course_name = "Course name is required"
    }

    if (!formData.level_group) {
      newErrors.level_group = "Level group is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  return (
    <StepContainer title="Course Information" subtitle="Tell us about the course you're interested in" icon="📚">
      <div className="space-y-6">
        <div className="opacity-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Course Name *</label>
          <input
            type="text"
            value={formData.course_name}
            onChange={(e) => handleInputChange("course_name", e.target.value)}
            placeholder="e.g., Computer Science, Business Administration"
            className={`w-full px-4 py-3 border rounded-lg  transition-all duration-200 ${
              errors.course_name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.course_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.course_name}
            </p>
          )}
        </div>

        <div className="opacity-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Level Group *</label>
          <select
            value={formData.level_group}
            onChange={(e) => handleInputChange("level_group", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.level_group ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select level group</option>
            {levelOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level_group && (
            <p className="text-red-500 text-sm mt-1">
              {errors.level_group}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-6 opacity-100">
          <Button onClick={validateAndNext} variant="primary">
            Next Step →
          </Button>
        </div>
      </div>
    </StepContainer>
  )
}

export default CourseStep
