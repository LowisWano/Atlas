import { H1 } from "../../../components/Typography";

export default function ShopHeader() {
  return (
    <div>
      <div>
        <div>
          <H1>Adventurer's Shop</H1>
        </div>
        <div>
        <blockquote className="hidden md:block italic text-base text-muted-foreground mt-2">
        You've entered the Quest Shop! Grab yourself some rare and unique
        items. The higher the rarity, the more impressive it will be to show
        off to others. Collect the finest gear and let everyone see the
        fruits of your hard work!
      </blockquote>
        </div>
      </div>
    </div>
  );
}