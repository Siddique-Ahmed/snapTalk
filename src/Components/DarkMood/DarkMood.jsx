import { useContext } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// FontAwesome Icons..............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// context..............
import { moodChangeContext } from "../../Context/DarkMoodContext";

const DarkMood = () => {
  const { changeMood, handleChangeMood } = useContext(moodChangeContext);
  return (
    <div className="dark-mood-icon">
      <FontAwesomeIcon
        icon={changeMood == "dark" ? faSun : faMoon}
        onClick={handleChangeMood}
      />
    </div>
  );
};

export default DarkMood;
