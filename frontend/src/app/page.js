import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";

export default function Home() {
  return (
    <div className="h-screen bg-white">
      <Navbar/>
      <SideBar/>
    </div>
  );
}
