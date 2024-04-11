import { User, UserWithNoPassword } from "./DBTypes";
export type Credentials = Pick<User, 'username' | 'password'>;


export type AuthContextType = {
  // 指定要使用的上下文值
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};
