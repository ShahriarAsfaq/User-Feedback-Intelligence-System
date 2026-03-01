interface Props {
  onSearch: (filters: any) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">

      <input
        name="name"
        placeholder="Search by name"
        className="border rounded-lg p-2"
        onChange={(e) => onSearch({ name: e.target.value })}
      />

      <select
        className="border rounded-lg p-2"
        onChange={(e) => onSearch({ category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="Bug">Bug</option>
        <option value="Feature Request">Feature Request</option>
        <option value="Complaint">Complaint</option>
      </select>

      <select
        className="border rounded-lg p-2"
        onChange={(e) => onSearch({ priority: e.target.value })}
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

    </div>
  );
};

export default SearchBar;