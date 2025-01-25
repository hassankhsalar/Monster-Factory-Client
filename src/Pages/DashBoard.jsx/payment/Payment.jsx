import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  return (
    <div className="w-96 px-10 mt-10">
      <Helmet>
        <title>MF || Payment</title>
      </Helmet>
      <div className="w-full">
        <h1 className="text-3xl font-semibold">Payment</h1>
        <p className="text-lg mb-10 mt-2">Pay to Confirm Booking</p>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
