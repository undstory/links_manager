
import { Route, Routes } from 'react-router';
import './App.css'
import Sidebar from './components/Sidebar/Sidebar';
import DashboardPage from './pages/Dashboard/DashboardPage';
import LinksPage from './pages/Links/LinksPage';
import { PATHS } from './constants/paths';
import ToReadPage from './pages/ToRead/ToReadPage'
import FavoritePage from './pages/Favorite/FavoritePage';

function App() {

  return (
    <div className='main-container'>
        <Sidebar />
        <Routes>
          <Route path={PATHS.DASHBOARD} element={<DashboardPage />} />
          <Route path={PATHS.LINKS} element={<LinksPage />} />
          <Route path={PATHS.TO_READ} element={<ToReadPage />} />
          <Route path={PATHS.FAVORITE} element={<FavoritePage />} />
        </Routes>
    </div>
  )
}

export default App
