
import Select from "react-select";

const AddNewSlot = () => {
  // Options for the React Select dropdowns
  const daysOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const classesOptions = [
    { value: "yoga", label: "Yoga" },
    { value: "cardio", label: "Cardio" },
    { value: "strength", label: "Strength Training" },
    { value: "dance", label: "Dance Fitness" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Slot</h1>
      <form className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        {/* Read-only fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trainer Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value="John Doe"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value="johndoe@example.com"
              readOnly
            />
          </div>
        </div>

        {/* Select days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Days
          </label>
          <Select options={daysOptions} isMulti placeholder="Select Days" />
        </div>

        {/* Slot name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slot Name
          </label>
          <input
            type="text"
            placeholder="e.g., Morning Slot"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Slot time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slot Time
          </label>
          <input
            type="text"
            placeholder="e.g., 1 hour"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Classes Include */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Classes Include
          </label>
          <Select options={classesOptions} placeholder="Select a class" />
        </div>

        {/* Additional Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Info (Optional)
          </label>
          <textarea
            rows="3"
            placeholder="Any additional details"
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Slot
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewSlot;
