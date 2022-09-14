import MainBtn from "../components/UI/main-btn/MainBtn";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="homeTitle">
        My Financial <span>Operations</span>
      </div>
      <div className="homeBtns">
        <MainBtn
          title="My Operations"
          link="/my-operations"
          iconClass="fa-solid fa-money-bill-transfer"
        />
        <MainBtn
          title="Statistic"
          link="/statistic"
          iconClass="fa-solid fa-arrow-trend-up"
        />
        <MainBtn
          title="Add Operation"
          link="/add-operation"
          iconClass="fa-duotone fa-plus"
        />
      </div>
    </div>
  );
};

export default Home;
