import "./stories.css";

// fakeApis.......................
import CurrentUser from "../../FackApis/CurrentUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const UserStory = () => {
  return (
    <div className="story userStory">
      <div className="user">
        <img
          src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
      </div>
      <img
        src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
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
