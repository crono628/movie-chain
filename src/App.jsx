import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MovieDetail from './components/Detail/MovieDetail';
import PersonDetail from './components/Detail/PersonDetail';
import Home from './components/Home';

const App = () => {
  const [forChoice, setForChoice] = useState(null);
  const [choice, setChoice] = useState(null);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Home setChoice={setChoice} setForChoice={setForChoice} />}
      >
        <Route path="movie-detail" element={<MovieDetail />} />
        <Route
          path="person-detail"
          element={<PersonDetail queries={forChoice} choice={choice} />}
        />
        <Route
          path="*"
          element={
            <div style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
