import {useEffect, useReducer, useRef} from 'react';
import {useCommentContext, useUserContext} from '../hooks/contextHooks';
import {useForm} from '../hooks/formHooks';
import {MediaItemWithOwner, Comment} from '../types/DBTypes';
import {useComment} from '../hooks/apiHooks';
import CommentEditForm from './CommentEditForm';

const Comments = (props: {recipeItem: MediaItemWithOwner}) => {
  const {commentState, commentDispatch, getComments} = useCommentContext();
  const {recipeItem} = props;
  const {user} = useUserContext();
  const formRef = useRef<HTMLFormElement>(null);

  const {getCommentsByMediaId, postComment, deleteCommentById} = useComment();
  console.log('comment state', commentState);

  const initValues = {comment_text: ''};

  useEffect(() => {
    getComments(recipeItem.media_id);
  }, []);

  const deleteComment = async (comment_id: number) => {
    const token = localStorage.getItem('token');
    if (!user || !recipeItem || !token) {
      return;
    }
    try {
      const deleteResult = await deleteCommentById(comment_id, token);
      console.log(deleteResult);
      // dispatch is already done in getComments func
      getComments(recipeItem.media_id);
    } catch (e) {
      console.log('delete comment error', (e as Error).message);
      commentDispatch({type: 'setComments', comments: undefined});
    }
  };

  const doComment = async () => {
    if (!user) {
      alert('Please sign in to comment!');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!recipeItem || !token) {
        return;
      }
      await postComment(
        inputs.comment_text,
        recipeItem.media_id,
        user.user_id,
        token,
      );

      const comments = await getCommentsByMediaId(recipeItem.media_id);
      if (formRef.current) {
        formRef.current.reset();
      }
      commentDispatch({type: 'setComments', comments: comments});
    } catch (e) {
      console.log('commit error', (e as Error).message);
    }
  };

  const {handleInputChange, handleSubmit, inputs} = useForm(
    doComment,
    initValues,
  );
  return (
    <div className=" mb-5 text-xl">
      <h4 className=" mb-3 text-2xl font-medium  text-red-950">
        <label className="" htmlFor="comment">
          Comments
        </label>
      </h4>
      <ul className=" ml-6">
        {commentState.comments &&
          commentState.comments.length > 0 &&
          commentState.comments.map((item) => (
            <li
              key={item.comment_id}
              className="mb-4  w-fit break-all rounded-xl border bg-slate-100 px-2 py-1"
            >
              <div className=" w-5/6">
                <p className=" font-medium">
                  {item.username}
                  <span className="text-base text-slate-500">
                    {' '}
                    on {new Date(item.created_at!).toLocaleDateString()}
                  </span>
                </p>
                <p>{item.comment_text}</p>
              </div>
              {item.user_id === user?.user_id &&
              item.comment_id &&
              item.comment_text ? (
                <>
                  <button className=" w-16 self-start text-right text-orange-wheel">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteComment(item.comment_id as number);
                    }}
                    className="ml-2 w-20 self-start text-right text-orange-wheel"
                  >
                    Delete
                  </button>

                  <CommentEditForm
                    commentId={item.comment_id}
                    commentText={item.comment_text}
                    recipeId={recipeItem.media_id}
                  />
                </>
              ) : null}
            </li>
          ))}
      </ul>

      <form onSubmit={handleSubmit} ref={formRef} className="ml-6 flex">
        <input
          className=" w-full border border-slate-500 p-4 text-slate-950 md:w-[50rem]"
          name="comment_text"
          type="text"
          id="comment"
          placeholder="Add Comment"
          onChange={handleInputChange}
        />
        <button
          className=" rounded bg-orange-wheel p-4 hover:bg-light-orange"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Comments;
