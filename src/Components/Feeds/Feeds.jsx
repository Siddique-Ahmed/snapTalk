import "./feeds.css";

// Components...............
import Feed from "./Feed";

// Firebase Data.................
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig/Firebase";
import { useEffect, useState } from "react";

const Feeds = () => {

  const [getPosts, setGetPosts] = useState([])
  const arr = []

  const getPostsFunc = async() => {
    const postsColection  = collection(db, 'posts')
    const querySnapshot = await getDocs(postsColection);
    querySnapshot.forEach((doc) => {
      if(arr.length < querySnapshot.size){
        arr.push(doc.data())
      }
    });
    setGetPosts(arr)
  }

  useEffect(() => {
    getPostsFunc()
  },[])

  return (
    <div className="feeds">
      {getPosts.length > 0 ? (
        getPosts.map((data,index) => <Feed data={data} key={index} />)
      ) : (
        <p> no post avialable</p>
      )}
    </div>
  );
};

export default Feeds;
