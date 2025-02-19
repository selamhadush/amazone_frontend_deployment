import React from "react";
import { IoMenu } from "react-icons/io5";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";  
function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <IoMenu />
           <ul>
        {/* <li><Link to="/">Landing</Link></li>
        <li><Link to="/Auth">Auth</Link></li>
        <li><Link to="/Payment">Payment</Link></li>
        <li><Link to="/Orders">Orders</Link></li>
        <li><Link to="/Cart">Cart</Link></li> */}
        <li><Link to="/all">All</Link></li> {/* Link to 'All' page */}
      </ul>
          
         
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
