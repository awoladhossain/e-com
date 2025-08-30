import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/users/authApi";
import { logout } from "../redux/features/users/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const handleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  // const handleLogout = async () => {
  //   try {
  //     await logoutUser().unwrap();
  //     dispatch(logout());
  //     // Add a small delay
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 100);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleLogout = async () => {
    console.log("Starting logout...");
    try {
      const result = await logoutUser().unwrap();
      console.log("Logout API response:", result);

      dispatch(logout());
      console.log("Redux state cleared");

      console.log("About to navigate to /");
      navigate("/");
      console.log("Navigation called");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Pages", path: "/pages" },
    { name: "Contact", path: "/contact" },
  ];

  const userDropDownMenu = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const adminDropDownMenu = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manage Items", path: "/dashboard/manage-product" },
    { label: "All Orders", path: "/dashboard/all-orders" },
    { label: "Add Products", path: "/dashboard/add-product" },
  ];

  const dropDownMenus =
    user?.role === "admin" ? [...adminDropDownMenu] : [...userDropDownMenu];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      <nav className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center rounded-md">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide text-primary">
          <NavLink to="/">
            Lebaba<span className="text-black">.</span>
          </NavLink>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-600">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors hover:text-primary ${
                    isActive ? "text-primary font-semibold" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/search"
            className="text-gray-600 hover:text-primary transition"
          >
            <i className="ri-search-line text-xl"></i>
          </NavLink>
          <button className="relative text-gray-600 hover:text-primary transition">
            <i className="ri-shopping-bag-line text-xl"></i>
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          {/* <span>
            {user ? (
              <>
                <img
                  onClick={handleDropDown}
                  src={user?.profileImage || avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-200 hover:scale-105 transition cursor-pointer"
                />
                {dropDownOpen && (
                  <div>
                    <ul>
                      {dropDownMenus.map((dropDownMenu, index) => (
                        <li key={index}>
                          <Link to={dropDownMenu.path}>
                            {dropDownMenu.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-200 hover:scale-105 transition cursor-pointer"
                />
              </Link>
            )}
          </span> */}
          <span className="relative">
            {user ? (
              <>
                {/* Avatar */}
                <img
                  onClick={handleDropDown}
                  src={user?.profileImage || avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-200 hover:scale-105 transition cursor-pointer"
                />

                {/* Dropdown */}
                {dropDownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50">
                    <ul className="py-2 text-gray-700">
                      {dropDownMenus.map((dropDownMenu, index) => (
                        <li key={index}>
                          <Link
                            to={dropDownMenu.path}
                            className="block px-4 py-2 hover:bg-gray-100 transition"
                            onClick={() => setDropDownOpen(false)} // close on select
                          >
                            {dropDownMenu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                {/* <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-200 hover:scale-105 transition cursor-pointer"
                /> */}
                <p>login</p>
              </Link>
            )}
          </span>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <ul className="flex flex-col gap-4 px-6 py-4 text-gray-700">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block w-full transition-colors hover:text-primary ${
                      isActive ? "text-primary font-semibold" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
