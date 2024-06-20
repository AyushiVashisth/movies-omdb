import React, { useState, useEffect } from "react";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Navbar.css";
import logo from "../assets/images/imdb-logo.jpg";

const Navbar = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavBar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
      setLastScrollY(window.scrollY);
    } else {
      setShow("top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);
    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, [lastScrollY]);

  const openMobileMenu = () => {
    setMobileMenu(true);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/movie");
    }
    if (type === "series") {
      navigate("/series");
    }
    setMobileMenu(false);
  };

  return (
    <header
      className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}
      data-aos="fade-down"
    >
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className="menuItems">
        <li
          className="menuItem"
          onClick={() => navigationHandler("movie")}
          data-aos="fade-in"
          data-aos-delay="200"
        >
          Movies
        </li>
        <li
          className="menuItem"
          onClick={() => navigationHandler("series")}
          data-aos="fade-in"
          data-aos-delay="400"
        >
          Series
        </li>
      </ul>

      <div className="mobileMenuItems">
        {mobileMenu ? (
          <VscChromeClose
            onClick={() => {
              setMobileMenu(false);
            }}
            data-aos="fade-in"
          />
        ) : (
          <SlMenu onClick={openMobileMenu} data-aos="fade-in" />
        )}
      </div>
    </header>
  );
};

export default Navbar;
