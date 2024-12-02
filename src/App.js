import React from 'react';
import Chatbot from './components/Chatbot/Chatbot';
import Login from './components/login/Login';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AuthMiddleware from './middleware/authMiddleware';


function App() {
  return (
    <HashRouter>
      <Routes>
        {/* <Route exact path="/" element={
          <Login />
        } /> */}
       <Route
          path="/"
          element={
              <Chatbot />
            // <AuthMiddleware>
            // </AuthMiddleware>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
