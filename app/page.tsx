import HeroSlider from "./components/HeroSlider";
import CategoryGrid from "./components/CategoryGrid";
import SpecialOffers from "./components/SpecialOffers";
import CategoryRow from "./components/CategoryRow";
import { categories } from "./data/categories";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <CategoryGrid />
      <SpecialOffers />
      {categories.map((cat) => (
        <CategoryRow key={cat.slug} categorySlug={cat.slug} categoryName={cat.name} />
      ))}
    </div>
  );
}
