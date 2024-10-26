import { H1 } from "../../../components/Typography";

export default function ShopHeader() {
  return (
    <div className="flex justify-center my-6 px-4 md:px-0">
      <div>
        <div>
          <H1>Welcome Adventurer!</H1>
        </div>
        <div>
          <blockquote className="italic text-muted-foreground">
            You’ve entered the Quest Shop! Grab yourself some rare and unique
            items. The higher the rarity, the more impressive it will be to show
            off to others. Collect the finest gear and let everyone see the
            fruits of your hard work!
          </blockquote>
        </div>
      </div>
    </div>
  );
}