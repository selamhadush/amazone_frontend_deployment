import React, { useContext, useState } from "react";
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // State for selected language
  //console.log(basket);
   // Toggle language selector dropdown
  const handleLanguageIconClick = () => {
    setIsDropdownOpen(prevState => !prevState);                        
  };

  // Handle language selection
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // Close the dropdown after selecting a language
    setIsDropdownOpen(false);
    // You can add logic to update language globally, like storing in local storage, or triggering a re-render.
    console.log('Selected Language:', language);
  };
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
            <Link to="" className={classes.language} onClick={handleLanguageIconClick}>
              <img
                src="https://www.shutterstock.com/shutterstock/photos/2491312125/display_1500/stock-vector-usa-flag-icons-vector-set-united-states-of-america-flat-badges-flag-of-usa-vector-flat-symbol-2491312125.jpg"
                alt=""
              
              />
               {/* Language Selector Dropdown */}
     {isDropdownOpen && (
        <div className={classes.languageDropdown}>
          <form>
            <div>
              <input
                type="radio"
                id="english"
                name="language"
                value="en"
                checked={selectedLanguage === 'en'}
                onChange={() => handleLanguageChange('en')}
              />
              <label htmlFor="english">English</label>
            </div>
            <div>
              <input
                type="radio"
                id="spanish"
                name="language"
                value="es"
                checked={selectedLanguage === 'es'}
                onChange={() => handleLanguageChange('es')}
              />
              <label htmlFor="spanish">Spanish</label>
            </div>
            <div>
              <input
                type="radio"
                id="french"
                name="language"
                value="fr"
                checked={selectedLanguage === 'fr'}
                onChange={() => handleLanguageChange('fr')}
              />
              <label htmlFor="french">French</label>
            </div>

            <div>
              <input
                type="radio"
                id="amharic"
                name="language"
                value="am"
                checked={selectedLanguage === 'am'}
                onChange={() => handleLanguageChange('am')}
              />
              <label htmlFor="amharic">Amharic</label>
            </div>
            <div>
              <input
                type="radio"
                id="tigrgna"
                name="language"
                value="tg"
                checked={selectedLanguage === 'tg'}
                onChange={() => handleLanguageChange('tg')}
              />
              <label htmlFor="tigrigna">Tigrigna</label>
            </div>
            {/* Add more languages as needed */}

          </form>
        </div>
      )}
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
