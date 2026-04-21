import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Layout from "./components/Layout/Layout.jsx";
import PsychologistsPage from "./pages/PsychologistsPage/PsychologistsPage.jsx"
import FavoritesPage from './pages/FavoritesPage/FavoritesPage.jsx'

import "./styles/index.css";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "theme-green";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div className="homeTop">
              <Header variant="home" theme={theme} setTheme={setTheme} />
              <Hero />
            </div>
          }
        />
        <Route element={<Layout theme={theme} setTheme={setTheme} />}>
          <Route path="/psychologists" element={<PsychologistsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;