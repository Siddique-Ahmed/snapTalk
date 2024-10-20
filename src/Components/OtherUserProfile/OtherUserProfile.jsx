import "./otherUserProfile.css";
import { Link } from "react-router-dom";
import userLogo from "../../../public/img/user-dp.jpeg";
import bgCover from "../../../public/img/bg-cover.png";
import { auth, db } from "../../firebaseConfig/Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeed, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { arrayRemove, arrayUnion, doc, onSnapshot } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

const OtherUserProfile = ({ id }) => {
  const [otherData, setOthersData] = useState(null); // Initially null
  const [isFollowing, setIsFollowing] = useState(false); // Track follow state
  const currentUserID = auth.currentUser.uid;
  const otherUserID = id;

  useEffect(() => {
    const docRef = doc(db, "users", otherUserID);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setOthersData(data);

        // Check if the current user is already following the other user
        if (data.followers && data.followers.includes(currentUserID)) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, [otherUserID, currentUserID]);

  // follow user //
  const followUser = async () => {
    const followRef = doc(db, "users", otherUserID);
    const followingRef = doc(db, "users", currentUserID);
    try {
      await updateDoc(followRef, {
        followers: arrayUnion(currentUserID),
      });
      await updateDoc(followingRef, {
        following: arrayUnion(otherUserID),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // unfollow user //
  const unfollowUser = async () => {
    const followRef = doc(db, "users", otherUserID);
    const followingRef = doc(db, "users", currentUserID);
    try {
      await updateDoc(followRef, {
        followers: arrayRemove(currentUserID),
      });
      await updateDoc(followingRef, {
        following: arrayRemove(otherUserID),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!otherData) return <div>Loading...</div>;

  return (
    <div className="userProfile">
      <div className="cover-photos">
        <img
          src={otherData.bgImg ? otherData.bgImg : bgCover}
          alt="Background"
        />
      </div>
      <div className="profile-info">
        <img
          src={otherData.profileImg ? otherData.profileImg : userLogo}
          alt="Profile"
        />
        <div className="user-name">
          <h3>{otherData.fullName}</h3>
          <h5>{otherData.username}</h5>
        </div>
        <div className="profile-button">
          {isFollowing ? (
            <>
              <Link to={`/chatbox/${id}`}>
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faMessage} /> Message
                </button>
              </Link>
              <button onClick={unfollowUser} className="btn">
                <FontAwesomeIcon icon={faFeed} /> Following
              </button>
            </>
          ) : (
            <button onClick={followUser} className="btn btn-primary">
              <FontAwesomeIcon icon={faFeed} /> Follow Me
            </button>
          )}
        </div>
        <div className="profile-button">
          <button className="btn">
            <p>{otherData.followers.length}</p>
            <h4>Followers</h4>
          </button>
          <button className="btn">
            <p>{otherData.following.length}</p>
            <h4>Following</h4>
          </button>
        </div>
        <p className="bio">{otherData.bio}</p>
      </div>
    </div>
  );
};

export default OtherUserProfile;
