import { Link } from "react-router-dom";
import "./leftBar.css";
import userLogo from "../../../public/img/user-dp.jpeg";

// Icon Images................
import Friend from "../../assets/icons/1.png";
import Groups from "../../assets/icons/2.png";
import Market from "../../assets/icons/3.png";
import Watch from "../../assets/icons/4.png";
import Gallery from "../../assets/icons/5.png";
import Videos from "../../assets/icons/6.png";
import Message from "../../assets/icons/7.png";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig/Firebase";

const LeftBar = () => {
  const [data, setData] = useState();
  const userID = auth.currentUser.uid;

  useEffect(() => {
    //Get USer Data From Firebase //
    const getUserDataFromFirebase = async () => {
      const docRef = doc(db, "users", userID);
      const dataArr = [];
      await getDoc(docRef).then((data) => {
        dataArr.push(data.data());
        setData(dataArr);
      });
    };

    getUserDataFromFirebase();
  }, []);

  return (
    <div className="leftBar">
      <div className="left-container">
        <div className="menu">
          {data?.map((user, ind) => {
            return (
              <Link key={ind} to={`/profile/${user.uid}`}>
                <div className="user">
                  <img
                    src={user.profileImg ? user.profileImg : userLogo}
                    alt=""
                  />
                  <h4>{user.fullName ? user.fullName : user.username}</h4>
                </div>
              </Link>
            );
          })}
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
