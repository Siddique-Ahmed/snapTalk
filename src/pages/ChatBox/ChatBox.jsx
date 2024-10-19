import "./chatBox.css";
import userIcon from "../../../public/img/user-dp.jpeg";

// Components.............
import Stories from "../../Components/Stories/Stories";

// Font Awesome Icon................
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/Firebase";

const ChatBox = () => {
  const { id } = useParams();
  const [otherData, setOthersData] = useState([]);

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

  return (
    <>
      <Stories />
      <div className="chat-box">
        {otherData.map((data, ind) => {
          return (
            <div className="chat-box-top">
              <img src={data.profileImg ? data.profileImg :userIcon} alt="" />
              <div className="user-name">
                <h3>{data.fullName}</h3>
                <h5>{data.username}</h5>
              </div>
            </div>
          );
        })}
        <div className="chat-box-bottom">
          <form action="#">
            <input type="text" placeholder="Write Something" />
            <button type="submit" className="btn btn-primary">
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </button>
            <label className="btn btn-primary" htmlFor="CFile">
              <FontAwesomeIcon icon={faFileAlt} />
              <input type="file" id="CFile" />
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
