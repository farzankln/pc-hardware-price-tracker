import HeroSlider from "./components/HeroSlider";
import CategoryGrid from "./components/CategoryGrid";
import SpecialOffers from "./components/SpecialOffers";

export default function Home() {
  return (
    <div className="mx-auto">
      <HeroSlider />
      <CategoryGrid />
      <SpecialOffers />
    </div>
  );
}
