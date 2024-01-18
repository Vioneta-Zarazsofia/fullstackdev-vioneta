import React from "react";
import { FaShoppingBag } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <FaShoppingBag
              className="shopping-bag-icon"
              style={{ verticalAlign: "middle" }}
            />
            <span
              style={{
                marginLeft: "10px",
                fontSize: "24px",
                fontWeight: "bold",
                verticalAlign: "middle",
              }}
            >
              Storyku
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
