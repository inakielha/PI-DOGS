import './App.css';
import { Route, Routes, } from 'react-router-dom';
import FirstPage from './components/Initial_Page/FirstPage/FirstPage';
import PrincipalRoute from './components/PrincipalRoute/PrincipalRoute';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<FirstPage/>} />
        <Route exact path='/dogs' element={<PrincipalRoute/>} />
      </Routes>
    </div>
  );
}

export default App;
