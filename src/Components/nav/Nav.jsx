import "./nav.css";
import { Link } from "react-router-dom";

// Components..............
import DarkMood from "../DarkMood/DarkMood";

// FontAwesome Icons..............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faHome,
  faRightToBracket,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <nav>
      <div className="nav-container">
        {/*......................NavArea Left *..........................*/}

        <div className="nav-left">
          <Link to="/">
            <h3 className="logo">SnapTalk</h3>
          </Link>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link to={"/profile/id"}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <div className="Nav-searchBar">
            <FontAwesomeIcon icon={faSearch} />
            <input type="search" placeholder="Find Friends" />
          </div>
        </div>

        {/*........................NavArea Right.........................*/}

        <div className="nav-right">
          <Link to={"/chatbox/id"}>
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faBell} />
          </Link>
          <DarkMood />
          <Link>
            <FontAwesomeIcon icon={faRightToBracket} />
          </Link>
          <div className="user">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
            <h4>Siddique Ahmed</h4>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
