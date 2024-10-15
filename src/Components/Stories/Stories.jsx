import "./stories.css";
import userIcon from "../../../public/img/user-dp.jpeg"
import userBG from "../../../public/img/bg-cover.png"

// ..............
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Components..............
import UserStory from "./UserStory";

const Stories = () => {
  return (
    <div className="stories">
      <UserStory />

      <Swiper style={{ width: "80%" }} slidesPerView={4} spaceBetween={10}>
          <SwiperSlide>
            <div className="story">
              <div className="user">
                <img
                  src={userIcon}
                  alt=""
                />
              </div>
              <img
                src={userBG}
                alt=""
              />
              <h5>Siddique</h5>
            </div>
          </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Stories;
