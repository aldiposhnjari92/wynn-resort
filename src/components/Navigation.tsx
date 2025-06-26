import { useState } from "react";
import { NavLink } from "react-router";
import Container from "./Container";
import { navigationLinks } from "../utilities/navigationLinks";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white sticky top-0 z-50 px-4 lg:px-[60px] py-[24px]">
      <Container className="flex items-center justify-between h-full">
        <NavLink to="/">
          <img
            src="assets/logo.svg"
            alt="Logo"
            className="object-scale-down h-[40px] md:h-[55px] lg:h-[77px]"
          />
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-[41px]">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.href}
              className={({ isActive }) =>
                `text-[14px] font-body leading-[0.5px] uppercase font-[600] text-black hover:text-secondary hover:underline hover:underline-offset-2 ${
                  isActive ? "text-accent" : ""
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <NavLink to="/">EN</NavLink>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="lg:hidden cursor-pointer"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out z-40 ${
          menuOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-6 overflow-y-auto h-[calc(100vh-72px)]">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-[16px] uppercase font-semibold text-black hover:text-secondary ${
                  isActive ? "text-accent" : ""
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
