import "./feeds.css";
import Feed from "./Feed";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig/Firebase";
import { useEffect, useState } from "react";

const Feeds = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsCollection = collection(db, "posts");

    // Realtime listener using onSnapshot
    const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="feeds">
      {posts.length > 0 ? (
        posts.map((post, index) => <Feed data={post} key={index} />)
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Feeds;
