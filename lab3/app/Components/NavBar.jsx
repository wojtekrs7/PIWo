import { NavLink } from "react-router";
import AuthPanel from "../Contexts/AuthPanel";

export default function NavBar() {
  return (
      <nav style={{ display: "flex", gap: "1em", alignItems: "center" }}>
        <NavLink to="/">Strona główna</NavLink>
        <NavLink to="/new">Dodaj nową</NavLink>
        <AuthPanel />
      </nav>
  );
}