import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  // //用户保存在上下文中，只是获取用户状态
  const {user} = useUserContext();
  console.log('Profile:user', user);
  return (
    <>
      <h2>Profile page</h2>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>
            Created: {new Date(user.created_at).toLocaleDateString('zh-CN')}
          </p>
        </>
      )}
    </>
  );
};

export default Profile;
