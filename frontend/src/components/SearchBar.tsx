import { useEffect, useState } from "react";
import { getCategories } from "../api/feedback.api";

interface Props {
  onSearch: (filters: any) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        console.log("Fetched categories:", cats);
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch on mount
    fetchCategories();

    // Set interval to check for updates every 5 seconds
    const interval = setInterval(fetchCategories, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

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
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        className="border rounded-lg p-2"
        onChange={(e) => {
          const priority = e.target.value;
          console.log("Priority selected:", priority);
          onSearch({ priority });
        }}
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