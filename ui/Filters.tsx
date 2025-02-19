import { Search } from "lucide-react";

interface FiltersProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }
  
  const Filters: React.FC<FiltersProps> = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, setCurrentPage }) => (
    <div className="flex items-center space-x-4 text-xs">
      {/* Search Bar */}
      <div className="relative flex items-center">
        <Search size={15} className="absolute left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-1 input input-bordered border-2 border-gray-300 rounded-md input-sm focus:ring-2 focus:ring-blue-500"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            setCurrentPage(0);
          }}
        />
      </div>
      {/* Filter by Status */}
      <select
        className="px-4 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={statusFilter}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setStatusFilter(e.target.value);
          setCurrentPage(0);
        }}
      >
        <option value="">All Statuses</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
  