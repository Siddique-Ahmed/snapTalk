import "./stories.css";

// ..............
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// FakeApis...............
import userStories from "../../FackApis/StoriesData";

// Components..............
import UserStory from "./UserStory";

const Stories = () => {
  return (
    <div className="stories">
      <UserStory />

      <Swiper style={{ width: "80%" }} slidesPerView={4} spaceBetween={10}>
        {userStories.map((story) => (
          <SwiperSlide key={story.id}>
            <div className="story" key={story.id}>
              <div className="user">
                <img
                  src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
              </div>
              <img
                src="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
              <h5>{story.name}</h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Stories;
