import React, { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut.JSx";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./cart.module.css";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shoping Basket</h3>
          <hr />
          <div className={classes.list_items}>
            {basket.length === 0 ? (
              <p>Opps ! No item in your cart</p>
            ) : (
              basket?.map((item, i) => {
                return (
                  <section className={classes.cart_product}>
                    <ProductCard
                      key={i}
                      product={item}
                      renderAdd={false}
                      renderDesc={true}
                      flex={true}
                    />
                    <div className={classes.btn_container}>
                      <button
                        className={classes.btn}
                        onClick={() => increment(item)}
                      >
                        <IoIosArrowUp size={20} />
                      </button>
                      <span>{item.amount}</span>
                      <button
                        className={classes.btn}
                        onClick={() => decrement(item.id)}
                      >
                        <IoIosArrowDown size={20} />
                      </button>
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>
        {basket.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link rel="stylesheet" to="/payment">
              Continue to checkout
            </Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
