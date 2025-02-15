import React, { useContext } from "react";
import { FaSearchDollar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";
import LowerHeader from "./LowerHeader";
import classes from "./Header.module.css";
import { DataContext } from "../DataProvider/DataProvider";
import { reducer } from "../../Utility/reducer";
import {auth} from "../../Utility/fireBase"
function Header() {
  const [{user, basket }, dispatch] = useContext(DataContext);
  //console.log(basket);
  const totalItems = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            {/* logo */}
            <Link to={"/"}>
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt=""
              />
            </Link>
            <div className={classes.delivery}>
              {/* delivery */}
              <span>
                <FaLocationDot />
              </span>

              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* Search section */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="All">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <FaSearchDollar size={38} />
          </div>
          {/* right side link  */}
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://www.shutterstock.com/shutterstock/photos/2491312125/display_1500/stock-vector-usa-flag-icons-vector-set-united-states-of-america-flat-badges-flag-of-usa-vector-flat-symbol-2491312125.jpg"
                alt=""
              />
              <section>
                <option value="">EN</option>
              </section>
            </Link>
            {/* three components */}
            <Link to={!user && "/Auth"}>
            <div>
              {
                user ?(
                <>
                <p>Hello{user?.email?.split("@")[0]}</p>
                  <span onClick={()=>auth.signOut()}>Sign Out</span>
                </>
                ):(
                <>    
                   <p>Sign In</p>
                   <span>Account & Lists</span> 
                   </>
                 )}
              
              </div>
             
            </Link>
            {/* orders */}
            <Link to="/Orders">
              <p>returns</p>
              <span>& orders</span>
            </Link>
            {/* cart */}
            <Link to="/Cart" className={classes.cart}>
              <LiaCartArrowDownSolid size={35} />
              <span>{totalItems}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
