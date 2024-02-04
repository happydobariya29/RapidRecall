import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p style={{color: "white"}}>&copy; 2024 <strong>RapidRecall</strong>. All rights reserved.</p>
        <Link style={{color:"white"}} to="https://www.linkedin.com/in/happy-dobariya-2752b9222/" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-linkedin mx-3"></i>
        </Link>
        <Link style={{color:"white"}} to="https://github.com/happydobariya29" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;