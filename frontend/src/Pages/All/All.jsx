import React from 'react'
import { Link } from "react-router-dom";
function All() {
    const pages = [
    { name: "Landing", path: "/" },
    { name: "Auth", path: "/Auth" },
    { name: "Payment", path: "/Payment" },
    { name: "Orders", path: "/Orders" },
    { name: "Cart", path: "/Cart" },
    { name: "Results", path: "/category/:categoryName" },
    { name: "Product Detail", path: "/products/:productId" },
  ];
  return (
       <div>
      <h1>All Pages</h1>
      <ul>
        {pages.map((page, index) => (
          <li key={index}>
            <Link to={page.path}>{page.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default All
