import "./stories.css";
import userIcon from "../../../public/img/user-dp.jpeg"
import userBG from "../../../public/img/bg-cover.png"

// fakeApis.......................
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const UserStory = () => {
  return (
    <div className="story userStory">
      <div className="user">
        <img
          src={userIcon}
          alt=""
        />
      </div>
      <img
        src={userBG}
        alt=""
      />
      <label htmlFor="storyFiles">
        <FontAwesomeIcon icon={faAdd} />
        <input type="file" id="storyFiles" />
      </label>
      <h5>Add Story</h5>
    </div>
  );
};

export default UserStory;
