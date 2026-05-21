import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const COLORS = [

  '#111827',
  '#2563EB',
  '#059669',
  '#DC2626',
  '#D97706',
  '#7C3AED',

]

const CategoryChart = ({ books }) => {

  // COUNT CATEGORIES
  const categoryCount = {}

  books.forEach((book) => {

    const category = book.category || 'Other'

    categoryCount[category] =

      (categoryCount[category] || 0) + 1

  })

  // FORMAT DATA
  const data = Object.keys(categoryCount).map(
    (category) => ({

      name: category,

      value: categoryCount[category],

    })
  )

  return (

    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">

      <h2 className="text-2xl font-bold mb-6">
        Books By Category
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default CategoryChart