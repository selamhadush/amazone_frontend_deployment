import React, { useContext, useState } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import LayOut from "../../components/LayOut/LayOut.JSx";
import classes from "./payment.module.css";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { collection, doc, setDoc } from "firebase/firestore";
// import { DisplaySettings, Try } from "@mui/icons-material";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { db, auth } from "../../Utility/fireBase.js";
import { useNavigate } from "react-router-dom";
function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  const totalItems = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // backend or function contact to get client secret key
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.client_secret;
      //conduct client or react side confirmation (e.g., using Stripe, PayPal, etc.)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(confirmation);
      // If payment is successful,save the data to firestore or database and clear the basket
      try {
        // Ensure user is authenticated
        const user = auth.currentUser; // Get the authenticated user
        if (!user) {
          throw new Error("User not authenticated");
        }
        await setDoc(
          doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
          {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
            // await db
            //   .collection("users")
            //   .doc(user.uid)
            //   .collection("orders")
            //   .doc(paymentIntent.id)
            //   .set({
            //     basket: basket,
            //     amount: paymentIntent.amount,
            //     created: paymentIntent.created,
          }
        );

        console.log("Payment details saved successfully.");
      } catch (error) {
        console.error("Error saving payment details:", error);
      }
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.error("Payment failed:", error); // Handling any errors
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>
        Checkout ({totalItems}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>Street name</div>
            <div>state</div>
          </div>
        </div>
        <hr />
        {/* product  */}
        <div className={classes.flex}>
          <h3>Review items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment} action="">
                {/* card error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="Submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="grey" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
