import { useState } from "react"
import ProgressIndicator from "../components/ProgressIndicator"
import CourseStep from "../components/steps/CourseStep"
import InstitutionStep from "../components/steps/InstitutionStep"
import AmountStep from "../components/steps/AmountStep"
import QualificationStep from "../components/steps/QualificationStep"
import ResultsStep from "../components/steps/ResultsStep"

const CollegeRecommendationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [highestStepReached, setHighestStepReached] = useState(1)
  const [formData, setFormData] = useState({
    // Course fields
    course_name: "",
    level_group: "",

    // Institution fields
    institution_country: "",

    // Amount fields
    cost_amount: "",
    course_cost_currency: "",

    // Qualifications fields
    minimum_qualification: "",
    ielts_score: "",
    pte_score: "",
    toefl_score: "",
    duolingo_score: "",
  })

  const totalSteps = 5

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      // Update highest step reached
      if (newStep > highestStepReached) {
        setHighestStepReached(newStep)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const navigateToStep = (stepNumber) => {
    // Allow navigation to any step that has been reached
    if (stepNumber >= 1 && stepNumber <= totalSteps && stepNumber <= highestStepReached) {
      setCurrentStep(stepNumber)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CourseStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
      case 2:
        return (
          <InstitutionStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 3:
        return (
          <AmountStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
        )
      case 4:
        return (
          <QualificationStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )
      case 5:
        return <ResultsStep formData={formData} prevStep={prevStep} />
      default:
        return <CourseStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
          College Recommendations That Just Work
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover tailored college options with ease. Your future starts in just {totalSteps - 1} simple steps.
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          onStepClick={navigateToStep}
          highestStepReached={highestStepReached}
        />

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mt-8">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}

export default CollegeRecommendationForm
