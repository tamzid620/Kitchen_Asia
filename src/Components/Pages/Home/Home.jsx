import Banner from "../../Shared/Banner/Banner";
import Cattering from "../../Shared/Cattering/Cattering";
import SpecialMenu from "../../Shared/Menu/SpecialMenu";
import OnlineOrder from "../../Shared/OnlineOrder/OnlineOrder";
import Packages from "../Packages/Packages";

const Home = () => {
  return (
    <div>
      <Banner />
      <SpecialMenu />
      <OnlineOrder />
      <Cattering />
      <Packages/>

    </div>
  );
};

export default Home;
