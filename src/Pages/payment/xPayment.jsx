import { useLocation } from "react-router-dom";

const Payment = () => {
  const { state } = useLocation();
  const { trainerName, trainerPhoto, selectedTime, selectedPackage } = state;

  return (
    <div>
      <h1>Payment Page</h1>
      <div>
      <img src={trainerPhoto} alt="" />
      </div>
      <p>Trainer: {trainerName}</p>
      <p>Time: {selectedTime}</p>
      <p>Plan: {selectedPackage.name}</p>
      <p>Price: ${selectedPackage.price}</p>
      {/* Add payment processing form or components here */}
    </div>
  );
};

export default Payment;
