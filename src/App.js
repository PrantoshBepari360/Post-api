import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Home, PostDetails } from './pages';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="post/:id" element={<PostDetails />} />
      </Routes>
    </>
  );
};

export default App;
