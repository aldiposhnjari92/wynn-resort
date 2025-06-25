import { NavLink } from "react-router";
import Container from "./Container";
import { navigationLinks } from "../utilities/navigationLinks";

const Navigation = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 px-[60px] py-[24px]">
      <Container className="flex items-center justify-between h-full">
        <NavLink to="/">
          <img src="assets/logo.svg" alt="Logo" className="object-scale-down" />
        </NavLink>

        <div className="flex items-center gap-[41px]">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.href}
              className={({ isActive }) =>
                `text-[14px] leading-[0.5px] uppercase font-[600] text-black hover:text-gray-500 ${
                  isActive ? "text-accent" : ""
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>

        <NavLink to="/">
        EN
        </NavLink>
      </Container>
    </nav>
  );
};

export default Navigation;
