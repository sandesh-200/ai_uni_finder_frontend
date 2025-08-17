const Button = ({ children, onClick, variant = "primary", className = "", disabled = false }) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 active:scale-95"

  const variants = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 shadow-md hover:shadow-lg",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-gray-200",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500",
  }

  const disabledClasses = "opacity-50 cursor-not-allowed"

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? disabledClasses : ""} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
