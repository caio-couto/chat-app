/* import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ServerList from "./components/ServerList";
import Layout from './components/Layout/index';
import './styles/globalStyles.module.css';
/* import ServerBar from './components/ServerBar'; */

function App() 
{
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Layout/>}/>
      </Routes>
    </Router>
  );
}

export default App;
