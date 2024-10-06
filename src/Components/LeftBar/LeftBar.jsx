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
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig/Firebase";

const LeftBar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDataFromFirebase = async () => {
      if (!auth.currentUser) {
        return;
      }

      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid); 
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setData(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getDataFromFirebase();
  }, []);

  return (
    <div className="leftBar">
      <div className="left-container">
        <div className="menu">
          {data && (
          <Link to={"/profile/id"}>
            <div className="user">
              <img src={auth.currentUser.photoURL} alt="" />
              <h4>{data.username}</h4>
            </div>
          </Link>
          )}

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
