import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import Likes from './Likes';

const RecipeRow = (props: {item: MediaItemWithOwner}) => {
  const {item} = props;

  const isMp4 = (str: string): boolean => {
    return str.endsWith('.mp4');
  };

  return (
    <div className="grid-rows-media-item grid">
      <Link to="/single" state={item}>
        <div className="h-full">
          {isMp4(item.filename) ? (
            <video
              controls
              src={
                import.meta.env.VITE_RECIPE + '/recipe/images/' + item.filename
              }
            ></video>
          ) : (
            <img
              src={
                item.thumbnail
                  ? import.meta.env.VITE_RECIPE +
                    '/recipe/images/' +
                    item.thumbnail
                  : 'https://placehold.jp/320x240.png'
              }
              alt={item.title}
              className=" object-cover "
            />
          )}
        </div>
      </Link>
      <div>
        <Link to="/single" state={item}>
          <h2 className=" text-xl font-medium">{item.title}</h2>
        </Link>
        <Likes recipeItem={item} />
      </div>
    </div>
  );
};

export default RecipeRow;
