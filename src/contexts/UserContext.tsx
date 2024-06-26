import React, {createContext, useState} from 'react';
import {AuthContextType, Credentials} from '../types/LocalTypes';
import {UserWithNoPassword} from '../types/DBTypes';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router-dom';
import {LoginResponse} from '../types/MessageTypes';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {getUserByToken} = useUser();
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials: Credentials) => {
    try {
      // post login credentials to API, set token to local storage
      // set user to state, navigate to home
      const loginResult: LoginResponse = await postLogin(credentials);
      if (loginResult) {
        if ('token' in loginResult && 'user' in loginResult) {
          localStorage.setItem('token', loginResult.token);
          localStorage.setItem('user_id', loginResult.user.user_id.toString());
          setUser(loginResult.user);
        }
      }
      alert(loginResult.message);
      navigate('/');
    } catch (e) {
      // 如果返回errMsg， 会报出类似异常：Cannot use 'in' operator to search for 'token' in 用户名或密码不正确
      alert('用户名或密码不正确');
    }
  };

  const handleLogout = () => {
    try {
      // remove token from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      // set user to null
      setUser(null);
      // navigate to home
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
      alert((e as Error).message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      // get token from local storage
      // if token exists, get user data from API
      const token = localStorage.getItem('token');
      if (token) {
        const userResponse = await getUserByToken(token);
        // set user to state
        setUser(userResponse.user);
        // when page is refreshed, the user is redirected to origin (ProtectedRoute.tsx)
        // when user in the proteccted route and refresh the page they can be redirected to the same page
        // access the state in history state (ProtectedRoute.tsx)
        const origin = location.state.from.pathname || '/';
        console.log('location', location);
        navigate(origin);
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
