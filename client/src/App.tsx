
import './App.css'
import Sidebar from './components/Sidebar/Sidebar';
import MainView from './pages/MainView/MainView';

function App() {

  return (
    <div className='main-container'>
        <Sidebar />
        <MainView />
    </div>
  )
}

export default App
