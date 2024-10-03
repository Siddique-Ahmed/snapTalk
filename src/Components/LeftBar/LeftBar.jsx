import { Link } from "react-router-dom";
import "./leftBar.css";

// Icon Images................
import Friend from "../../assets/icons/1.png";
import Groups from "../../assets/icons/2.png";
import Market from "../../assets/icons/3.png";
import Watch from "../../assets/icons/4.png";
import Gallery from "../../assets/icons/5.png";
import Videos from "../../assets/icons/6.png";
import Message from "../../assets/icons/7.png";

const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="left-container">
        <div className="menu">
          <Link to={"/profile/id"}>
            <div className="user">
              <img
                src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
              <h4>Siddique Ahmed</h4>
            </div>
          </Link>

          <Link to="/">
            <div className="item">
              <img src={Friend} alt="" />
              <h4>Friends</h4>
            </div>
          </Link>

          <Link to="/">
            <div className="item">
              <img src={Groups} alt="" />
              <h4>Groups</h4>
            </div>
          </Link>

          <Link to="/">
            <div className="item">
              <img src={Market} alt="" />
              <h4>Market</h4>
            </div>
          </Link>

          <Link to="/">
            <div className="item">
              <img src={Watch} alt="" />
              <h4>Watch</h4>
            </div>
          </Link>
        </div>

        <hr />

        <div className="menu">
          <h4 className="others">Your Shortcuts</h4>
          <Link to="/">
            <div className="item">
              <img src={Gallery} alt="" />
              <h4>Gallery</h4>
            </div>
          </Link>

          <Link to="/">
            <div className="item">
              <img src={Videos} alt="" />
              <h4>Videos</h4>
            </div>
          </Link>

          <Link to="/chatbox/id">
            <div className="item">
              <img src={Message} alt="" />
              <h4>Message</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
