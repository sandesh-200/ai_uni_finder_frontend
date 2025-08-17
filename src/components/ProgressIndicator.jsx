import { BookOpen, MapPin, DollarSign, GraduationCap, Sparkles } from "lucide-react"

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: "Course", icon: BookOpen },
    { number: 2, title: "Country", icon: MapPin },
    { number: 3, title: "Budget", icon: DollarSign },
    { number: 4, title: "Qualifications", icon: GraduationCap },
    { number: 5, title: "Results", icon: Sparkles },
  ]

  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => {
        const IconComponent = step.icon
        return (
          <div key={step.number} className="flex items-center">
            <div
              className={`relative flex items-center justify-center w-12 h-12 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                currentStep >= step.number ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-400 border border-gray-200"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              {currentStep >= step.number && (
                <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20" />
              )}
            </div>

            <div className="ml-3 hidden md:block">
              <p className={`text-sm font-medium ${currentStep >= step.number ? "text-gray-900" : "text-gray-500"}`}>
                {step.title}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-0.5 bg-gray-200 hidden md:block">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: currentStep > step.number ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ProgressIndicator
