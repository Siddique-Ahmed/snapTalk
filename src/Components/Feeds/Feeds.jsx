import "./feeds.css";

// Components...............
import Feed from "./Feed";

// FakeApis.................
import HomeFeeds from "../../FackApis/HomeFeed";

const Feeds = () => {
  return (
    <div className="feeds">
      {HomeFeeds.map((fed) => (
        <Feed fed={fed} key={fed.id} />
      ))}
    </div>
  );
};

export default Feeds;
