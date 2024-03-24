import clsx from "clsx";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";

const routes = [
  { name: "Home", path: "/" },
  { name: "Favorites", path: "/favorites" },
];

const Routes = () => {
  const queryClient = useQueryClient();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isDarkMode) {
    document.documentElement.classList.add("dark");
    queryClient.setQueryData(["theme"], "dark");
  } else {
    document.documentElement.classList.remove("dark");
    queryClient.setQueryData(["theme"], "light");
  }

  return (
    <div className="flex py-5 border-b shadow-md dark:bg-simbase-blue dark:border-simbase-blue dark:shadow-simbase-orange  transition-colors duration-200 ease-in-out">
      <div className="container mx-auto flex justify-between space-x-4">
        <div className="flex gap-4">
          {routes.map((route, idx) => {
            return (
              <NavLink
                key={idx}
                to={route.path}
                className={({ isActive }) =>
                  clsx(
                    isActive &&
                      "underline-offset-4 decoration-simbase-orange underline",
                    "text-xl font-bold text-simbase-blue dark:text-white underline-offset-4 hover:underline hover:decoration-simbase-orange-500"
                  )
                }
              >
                {route.name}
              </NavLink>
            );
          })}
        </div>
        <div>
          <Switch
            id="dark-mode-toggle"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className={`${
              isDarkMode ? "bg-simbase-orange" : "bg-gray-200"
            } relative inline-flex h-6 w-12 items-center rounded-full`}
          >
            <span className="sr-only">Enable dark mode</span>
            <span
              className={`${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              } transition`}
            >
              {isDarkMode ? "🐈" : "🐈‍⬛"}
            </span>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Routes;
