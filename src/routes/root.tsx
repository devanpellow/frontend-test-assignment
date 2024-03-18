import Routes from "../components/routes";
import { Outlet } from "react-router-dom";

const RootRoute = () => {
  return (
    <div>
      <Routes />
      <Outlet />
    </div>
  );
};

export default RootRoute;
