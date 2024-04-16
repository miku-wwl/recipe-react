import { Link } from "react-router-dom";
import {useUserContext} from '../hooks/contextHooks';
import {useForm} from '../hooks/formHooks';
import {Credentials} from '../types/LocalTypes';

const LoginForm = () => {
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {username: '', password: ''};
  const doLogin = async () => {
    handleLogin(inputs as Credentials);
  };
  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <div className=" flex flex-col items-center gap-5 my-6 h-auto">
        <h3 className=" text-3xl text-center">Login</h3>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col py-6 px-5 border rounded bg-vanilla"
        >
          <div className=" flex flex-col mb-3">
            <label className="" htmlFor="loginUsername">
              Username:
            </label>
            <input
              className=" text-slate-950 w-96 m-3 rounded p-2 border-slate-500"
              name="username"
              type="text"
              id="loginUsername"
              onChange={handleInputChange}
              autoComplete="username"
            />
          </div>
          <div className=" flex flex-col mb-3">
            <label className=" p" htmlFor="loginpassword">
              Password
            </label>
            <input
              className=" text-slate-950 w-96 m-3 rounded p-2 border-slate-500"
              name="password"
              type="password"
              id="loginpassword"
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <button
            className="m-3 w-1/3 rounded-md bg-orange-wheel p-3 self-center hover:bg-light-orange"
            type="submit"
          >
            Login
          </button>
          <p className="h-full text-center px-0">
          No account? <Link to="/register" className="underline" >Register here</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
