import React from 'react';
import {FaFacebook, FaInstagram, FaTiktok, FaYoutube} from "react-icons/fa";

const Footer = () => {
    return (
        <>
           <div className="futer">
               <span className="footer-text">Putovati slobodno znaci ziveti slobodno</span>
               <ul className="social-icons">
                   <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><FaFacebook /></a></li>
                   <li><a href="https://www.instagram.com/zavrti_globus/" target="_blank" rel="noreferrer"><FaInstagram /></a></li>
                   <li><a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a></li>
                   <li><a href="https://tiktok.com" target="_blank" rel="noreferrer"><FaTiktok /></a></li>
               </ul>
           </div>
        </>
    );
};

export default Footer;
