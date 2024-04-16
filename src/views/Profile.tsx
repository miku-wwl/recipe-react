import {useUserContext} from '../hooks/contextHooks';
import LogoutButton from "../components/LogoutButton";

const Profile = () => {
  // //用户保存在上下文中，只是获取用户状态
  const {user} = useUserContext();
  console.log('Profile:user', user);
  return (
    <>
      <div className=" bg-white p-4 relative">
        <h2 className="text-3xl my-4">Profile</h2>
        {user && (
          <div className="">
            <div>
              <p>Username: {user.username}</p>
              <p>E-mail: {user.email}</p>
              <p>Created: {new Date(user.created_at).toLocaleDateString('zh-CN')}</p>
            </div>
            <div className=" absolute top-8  right-4">
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
      <div className=" h-96">

      </div>
    </>
  );
};

export default Profile;
