import { Search } from 'lucide-react'

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 px-5 py-4 rounded-2xl">

      <Search size={20} className="text-gray-500" />

      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="outline-none w-full bg-transparent"
      />

    </div>
  )
}

export default SearchBar