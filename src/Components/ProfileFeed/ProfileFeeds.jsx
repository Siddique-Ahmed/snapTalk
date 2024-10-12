import "./profileFeed.css";
import ProfileFeed from "./ProfileFeed";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig/Firebase";
import { toast } from "react-toastify";

const ProfileFeeds = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const getPostDataForUser = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const q = query(
          postsCollection,
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        const posts = []; // Array banaya store karne ke liye

        querySnapshot.forEach((doc) => {
          posts.push(doc.data()); 
        });

        setPostData(posts);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };

    getPostDataForUser();
  }, []);

  return (
    <div className="feeds">
      {postData.length > 0 ? (
        postData.map((post, index) => (
          <ProfileFeed key={index} postData={post} />
        ))
      ) : (
        <p>No posts to show</p>
      )}
    </div>
  );
};

export default ProfileFeeds;
