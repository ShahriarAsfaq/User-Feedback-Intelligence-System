import { useEffect, useState } from "react";
import { getFeedbacks } from "../api/feedback.api";
import type { Feedback } from "../types/feedback";
import FeedbackList from "../components/FeedbackList";
import CreateFeedbackModal from "../components/CreateFeedbackModal";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filters, setFilters] = useState({});

  const fetchData = async (params = {}) => {
    const data = await getFeedbacks(params);
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Feedback Intelligence Dashboard
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <CreateFeedbackModal onCreated={() => fetchData(filters)} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <SearchBar
            onSearch={(newFilters) => {
              setFilters(newFilters);
              fetchData(newFilters);
            }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <FeedbackList feedbacks={feedbacks} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;