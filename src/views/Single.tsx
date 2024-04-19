import {NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import Likes from '../components/Likes';
import Comments from '../components/Comments';

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  console.log('single state', state);
  const item: MediaItemWithOwner = state;

  const isMp4 = (str: string): boolean => {
    return str.endsWith('.mp4');
  };

  return (
    <>
      <div className=" flex flex-col p-4">
        <br />
        {isMp4(item.filename) ? (
          <video
            controls
            src={
              import.meta.env.VITE_RECIPE + '/recipe/images/' + item.filename
            }
          ></video>
        ) : (
          <img
            className="max-h-[70vh] rounded-lg border object-cover"
            src={
              import.meta.env.VITE_RECIPE + '/recipe/images/' + item.filename
            }
            alt={item.title}
          />
        )}
        <h3 className=" m-5 text-center font-serif text-4xl font-bold text-fire-engine-red">
          {item.title}
        </h3>
        <div className=" mb-5 text-xl">
          <h4 className=" mb-2 text-2xl font-medium  text-red-950">Author</h4>
          <p>{item.username}</p>
          <p>{new Date(item.created_at).toLocaleString('zh-CN')}</p>
        </div>
        <div className=" mb-5 text-xl">
          <div className=" mb-2 flex">
            <div className=" mr-6">
              <img
                className=" mr-2 inline h-8 w-8"
                src="icons8-clock-50.png"
                alt="clock"
              />
              <span className="inline">{item.cook_time}</span>
            </div>
            <div>
              <img
                className=" mr-2 inline h-8 w-8"
                src="icons8-person-64.png"
                alt="person"
              />
              <span className="inline">{item.serving}</span>
            </div>
          </div>
          <h4 className=" mb-2 text-2xl  font-medium text-red-950">
            Ingredients
          </h4>
          <p>{item.ingredients}</p>
        </div>
        <div className=" mb-5 text-xl">
          <h4 className=" mb-2 text-2xl  font-medium text-red-950">
            Instruction
          </h4>
          <p>{item.instruction}</p>
        </div>
        <Likes recipeItem={item} />
        <Comments recipeItem={item} />
        <button
          className=" my-2 h-10 w-28 self-center rounded-md bg-orange-wheel p-3 hover:bg-light-orange"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default Single;
