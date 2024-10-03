import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import "./darkMood.css";

// FontAwesome Icons..............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const darkHandle = ()=>{
  document.querySelector("body").classList.toggle("darkmood");
}

const DarkMood = () => {
  return (
    <div className="dark-mood-icon">
      <FontAwesomeIcon icon={faLightbulb} onClick={darkHandle} />
    </div>
  );
};

export default DarkMood;
