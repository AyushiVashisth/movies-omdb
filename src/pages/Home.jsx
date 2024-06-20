import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { movieImages } from "../assets/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) =>
        prevIndex === movieImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const texts = [
      "The ultimate destination for movie lovers.",
      "Discover new movies and series.",
      "Explore your favorite genres."
    ];

    let index = 0;
    let charIndex = 0;
    let currentText = "";
    let typingTimeout;

    const type = () => {
      if (document.getElementById("typedText")) {
        if (charIndex < texts[index].length) {
          currentText = texts[index].substring(0, charIndex + 1);
          document.getElementById("typedText").textContent = currentText;
          charIndex++;
          typingTimeout = setTimeout(type, 150);
        } else {
          setTimeout(erase, 1500);
        }
      }
    };

    const erase = () => {
      if (document.getElementById("typedText")) {
        if (charIndex > 0) {
          currentText = texts[index].substring(0, charIndex - 1);
          document.getElementById("typedText").textContent = currentText;
          charIndex--;
          typingTimeout = setTimeout(erase, 50);
        } else {
          index = (index + 1) % texts.length;
          setTimeout(type, 500);
        }
      }
    };

    typingTimeout = setTimeout(type, 500);

    return () => {
      clearTimeout(typingTimeout);
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    console.log("clean");

    return () => {
      console.log("returnclean");
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      navigate(`/search/${debouncedQuery}`);
    }
  }, [debouncedQuery, navigate]);

  const handleSearchClick = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    } else {
      toast.error("Please enter a search query");
    }
  };

  return (
    <div className="heroBanner">
      <img
        src={movieImages[currentBgIndex].imageUrl}
        alt="Background"
        className="bgImage"
      />
      <div className="heroBannerContent" data-aos="fade-up">
        <span className="title">Welcome</span>
        <span className="subTitle" id="typedText"></span>
        <div className="searchInput" data-aos="fade-up" data-aos-delay="200">
          <input
            type="text"
            placeholder="Search for movie or series.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter" && query.length > 0) {
                handleSearchClick();
              }
            }}
          />
          <button className="btn" onClick={handleSearchClick}>
            <strong>Search</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
