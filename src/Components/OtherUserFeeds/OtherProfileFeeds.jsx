import "./otherprofilefeed.css";
import OtherProfileFeed from "./OtherProfileFeed";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
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
    const q = query(collection(db, "posts"), where("uid", "==", id));
    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      const dataArr = snapshot.docs.map((doc) => doc.data());
      setpostData(dataArr);
    });

    return () => {
      unsubscribePosts();
    };
  }, []);

  return (
    <div className="feeds">
      <OtherProfileFeed otherPost={postData} />
    </div>
  );
};

export default OtherProfileFeeds;
