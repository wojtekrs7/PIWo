import { NavLink } from "react-router";

export default function NavBar() {
  return (
  <nav>
    <NavLink to="/">Strona główna</NavLink>
    <NavLink to="/new">Dodaj nową</NavLink>
    <NavLink to="/login">Zaloguj się</NavLink>
  </nav>

    
  );
}