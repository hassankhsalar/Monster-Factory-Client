import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    return (
        <div className="w-96">
            <Helmet>
                    <title>MF || Payment</title>
                  </Helmet>
            <div className="w-full">
            <h1>Payment</h1>
                <p>Pay to Confirm Booking</p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;