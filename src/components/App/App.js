import React, { useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../../components/Header/Header";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import Movies from "../../components/Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound404 from "../NotFound404/NotFound404";
import Menu from "../Menu/Menu";
import { useEffect } from "react";
import { CurrentUserContext } from '../../context/CurrentUserContext';

function App() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isShowMenu ? "hidden" : "";
  }, [isShowMenu]);

  useEffect(() => {
    setIsShowMenu(false);
  }, [location]);

  const [isReg, setIsReg] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const history = useHistory();

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLoginSubmit() {
    handleLogin();
    history.push("/movies");
  }

  function handleRegisterSubmit() {
    setIsReg(true);
    history.push("/signin");
  }

  function handleExit() {
    setIsLoggedIn(false);
    history.push("/signin");
  }

  return (
    <>
    <CurrentUserContext.Provider value={{ isLoggedIn }}>
      <Switch>
        <Route path="/" exact>
          <Header isLoggedIn={setIsLoggedIn} />
          <Main />
          <Footer />
        </Route>

        <Route path="/movies">
          <HeaderLogin setIsShowMenu={setIsShowMenu} />
          <Movies />

          <Footer />
        </Route>

        <Route path="/saved-movies">
          <HeaderLogin setIsShowMenu={setIsShowMenu} />
          <SavedMovies />
          <Footer />
        </Route>

        <Route path="/profile">
          <HeaderLogin setIsShowMenu={setIsShowMenu} />
          <Profile isLoggedIn={isLoggedIn} handleLogin={handleLogin} onExit={handleExit} />
        </Route>

        <Route path="/signup">
          <Register isReg={isReg} handleLogin={handleLogin} onSubmit={handleRegisterSubmit} />
        </Route>

        <Route path="/signin" exact>
          <Login handleLogin={handleLogin} onSubmit={handleLoginSubmit} />
        </Route>

        <Route path="/*">
          <NotFound404 />
        </Route>
      </Switch>
      <Menu isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
