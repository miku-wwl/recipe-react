import {NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import {MediaItem} from '../types/DBTypes';

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  console.log('single state', state);
  const item: MediaItem = state;
  return (
    <>
      <h3>{item.title}</h3>
      <br/>
      {item.media_type?.includes('video') ? (
        <video controls src="{item.filename}"></video>
      ) : (
        <img
          src={import.meta.env.VITE_RECIPE + '/recipe/images/' + item.filename}
          alt={item.title}
        />
      )}
      <br/>
      <p>{item.description}</p>
      <br/>
      <p>{item.ingredients}</p>
      <br/>
      <p>{item.instruction}</p>
      <br/>
      <p>{new Date(item.created_at).toLocaleString('zh-CN')}</p>
      <br/>
      <p>{item.filesize}</p>
      <br/>
      <p>{item.media_type}</p>
      <br/>
      <button className=" w-28 h-10 my-2 rounded-md bg-orange-wheel p-3 self-center hover:bg-light-orange"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
      <br/>
      <br/>
      <br/>
    </>
  );
};

export default Single;
