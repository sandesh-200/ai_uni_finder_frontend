import { useState } from "react"
import StepContainer from "../StepContainer"
import Button from "../Button"

const InstitutionStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({})

  const countries = [
    { display: "United States", value: "United States of America", currency: "USD" },
    { display: "United Kingdom", value: "United Kingdom (Inc Channel Islands and Isle of Man)", currency: "GBP" },
    { display: "Canada", value: "Canada", currency: "CAD" },
    { display: "Australia", value: "Australia", currency: "AUD" },
    { display: "New Zealand", value: "New Zealand", currency: "NZD" },
    { display: "Germany", value: "Germany", currency: "EUR" },
    { display: "Ireland", value: "Ireland", currency: "EUR" },
    { display: "UAE", value: "United Arab Emirates", currency: "AED" },
    { display: "Singapore", value: "Singapore", currency: "SGD" },
    { display: "Spain", value: "Spain", currency: "EUR" },
    { display: "France", value: "France", currency: "EUR" },
    { display: "Hungary", value: "Hungary", currency: "HUF" },
    { display: "Poland", value: "Poland", currency: "PLN" },
    { display: "Cyprus", value: "Cyprus", currency: "EUR" },
    { display: "Netherlands", value: "Netherlands", currency: "EUR" },
    { display: "Malta", value: "Malta", currency: "EUR" },
    { display: "Malaysia", value: "Malaysia", currency: "MYR" },
    { display: "South Korea", value: "Korea (Republic of (South))", currency: "KRW" },
    { display: "Vietnam", value: "Vietnam", currency: "VND" },
    { display: "Italy", value: "Italy", currency: "EUR" },
    { display: "Switzerland", value: "Switzerland", currency: "CHF" },
    { display: "Grenada", value: "Grenada", currency: "XCD" },
    { display: "Monaco", value: "Monaco", currency: "EUR" },
    { display: "Colombia", value: "Colombia", currency: "COP" },
    { display: "Indonesia", value: "Indonesia", currency: "IDR" },
    { display: "Finland", value: "Finland", currency: "EUR" }
  ]

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value })
    
    // If country is selected, automatically set the currency
    if (field === "institution_country") {
      const selectedCountry = countries.find(country => country.value === value)
      if (selectedCountry) {
        updateFormData({ 
          institution_country: value,
          course_cost_currency: selectedCountry.currency 
        })
      }
    }
    
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!formData.institution_country) {
      newErrors.institution_country = "Country is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  // Get the selected country's currency for display
  const getSelectedCountryCurrency = () => {
    const selectedCountry = countries.find(country => country.value === formData.institution_country)
    return selectedCountry ? selectedCountry.currency : null
  }

  return (
    <StepContainer title="Preferred Country" subtitle="Where would you like to study?" icon="🏛️">
      <div className="space-y-6">

        <div className="opacity-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
          <select
            value={formData.institution_country}
            onChange={(e) => handleInputChange("institution_country", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.institution_country ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.display}
              </option>
            ))}
          </select>
          {errors.institution_country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.institution_country}
            </p>
          )}
        </div>

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

export default InstitutionStep
