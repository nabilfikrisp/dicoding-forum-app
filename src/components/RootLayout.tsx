import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const RootLayout = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] flex-col pb-[60px] overflow-x-hidden">
      <div className="flex-grow pb-[60px]">
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
};

export default RootLayout;
