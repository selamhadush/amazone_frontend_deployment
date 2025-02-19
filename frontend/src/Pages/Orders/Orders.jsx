import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut.JSx";
import { db } from "../../Utility/fireBase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import classes from "./Orders.module.css";
import { collection, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import ProductCard from "../../components/Product/ProductCard";
function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, 'users', user.uid, 'orders');
      const q = query(ordersRef, orderBy('created', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log(snapshot);
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      // Cleanup the subscription when the component unmounts
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2> Your Orders</h2>
          {
            orders?.length == 0 &&<div style={{padding:"20px"}}>You don't have orders yet.</div>
          }
          {/* Order Items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order Id:{eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
