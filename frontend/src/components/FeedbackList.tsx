import { deleteFeedback } from "../api/feedback.api";
import type { Feedback } from "../types/feedback";

interface Props {
  feedbacks: Feedback[];
  onDelete?: (id: string) => void;
}

const FeedbackList = ({ feedbacks, onDelete }: Props) => {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await deleteFeedback(id);
      console.log("Feedback deleted:", id);
      onDelete?.(id);
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };
  return (
    <div className="space-y-4">
      {feedbacks.map((fb) => (
        <div
          key={fb._id}
          className="border rounded-xl p-4 hover:shadow-md transition"
        >
          <div className="flex justify-between">
            <h3 className="font-semibold">{fb.name}</h3>
            <span className="text-sm text-gray-500">{fb.priority}</span>
          </div>

          <p className="text-gray-600 mt-2">{fb.message}</p>

          <div className="flex gap-4 mt-3 text-sm">
            <span className="bg-gray-200 px-2 py-1 rounded">
              {fb.category}
            </span>
            <span className="bg-gray-200 px-2 py-1 rounded">
              {fb.sentiment}
            </span>
            <span className="bg-gray-200 px-2 py-1 rounded">
              {fb.team}
            </span>
            <button
              onClick={() => handleDelete(fb._id)}
              className="ml-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;