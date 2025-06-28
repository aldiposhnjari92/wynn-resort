import { Outlet } from "react-router";
import Navigation from "./components/Navigation";
import NewsLetter from "./components/NewsLetter";
import Footer from "./components/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Navigation />
      <main className="flex flex-col flex-grow">
        <Outlet />
      </main>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default RootLayout;
