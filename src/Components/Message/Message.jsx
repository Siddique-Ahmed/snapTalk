import "./message.css";
import { Link } from "react-router-dom";
import userIcon from "../../../public/img/user-dp.jpeg"

// FontAwesome Icons................
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";

const Message = () => {
  return (
    <div className="Messages">
      <div className="message-top">
        <h4>Message</h4>
        <FontAwesomeIcon icon={faEdit} />
      </div>
      <div className="message-search">
        <FontAwesomeIcon icon={faSearch} />
        <input type="search" placeholder="Search Message" />
      </div>
      <div className="border-div"></div>

        <Link to={"/chatbox/id"}>
          <div className="message">
            <div className="user">
              <img
                src={userIcon}
                alt=""
              />
              <div className="green-active"></div>
            </div>
            <div className="message-body">
              <h5>Siddique</h5>
              <p>Kal Aana he</p>
            </div>
          </div>
        </Link>
    </div>
  );
};

export default Message;
