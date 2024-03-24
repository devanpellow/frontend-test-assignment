import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="dark:bg-simbase-blue dark:bg-opacity-80 py-4 sm:py-6 md:py-8 md:pb-20  transition-colors duration-200 ease-in-out">
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
