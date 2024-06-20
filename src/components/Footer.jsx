import React, { useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../styles/Footer.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="footer">
      <div className="footer-container" data-aos="fade-up">
        <div className="footer-text">
          <p className="footer-made">Made with ❤️ by Ayushi Vashisth</p>
        </div>
        <div className="footer-social">
          <a
            href="https://github.com/AyushiVashisth"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            data-aos="fade-left"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ayushi-vashisth/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:ayushivashisth22@gmail.com"
            rel="noreferrer"
            target="_blank"
            className="footer-link"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <MdEmail />
          </a>
        </div>
        <p className="footer-text" data-aos="fade-up" data-aos-delay="300">
          Check out my{" "}
          <a
            className="footer-link"
            href="https://drive.google.com/file/d/1jDuJ7I0SYGhonZEdCitN2a7L58aX0vPV/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
          </a>{" "}
          and{" "}
          <a
            className="footer-link"
            href="https://AyushiVashisth.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            portfolio
          </a>{" "}
          to know more about me. I'm open to new opportunities and excited to
          work with you!
        </p>
        <p>&copy; {new Date().getFullYear()} My Web. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
