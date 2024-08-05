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
  const [showPotDropdown, setShowPotDropdown] = useState(false);
  const [showHeartDropdown, setShowHeartDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const tractorRef = useRef(null);
  const potRef = useRef(null);
  const heartRef = useRef(null);
  const userRef = useRef(null);

  const cartItemsCount = useSelector(
    (state) => state.cart.currentCart.cart_ingredients.length
  );

  const handleIconClick = (path) => {
    navigate(path);
    setShowTractorDropdown(false);
    setShowPotDropdown(false);
    setShowHeartDropdown(false);
    setShowUserDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (tractorRef.current && !tractorRef.current.contains(event.target)) {
      setShowTractorDropdown(false);
    }
    if (potRef.current && !potRef.current.contains(event.target)) {
      setShowPotDropdown(false);
    }
    if (heartRef.current && !heartRef.current.contains(event.target)) {
      setShowHeartDropdown(false);
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
                onClick={() => handleIconClick("/ingredient_search")}
              >
                Zutaten finden
              </div>
              <div
                className="cursor-pointer"
                onClick={() => handleIconClick("/shop_search")}
              >
                Shop finden
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={potRef}>
          <button onClick={() => setShowPotDropdown(!showPotDropdown)}>
            <PotIcon />
          </button>
          {showPotDropdown && (
            <div className="absolute bottom-full mb-2 bg-gray-700 rounded p-2">
              <div
                className="cursor-pointer"
                onClick={() => handleIconClick("/recipe_creation")}
              >
                Kreieren
              </div>
              <div
                className="cursor-pointer"
                onClick={() => handleIconClick("/recipe_overview")}
              >
                Rezepte
              </div>
            </div>
          )}
        </div>
        <button onClick={() => handleIconClick("/landingpage")}>
          <HomeIcon />
        </button>
        <div className="relative" ref={heartRef}>
          <button onClick={() => setShowHeartDropdown(!showHeartDropdown)}>
            <HeartIcon />
          </button>
          {showHeartDropdown && (
            <div className="absolute bottom-full mb-2 bg-gray-700 rounded p-2">
              <div
                className="cursor-pointer"
                onClick={() => handleIconClick("/favorites")}
              >
                Favoriten
              </div>
              <div
                className="cursor-pointer"
                onClick={() => handleIconClick("/shoppinglisten")}
              >
                Shoppingliste
              </div>
            </div>
          )}
        </div>
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
