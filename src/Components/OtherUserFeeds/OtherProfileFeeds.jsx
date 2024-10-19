import "./otherprofilefeed.css";
import OtherProfileFeed from "./OtherProfileFeed";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/Firebase";

const OtherProfileFeeds = ({ id }) => {
  const [otherData, setOthersData] = useState([]);
  const [postData, setpostData] = useState([]);

  useEffect(() => {
    const fetchOthersData = async () => {
      try {
        const otherPostData = [];
        const docRef = doc(db, "users", id);
        await getDoc(docRef).then((data) => {
          otherPostData.push(data.data());
        });
        setOthersData(otherPostData);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    fetchOthersData();
  }, []);

  useEffect(() => {
    const fetchingPosts = async () => {
      const postRef = collection(db, "posts");
      const dataFetched = await getDocs(postRef);
      const postArr = [];
      dataFetched.forEach((data) => {
        if (data.data().uid === id) {
          postArr.push(data.data());
        }
      });
      setpostData(postArr);
    };
    fetchingPosts();
  }, []);

  return (
    <div className="feeds">
      <OtherProfileFeed otherPost={postData} />
    </div>
  );
};

export default OtherProfileFeeds;
