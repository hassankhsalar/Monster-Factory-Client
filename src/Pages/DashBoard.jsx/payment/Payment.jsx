import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [cart] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.packagePrice, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      console.log("Sending payment request for totalPrice:", totalPrice);
      axiosSecure
        .post("/create-payment-intent", { amount: totalPrice, currency: "usd" })
        .then((res) => {
          //console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  // useEffect(() => {
  //     // Fetch the clientSecret from the backend
  //     fetch("http://localhost:5000/create-payment-intent", {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ amount: 1000, currency: "usd" }), // Example amount in cents
  //     })
  //         .then((res) => res.json())
  //         .then((data) => setClientSecret(data.clientSecret))
  //         .catch((error) => console.error("Error fetching clientSecret:", error));
  // }, []);

  return (
    <div className="flex mt-10">
      <div className="px-16">
        <h2 className="text-3xl font-semibold">Payment</h2>
        <p className="">Please pay to confirm your booking</p>
      </div>
      <div className="mt-6">
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm></CheckoutForm>
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;
