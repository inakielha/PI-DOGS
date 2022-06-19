import './App.css';
import { Route, Routes, } from 'react-router-dom';
import FirstPage from './components/Initial_Page/FirstPage/FirstPage';
import PrincipalRoute from './components/PrincipalRoute/PrincipalRoute';
import DetailCard from './components/DogDetail/DetailCard/DetailCard';
import CreateDog from './components/CreateDog/CreateDog';
import "normalize.css"
import About from './components/About/About';
import Navbar from './components/PrincipalRoute/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<FirstPage/>} />
        {/* <Route path="/home" element= {<Navbar/>}/> */}
        <Route exact path='/home' element={<PrincipalRoute/>} />
        <Route path="/home/:id" element={<DetailCard/>}/>
        <Route path='createDog' element={<CreateDog/>}/>
        <Route path='about' element= {<About/>} />
      </Routes>
    </div>
  );
}

export default App;
