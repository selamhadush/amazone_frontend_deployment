import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/loginlogo.png";
import { IoIosArrowDown } from "react-icons/io";
import { auth } from "../../Utility/fireBase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import ClipLoader from "react-spinners/ClipLoader";
function Auths() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
   });
   const navigate = useNavigate();
  // console.log(email, password);
  // console.log(user);
  const authHandler = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({...loading, signIn:true})
      //start firebase authentication
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({...loading, signIn:false})
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({...loading, signIn:false})
        });
    } else if (e.target.name == "register") {
      setLoading({...loading, signUp:true})
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({...loading, signUp:false});
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({...loading, signUp:false});
        });
    }
  };
  return (
    <section className={classes.signin}>
      <Link to={"/"}>
        <img src={logo} alt="logo" />
      </Link>
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="Email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signin_btn}
          >
            {loading.signIn?(<ClipLoader color="#000" size={15}></ClipLoader>
            ):(
              "signIn"
            )}
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon_Clon's{" "}
          <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=508088">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496">
            Privacy Notice.
          </a>
        </p>
        {/* Custom Dropdown */}
        <div className={classes.customDropdown}>
          <button onClick={toggleDropdown} className={classes.dropdownButton}>
            {/* <span className={classes.dropdownArrow}></span>{" "} */}
            {/* Dropdown arrow */}
            <IoIosArrowDown size={20} />
            Need help?
          </button>
          {isOpen && (
            <div className={classes.dropdownMenu}>
              <a
                className={classes.dropdownItem}
                href="https://www.amazon.com/ap/forgotpassword?openid.return_to=https%3A%2F%2Fwww.amazon.com&prevRID=7APH21HN9SQN1ZMT638M&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&prepopulatedLoginId=&failedSignInCount=0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=usflex&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0"
              >
                Forgot your password?
              </a>
              <a
                className={classes.dropdownItem}
                href="https://www.amazon.com/gp/help/customer/account-issues/ref=ap_login_with_otp_claim_collection?ie=UTF8"
              >
                Other issues with Sign-In
              </a>
            </div>
          )}
        </div>
        {/* <select id="listBox" className={classes.listBox}>
          <option className={classes.select} value="">
            Need help?
          </option>
          <option className={classes.option} value="option1">
            <a
              target="blank"
              href="https://www.amazon.com/ap/forgotpassword?openid.return_to=https%3A%2F%2Fwww.amazon.com&prevRID=7APH21HN9SQN1ZMT638M&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&prepopulatedLoginId=&failedSignInCount=0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=usflex&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0"
            >
              Forgot your password?
            </a>
          </option>
          <option className={classes.option} target="blank" value="option2">
            <a href="https://www.amazon.com/gp/help/customer/account-issues/ref=ap_login_with_otp_claim_collection?ie=UTF8">
              Other issues with Sign-In
            </a>
          </option>
        </select> */}
        <hr className={classes.nh} />
        <h3>Buying for work?</h3>
        <a
          href="https://www.amazon.com/business/register/welcome?ref_=ab_reg_signin"
          target="_blank"
        >
          Shop on Amazon Business
        </a>
      </div>
      <div className={classes.line_container}>
        <hr className={classes.line} />
        <span>New to Amazon Clone?</span>
        <hr className={classes.line} />
      </div>
      <button
        type="submit"
        onClick={authHandler}
        name="register"
        className={classes.signup_btn}
      >
         {loading.signUp? (
          <ClipLoader color="#000" size={15}></ClipLoader>
            ):(
              " Create your Amazon clone account"
            )}
       
      </button>
      {error &&<small style={{pading:"5px", color:"red"}} >{error}</small>}
    </section>
  );
}

export default Auths;
