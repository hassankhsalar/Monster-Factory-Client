import { FaTrashAlt } from "react-icons/fa";

const ManageSlots = () => {
  // Sample data for displaying slots
  const slots = [
    {
      _id: "1",
      time: "9:00 AM - 10:00 AM",
      booked: true,
      bookedBy: { name: "John Doe", email: "johndoe@example.com" },
    },
    {
      _id: "2",
      time: "10:00 AM - 11:00 AM",
      booked: false,
      bookedBy: null,
    },
    {
      _id: "3",
      time: "11:00 AM - 12:00 PM",
      booked: true,
      bookedBy: { name: "Jane Smith", email: "janesmith@example.com" },
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Slots</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Slot Time</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Booked By</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{slot.time}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.booked ? "Booked" : "Available"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.booked ? (
                    <>
                      <p>Name: {slot.bookedBy.name}</p>
                      <p>Email: {slot.bookedBy.email}</p>
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSlots;
