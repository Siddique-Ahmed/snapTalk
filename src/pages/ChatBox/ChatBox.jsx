import "./chatBox.css";
import userIcon from '../../../public/img/user-dp.jpeg';

// Components.............
import Stories from "../../Components/Stories/Stories";

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
            src={userIcon}
            alt=""
          />
          <div className="user-name">
            <h3>Siddique Ahmed</h3>
            <h5>siddiqeu1</h5>
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
