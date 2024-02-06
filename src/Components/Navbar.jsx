import {
  House,
  List,
  MagnifyingGlass,
  ShoppingCart,
  User,
  UserCircle,
  X,
} from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [nav_links, setNav_links] = useState([]);
  const [navActive, setNavActive] = useState(false);
  const [scroll, setScroll] = useState(false);
  document.body.style.overflowY = navActive ? "hidden" : "auto";
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  });
  async function getApi() {
    try {
      const req = await axios.get("http://localhost:3000/nav_links");
      const res = await req.data;
      setNav_links(res);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getApi();
  }, []);
  return (
    <>
      <nav
        className={`${
          scroll ? "active" : ""
        } h-[60px] sticky left-0 top-0 z-[2312] bg-white`}
      >
        <div className="container h-full flex justify-between items-center px-2">
          <Link className="hidden md:block">
            <MagnifyingGlass size={20} />
          </Link>
          <Link to={"/"} className="text-2xl">
            Avion
          </Link>
          <List
            className="nav_open text-2xl"
            onClick={() => setNavActive(true)}
          />
          <div className="hidden md:flex items-center gap-2 md:gap-4">
            <Link>
              {" "}
              <ShoppingCart size={25} />
            </Link>
            <Link>
              {" "}
              <UserCircle size={25} />
            </Link>
          </div>
        </div>
        <ul
          className={`${
            navActive ? "" : "active"
          } flex items-center justify-center gap-8 md:bg-white py-5`}
        >
          {nav_links.map((link, index) => (
            <li key={index}>
              <Link to={link.to}>{link.title}</Link>
            </li>
          ))}
          <X
            className="nav_close absolute right-[9px] top-[18px]"
            onClick={() => setNavActive(false)}
          />
        </ul>
      </nav>
      <div id="menu" className={`${navActive ? "" : "active"} md:hidden flex `}>
        <Link to={"/"}>
          <House size={25} />
        </Link>
        <Link to={"/search"}>
          <MagnifyingGlass size={25} />
        </Link>
        <Link to={"/shop"}>
          <ShoppingCart size={25} />
        </Link>
        <Link to={"/user"}>
          <User size={25} />
        </Link>
      </div>
    </>
  );
};
