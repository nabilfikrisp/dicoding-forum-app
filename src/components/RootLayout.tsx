import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const RootLayout = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] flex-col overflow-x-hidden pb-[60px]">
      <div className="flex-grow pb-[60px]">
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
};

export default RootLayout;
