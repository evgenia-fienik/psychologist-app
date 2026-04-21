import {Outlet} from 'react-router-dom';
import Header from  '../Header/Header.jsx';


export default function Layout({ theme, setTheme }) {
  return (
    <>
      <Header variant="default" theme={theme} setTheme={setTheme} />
      <Outlet />
    </>
  );
}

