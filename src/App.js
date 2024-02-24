import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home'
import Menu from './components/Menu/Menu';
import Reservation from './components/Reservation/Reservation';
import About from './components/About/About';
import MenuProvider from './context/MenuProvider';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path:'/About',
    element:<About/>
  },
  {
    path:'/Menu',
    element:<Menu/>
  },
  {
    path:'/Reservation',
    element:<Reservation/>
  }
]);

function App() {
  return (
    <>
      <MenuProvider>
      <RouterProvider router={router} />
      </MenuProvider>
    </>
  );
}

export default App;
