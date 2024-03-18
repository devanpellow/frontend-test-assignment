import clsx from "clsx";
import { NavLink } from "react-router-dom";

const routes = [
  { name: "Home", path: "/" },
  { name: "Favorites", path: "/favorites" },
];

const Routes = () => {
  // Implement active styling for the current route
  return (
    <div className="flex py-5  border shadow-md ">
      <div className="container mx-auto flex space-x-4 ">
        {routes.map((route, idx) => {
          return (
            <NavLink
              key={idx}
              to={route.path}
              className={({ isActive }) =>
                clsx(
                  isActive &&
                    "underline-offset-4 decoration-simbase-orange-500 underline",
                  "text-xl font-bold text-simbase-blue-950 underline-offset-4 hover:underline hover:decoration-simbase-orange-500"
                )
              }
            >
              {route.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Routes;
