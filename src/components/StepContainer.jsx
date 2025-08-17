import { BookOpen, Clock, DollarSign, GraduationCap, MapPin, Sparkles } from "lucide-react"

const StepContainer = ({ title, subtitle, icon, children }) => {
  const getIconComponent = (iconName) => {
    const iconMap = {
      "📚": BookOpen,
      "🏛️": MapPin,
      "⏱️": Clock,
      "💰": DollarSign,
      "🎓": GraduationCap,
      "✨": Sparkles,
    }
    return iconMap[iconName] || BookOpen
  }

  const IconComponent = getIconComponent(icon)

  return (
    <div className="w-full font-inter">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 flex justify-center">
          <IconComponent className="w-16 h-16 text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {title}
        </h2>
        <p className="text-gray-600 text-lg">
          {subtitle}
        </p>
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}

export default StepContainer
