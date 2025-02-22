import { useState, useContext, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Carousel from "./components/Carousel/CarouselEffect";
import Category from "./components/Category/Category";
import Product from "./components/Product/Product";
import Routing from "./Routing";
import { DataContext } from "./components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/fireBase.js";
function App() {
  const [count, setCount] = useState(0);
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Routing />
      {/* <div> */}
      {/* <a href="https://vitejs.dev" target="_blank"> */}
      {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
      {/* </a> */}
      {/* </div>
      <Header />
      <Carousel />
      <Category />
      <Product /> */}
    </>
  );
}

export default App;
