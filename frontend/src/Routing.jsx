import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auths from "./Pages/Auth/Auths";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/productDetail/productDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QqYQrD3Jd9MxJuarZcc0eRTsHiuWtK6PbO0HDpTUwMRGjsISHnnFunKRbvqLYlMMcRT12kFUZO7HyBLfgQJQd2M00ec8kowvj"
);

function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Auth" element={<Auths />} />
          <Route
            path="/Payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />

          <Route path="/Orders" element={<Orders />} />
          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;
