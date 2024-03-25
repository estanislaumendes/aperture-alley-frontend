import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyCameras from './pages/MyCameras';
import Login from './pages/Login';
import Signup from './pages/Signup';
import IsPrivate from './components/isPrivate';
import IsAnon from './components/isAnon';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/users/:userId"
          element={
            <IsPrivate>
              <MyCameras />
            </IsPrivate>
          }
        />

        <Route
          path="/login"
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
