import './App.css';

// Import components
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Toaster } from 'react-hot-toast';

// Import pages
import Main from './pages/Main'
import UploadData from './pages/UploadData'
import MatchStudent from './pages/MatchStudent'
import PrepareEmail from './pages/PrepareEmail'
import Settings from './pages/Settings'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

// Import React Router 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <div className="App d-flex">

          <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", overflowY: "hidden" }}>
            {/* Toaster */}
            <Toaster />

            {/* NavBar */}
            <NavBar />

            {/* Route the different pages */}
            <Routes>
              <Route path='/' element={<Navigate to={"/Main"} />} />
              <Route path='*' element={<Navigate to={"/Main"} />} />
              <Route path='/Main' element={<Main />} />
              <Route path='/Upload_Data' element={<UploadData />} />
              <Route path='/Match_Student' element={<MatchStudent />} />
              <Route path='/Prepare_Email' element={<PrepareEmail />} />
              <Route path='/Settings' element={<Settings />} />
            </Routes>
          </div>
        </div>

        {/* Footer */}
        <Footer />
    </div>
  );
}

export default App;
