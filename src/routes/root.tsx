import Routes from "../components/routes";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const RootRoute = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <Outlet />
      </QueryClientProvider>
    </div>
  );
};

export default RootRoute;
