import {H1} from '../../components/Typography'

export default function ShopHeader() {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center">
        <div className="content-center px-20">
          <div>
            <H1 >
              Welcome Adventurer!
            </H1>
          </div>
          <div>
            <blockquote className="italic text-muted-foreground">
              You’ve entered the Quest Shop! Grab yourself some rare and unique
              items. The higher the rarity, the more impressive it will be to
              show off to others. Collect the finest gear and let everyone see
              the fruits of your hard work!
            </blockquote>

          </div>
        </div>
        <div className="flex justify-center px-5 py-5 mr-5">
          <img
            src="https://media.tenor.com/rI_0O_9AJ5sAAAAi/nyan-cat-poptart-cat.gif"
            alt="Cat.gif"
            className="w-full max-w-xs md:max-w-md lg:max-w-lg h-48"
          />
        </div>
      </div>
    </div>
  );
}
