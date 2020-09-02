import React from "react";

import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <li><a href="/" className="footer-link home-link">Home</a></li>
                    <li><a href="mailto:louisybarrajr@gmail.com" className="footer-link">Contact</a></li>
                </div>
                <div className="footer-info">
                    <p className="copyright">&copy;2020 Organic Coffeestry</p>
                    <p className="crafted-by">Crafted by Ralphie Celedon</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;