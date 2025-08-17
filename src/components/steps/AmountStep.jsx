import { useState } from "react"
import StepContainer from "../StepContainer"
import Button from "../Button"

const AmountStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({})

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
    { code: "PLN", name: "Polish Złoty", symbol: "zł" },
    { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
    { code: "KRW", name: "South Korean Won", symbol: "₩" },
    { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { code: "XCD", name: "East Caribbean Dollar", symbol: "EC$" },
    { code: "COP", name: "Colombian Peso", symbol: "COP$" },
    { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  ]

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!formData.cost_amount || formData.cost_amount <= 0) {
      newErrors.cost_amount = "Amount must be a positive number"
    }

    if (!formData.course_cost_currency) {
      newErrors.course_cost_currency = "Currency is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  const formatAmount = (amount, currency) => {
    const currencyObj = currencies.find((c) => c.code === currency)
    if (!currencyObj || !amount) return ""

    return `${currencyObj.symbol}${Number.parseFloat(amount).toLocaleString()}`
  }

  // Get currency display name
  const getCurrencyDisplayName = (currencyCode) => {
    const currency = currencies.find(c => c.code === currencyCode)
    return currency ? `${currency.code} - ${currency.name} (${currency.symbol})` : currencyCode
  }

  return (
    <StepContainer title="Budget Information" subtitle="What's your budget for the course?" icon="💰">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="opacity-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.cost_amount}
              onChange={(e) => handleInputChange("cost_amount", e.target.value)}
              placeholder="e.g., 50000"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.cost_amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cost_amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cost_amount}
              </p>
            )}
          </div>

          <div className="opacity-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency *</label>
            <select
              value={formData.course_cost_currency}
              onChange={(e) => handleInputChange("course_cost_currency", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.course_cost_currency ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select currency</option>
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
            {errors.course_cost_currency && (
              <p className="text-red-500 text-sm mt-1">
                {errors.course_cost_currency}
              </p>
            )}
          </div>
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

export default AmountStep
