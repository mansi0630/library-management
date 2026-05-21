const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-md transition-all duration-300">

      <div className="h-12 w-12 rounded-2xl bg-gray-100 mb-6"></div>

      <h3 className="text-2xl font-semibold">
        {title}
      </h3>

      <p className="text-gray-600 mt-4 leading-relaxed">
        {description}
      </p>

    </div>
  )
}

export default FeatureCard