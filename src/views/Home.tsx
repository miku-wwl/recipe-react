import RecipeRow from '../components/MediaRow';
import {useRecipe} from '../hooks/apiHooks';

const Home = () => {
  const {recipeArray} = useRecipe();
  return (
    <>
      <h2 className=" text-3xl text-center my-3">Recipes</h2>
      <div className="grid grid-cols-media gap-2"></div>
      {recipeArray.map((item) => (
        <RecipeRow key={item.media_id} item={item} />
      ))}

      <div className="h-24">
      </div>
    </>
  );
};

export default Home;
