import Navbar_landingpage from "../../components/navbar_landingpage";

import HeroSection from "../../components/herosection"; // sesuaikan dengan path file HeroSection

export default function Home() {
  return (
    <div className="h-screen bg-slate-700">
      <Navbar_landingpage />
      <HeroSection />
    </div>
    
  );
}
