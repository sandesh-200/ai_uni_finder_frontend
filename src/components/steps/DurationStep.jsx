import { useState } from "react"
import StepContainer from "../StepContainer"
import Button from "../Button"

const DurationStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({})

  const durationUnits = ["Months", "Years", "Semesters", "Quarters"]

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = "Duration must be a positive number"
    }

    if (!formData.dur_unit) {
      newErrors.dur_unit = "Duration unit is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  return (
    <StepContainer title="Course Duration" subtitle="How long is your preferred course duration?" icon="⏱️">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="opacity-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
            <input
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              placeholder="e.g., 2, 4, 6"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.duration ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.duration}
              </p>
            )}
          </div>

          <div className="opacity-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
            <select
              value={formData.dur_unit}
              onChange={(e) => handleInputChange("dur_unit", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.dur_unit ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select unit</option>
              {durationUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            {errors.dur_unit && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dur_unit}
              </p>
            )}
          </div>
        </div>

        {formData.duration && formData.dur_unit && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 opacity-100">
            <p className="text-blue-700 font-medium">
              Course Duration: {formData.duration} {formData.dur_unit}
            </p>
          </div>
        )}

        <div className="flex justify-between pt-6 opacity-100">
          <Button onClick={prevStep} variant="secondary">
            ← Previous
          </Button>
          <Button onClick={validateAndNext} variant="primary">
            Next Step →
          </Button>
        </div>
      </div>
    </StepContainer>
  )
}

export default DurationStep
