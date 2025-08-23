import { Link, NavLink } from "react-router-dom";
import avatar from "../assets/avatar.png";

const Navbar = () => {
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="link">
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li className="link">
            <NavLink to="/pages">Pages</NavLink>
          </li>
          <li className="link">
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        <div className="nav__logo">
          <NavLink to="/">
            Lebaba<span>.</span>
          </NavLink>
        </div>
        <div className="nav__icons relative">
          <span>
            <NavLink to="/search">
              <i className="ri-search-line"></i>
            </NavLink>
          </span>
          <span>
            <button className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                0
              </sup>
            </button>
          </span>
          <span>
            <Link to="/login">
              {" "}
              <img
                src={avatar}
                alt="User Avatar"
                className="size-6 rounded-full cursor-pointer"
              />
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
