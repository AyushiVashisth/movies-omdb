// src/components/Home.js
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { movieImages } from "../assets/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) =>
        prevIndex === movieImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleSearchClick = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    } else {
      toast.error("Please enter a search query");
    }
  };

  return (
    <div
      className="heroBanner"
      style={{
        backgroundImage: `url(${movieImages[currentBgIndex].imageUrl})`
      }}
    >
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            The ultimate destination for movie lovers. Explore Now..
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for movie or TV show.."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={handleSearchClick}>Search</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
