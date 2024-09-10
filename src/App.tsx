import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NotesList from './components/NotesList';
import PrivateRoute from './components/PrivateRoute';
const App: React.FC = () => {
  return (<>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/notes"
            element={<PrivateRoute element={<NotesList />} />}
          />
          <Route path="/" element={<h1>Welcome to the Notes App</h1>}/>
        </Routes>
      </div>
    </Router>

    </>
  );
};

export default App;
