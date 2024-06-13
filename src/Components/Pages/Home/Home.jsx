import Banner from "../../Shared/Banner/Banner";
import Cattering from "../../Shared/Cattering/Cattering";
import SpecialMenu from "../../Shared/Menu/SpecialMenu";
import OnlineOrder from "../../Shared/OnlineOrder/OnlineOrder";
import Packages from "../Packages/Packages";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="h-24 bg-gray-300"></div>
      <SpecialMenu />
      <div className="h-24 bg-gray-300"></div>
      <OnlineOrder />
      <div className="h-24 bg-gray-300"></div>
      <Cattering />
      <div className="h-24 bg-gray-300"></div>
      <Packages/>

    </div>
  );
};

export default Home;
