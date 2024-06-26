import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyCameras from './pages/MyCameras';
import Login from './pages/Login';
import Signup from './pages/Signup';
import IsPrivate from './components/isPrivate';
import IsAnon from './components/isAnon';
import Footer from './components/Footer';
import CameraDetails from './pages/CameraDetails';

import { Container } from '@chakra-ui/react';

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
          path="/cameras/:cameraId"
          element={
            <IsPrivate>
              <CameraDetails />
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
