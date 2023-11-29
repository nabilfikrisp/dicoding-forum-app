import useLogin from '@/hooks/api/useLogin';
import { LogOutIcon, MedalIcon, MessagesSquareIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const { isLoggedIn, logout } = useLogin();
  return (
    <div className="fixed bottom-0 h-[60px] w-[100vw] border-t bg-background">
      <div className="mx-auto flex h-full max-w-[800px] items-center justify-center gap-10 md:gap-14">
        <NavLink
          className={({ isActive }) =>
            [
              'flex flex-col items-center justify-center gap-1',
              isActive ? 'text-primary' : '',
            ].join(' ')
          }
          to="/"
        >
          <MessagesSquareIcon size="20px" />
          <small>Threads</small>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            [
              'flex flex-col items-center justify-center gap-1',
              isActive ? 'text-primary' : '',
            ].join(' ')
          }
          to="/leaderboard"
        >
          <MedalIcon size="20px" />
          <small>Leaderboard</small>
        </NavLink>
        {isLoggedIn && (
          <div
            className="flex flex-col items-center justify-center gap-1"
            onClick={() => {
              logout();
            }}
          >
            <LogOutIcon size="20px" />
            <small>Logout</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
