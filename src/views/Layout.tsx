import {Link, Outlet} from 'react-router-dom';
import {useUserContext} from '../hooks/contextHooks';
import './Layout.css'

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();
  // check if there is a valid token when the app is load
  if (!user) {
    handleAutoLogin();
  }

  return (
    <>
      <header className="px-1.5 py-0 bg-white shadow-sm">
        <nav className="h-full flex items-center justify-between">
        <Link to="/" className="h-full text-center px-0 py-0">
          <img className="h-20 w-auto mr-2" src="recipe-sharing-logo-360-180.svg" alt="cook note" />
        </Link>
        <ul className="flex items-center text-sm font-medium uppercase tracking-wide">
         {user ? (
          <>
            <li className="mx-2">
              <Link to="/create" className="rounded-md px-3 py-1 hover:bg-gray-200 transition-colors">Create Recipe</Link>
            </li>
            <li className="mx-2">
              <Link to="/profile" className="rounded-md px-3 py-1 hover:bg-gray-200 transition-colors">Profile</Link>
            </li>
          </>
          ) : (
            <li className="mx-2">
              <Link to="/login" className="rounded-md px-3 py-1 hover:bg-gray-200 transition-colors">Log in</Link>
            </li>
          )}
          </ul>
        </nav>
      </header>
      <main className=" max-w-lg m-auto px-2 py-1">
        <Outlet />
      </main>
      <footer className="p-2.5 bg-prussian-blue fixed-footer">
        <p className=" text-white text-center">Weilai React+TS+Tailwind 2024</p>
      </footer>
    </>
  );
};

export default Layout;
