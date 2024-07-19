import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";

import TractorIcon from "./Icons/TractorIcon";
import PotIcon from "./Icons/PotIcon";
import HomeIcon from "./Icons/HomeIcon";
import HeartIcon from "./Icons/HeartIcon";
import UserNoFillIcon from "./Icons/UserNoFillIcon";

const Footer = () => {
  const navigate = useNavigate();
  const [showTractorDropdown, setShowTractorDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const tractorRef = useRef(null);
  const userRef = useRef(null);

  const cartItemsCount = useSelector(
    (state) => state.cart.currentCart.cart_ingredients.length
  );

  const handleIconClick = (path) => {
    navigate(path);
  };

  const handleClickOutside = (event) => {
    if (tractorRef.current && !tractorRef.current.contains(event.target)) {
      setShowTractorDropdown(false);
    }
    if (userRef.current && !userRef.current.contains(event.target)) {
      setShowUserDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MediaQuery maxWidth={768}>
      <div className="fixed bottom-0 w-full bg-gray-800 text-white flex justify-around items-center p-4">
        <div className="relative" ref={tractorRef}>
          <button onClick={() => setShowTractorDropdown(!showTractorDropdown)}>
            <TractorIcon />
          </button>
          {showTractorDropdown && (
            <div className="absolute bottom-full mb-2 bg-gray-700 rounded p-2">
              <div
                className="cursor-pointer"
                onClick={() => handleIconClick("/main_view")}
              >
                Einkaufen
              </div>
            </div>
          )}
        </div>
        <button onClick={() => handleIconClick("/recipe")}>
          <PotIcon />
        </button>
        <button onClick={() => handleIconClick("/landingpage")}>
          <HomeIcon />
        </button>
        <button onClick={() => handleIconClick("/favorites")}>
          <HeartIcon />
        </button>
        <div className="relative" ref={userRef}>
          <button onClick={() => setShowUserDropdown(!showUserDropdown)}>
            <UserNoFillIcon />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-green-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </button>
          {showUserDropdown && (
            <div className="absolute bottom-full mb-2 bg-gray-700 rounded p-2">
              <div
                className="cursor-pointer"
                onClick={() => handleIconClick("/settings")}
              >
                Profil
              </div>
              <div
                className="cursor-pointer flex items-center"
                onClick={() => handleIconClick("/cart")}
              >
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="ml-2 bg-green-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </MediaQuery>
  );
};

export default Footer;
