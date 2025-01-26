import { useEffect, useState } from "react"; 
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const Balance = () => {
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosSecure.get("/payments"); 
        setPayments(response.data); 
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPayments();
  }, [axiosSecure]);

  const totalPrice = payments.reduce((total, item) => total + item.price, 0);

  return (
    <div className="p-5">
      <Helmet>
        <title>MF || Balance </title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-5">Payment History</h2>
      <p>Total Balance: ${totalPrice}</p>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Member Email</th>
              <th className="border border-gray-300 px-4 py-2">Class Titles</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {payment.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {Array.isArray(payment.classTitles)
                    ? payment.classTitles.join(", ")
                    : payment.classTitles}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${payment.price.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <p className="text-center text-gray-500 mt-5">
            No payment history found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Balance;
