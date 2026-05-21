const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>

    </div>
  )
}

export default StatsCard