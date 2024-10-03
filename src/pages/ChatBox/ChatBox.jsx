import "./chatBox.css";

// Components.............
import Stories from "../../Components/Stories/Stories";

// Fake Apis..........
import CurrentUser from "../../FackApis/CurrentUserData";

// Font Awesome Icon................
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faFileAlt } from "@fortawesome/free-solid-svg-icons";

const ChatBox = () => {
  return (
    <>
      <Stories />
      <div className="chat-box">
        <div className="chat-box-top">
          <img
            src="https://media.istockphoto.com/id/1815745180/photo/portrait-of-beautiful-multiracial-tourist-woman-during-sunset-on-top-of-hill.webp?a=1&b=1&s=612x612&w=0&k=20&c=SDt3m8BFs88Olzf_Ak_yA42qHmsPVp_oPg1s_Ad7GdY="
            alt=""
          />
          <div className="user-name">
            <h3>{CurrentUser.map((user) => user.name)}</h3>
            <h5>{CurrentUser.map((user) => user.username)}</h5>
          </div>
        </div>
        <div className="chat-box-bottom">
          <form action="#">
            <input type="text" placeholder="Write Something" />
            <button type="submit" className="btn btn-primary">
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </button>
            <label className="btn btn-primary" htmlFor="CFile">
              <FontAwesomeIcon icon={faFileAlt} />
              <input type="file" id="CFile" />
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
