import "./userprofile.css";
import { Link } from "react-router-dom";

// Firebase Data....................
import { auth, db } from "../../firebaseConfig/Firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";


// FontAwesome Icon............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeed, faLink, faMessage } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    const getDataFromFirebase = async () => {
      try {
        const userCollection = collection(db, "users");
        const querySnapshot = await getDocs(userCollection);
        querySnapshot.forEach((doc) => {
          setData(doc.data());
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    getDataFromFirebase();
  }, []);
  console.log(data);


  return (
    <div className="userProfile">
      <div className="cover-photos">
        <img
          src="https://media.istockphoto.com/id/1497142422/photo/close-up-photo-portrait-of-young-successful-entrepreneur-businessman-investor-wearing-glasses.webp?a=1&b=1&s=612x612&w=0&k=20&c=YBSe3jKmA6zZgE5U2ojmXjWf6h-Oo2ocdpfL9qMOLao="
          alt=""
        />
      </div>
      <div className="profile-info">
        <img
          src={auth.currentUser.photoURL}
          alt=""
        />
        <div className="user-name">
          <h3>{data.username}</h3>
          <h5>{data.username}</h5>
        </div>
        <div className="profile-button">
          <Link to={"/chatbox/id"}>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faMessage}/>
          </button>
          </Link>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faFeed}/> Follow Me
          </button>
          <button className="btn">
            <FontAwesomeIcon icon={faLink}/>
          </button>
        </div>
        <p className="bio">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint deleniti velit obcaecati sapiente.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
