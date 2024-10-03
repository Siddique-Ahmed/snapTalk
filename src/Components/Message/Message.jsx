import "./message.css";
import { Link } from "react-router-dom";

// fakeApis...............
import Messages from "../../FackApis/MessageData";

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

      {Messages.map((mess) => (
        <Link to={"/chatbox/id"}>
          <div className="message" key={mess.id}>
            <div className="user">
              <img
                src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
              <div className="green-active"></div>
            </div>
            <div className="message-body">
              <h5>{mess.name}</h5>
              <p>{mess.mText}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Message;
