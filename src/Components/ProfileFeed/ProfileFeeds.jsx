import "./profileFeed.css";
import ProfileFeed from "./ProfileFeed";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig/Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const ProfileFeeds = () => {
  const [postsData, setPostsData] = useState([]);
  const [userData, setUserData] = useState({});
  const userID = auth.currentUser.uid;

  useEffect(() => {
    // Get user data from Firebase
    const unsubscribeUser = onSnapshot(collection(db, "users"), (snapshot) => {
      const userDoc = snapshot.docs.find((doc) => doc.id === userID);
      if (userDoc) {
        setUserData(userDoc.data());
      }
    });

    // Get posts Data From Firebase
    const unsubscribePosts = onSnapshot(
      query(collection(db, "posts"), where("uid", "==", userID)),
      (snapshot) => {
        const dataArr = snapshot.docs.map((doc) => doc.data());
        setPostsData(dataArr);
      }
    );

    return () => {
      unsubscribeUser();
      unsubscribePosts();
    };
  }, [userID]);

  const updatedPostsData = postsData.map((post) => ({
    ...post,
    userImg: userData.profileImg,
    username: userData.fullName,
  }));

  return (
    <div className="feeds">
      <ProfileFeed postData={updatedPostsData} />
    </div>
  );
};

export default ProfileFeeds;
