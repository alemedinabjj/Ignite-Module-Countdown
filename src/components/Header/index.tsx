import { HeaderContainer } from "./styles";
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <HeaderContainer>
      <img
        src="https://raw.githubusercontent.com/alemedinabjj/monkeyfeed/f11c91c0121893c1525d3abd1782537e34b01e14/src/assets/logo.svg"
        alt="logo"
      />
      <nav>
        <NavLink to="" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};
