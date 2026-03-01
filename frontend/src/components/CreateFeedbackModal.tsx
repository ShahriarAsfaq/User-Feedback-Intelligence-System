import { useState } from "react";
import { createFeedback } from "../api/feedback.api";

interface Props {
  onCreated: () => void;
}

const CreateFeedbackModal = ({ onCreated }: Props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async () => {
    await createFeedback(form);
    setForm({ name: "", email: "", message: "" });
    onCreated();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create Feedback</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-3"
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
      >
        Submit
      </button>
    </div>
  );
};

export default CreateFeedbackModal;