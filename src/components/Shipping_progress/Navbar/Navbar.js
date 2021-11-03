import React, { useState } from "react";
import "./Navbar.css";
// import MenuIcon from "@mui/icons-material/Menu";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import CloseIcon from "@mui/icons-material/Close";
import { NavLink, Link } from "react-router-dom";

export const Navbar = () => {
  const [menubar, setmenubar] = useState(false);

  const handlemenu = () => {
    setmenubar(!menubar);
  };

  return (
    <>
      <div className="Navbar">
        <div className="Navbar_logo">
          <a>
            <span className="codesbots-logo">CODESANDBOTS</span>
          </a>
        </div>
        <div className="Navbar_options">
          <NavLink to="/home">HOME</NavLink>
          <NavLink to="/e-commerce">SHOP</NavLink>
          <NavLink to="#">CLASSES</NavLink>
        </div>
      </div>
      <div className="second-navbar">
        <div className="toggle_navbar">
          <span className="logo_title">CODESANDBOTS</span>
          <span className="menu_icon" onClick={handlemenu}>
            {menubar ? (
              <i class="fas fa-times"></i>
            ) : (
              <i class="fas fa-bars"></i>
            )}
          </span>
          {/* <span className="cart_icon">
            <i class="fas fa-shopping-cart"></i>
          </span> */}
        </div>
        {menubar && (
          <div className="toggle_navbar_options">
            <hr />
            <div className="nav_options">
              <Link to="/" onClick={() => setmenubar(false)}>
                HOME
              </Link>
            </div>
            <hr />
            <div className="nav_options">
              <Link to="#" onClick={() => setmenubar(false)}>
                SHOP
              </Link>
            </div>
            <hr />
            <div className="nav_options">
              <Link to="#" onClick={() => setmenubar(false)}>
                CLASSES
              </Link>
            </div>
            <hr />
          </div>
        )}
      </div>
    </>
  );
};
