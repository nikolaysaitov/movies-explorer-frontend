import React, { useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";
// import Header from "../../components/Header/Header";
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
import { CurrentUserContext } from "../../context/CurrentUserContext";

function App() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsShowMenu(false);
  }, [location]);

  const [isReg, setIsReg] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    <CurrentUserContext.Provider value={{ isLoggedIn }}>
      <React.Fragment>
        <Switch>
          <Route path="/" exact>
            <HeaderLogin />
          </Route>

          <Route path="/movies">
            <HeaderLogin
              isLoggedIn={isLoggedIn}
              setIsShowMenu={setIsShowMenu}
            />
          </Route>

          <Route path="/saved-movies">
            <HeaderLogin
              isLoggedIn={isLoggedIn}
              setIsShowMenu={setIsShowMenu}
            />
          </Route>

          <Route path="/profile">
            <HeaderLogin setIsShowMenu={setIsShowMenu} />
          </Route>
        </Switch>

        <main className="main">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <Route path="/movies">
              <Movies />
            </Route>

            <Route path="/saved-movies">
              <SavedMovies />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/saved-movies">
              <Profile
                isLoggedIn={isLoggedIn}
                handleLogin={handleLogin}
                onExit={handleExit}
              />
            </Route>

            <Route path="/signup">
              <Register
                isReg={isReg}
                handleLogin={handleLogin}
                onSubmit={handleRegisterSubmit}
              />
            </Route>

            <Route path="/signin" exact>
              <Login handleLogin={handleLogin} onSubmit={handleLoginSubmit} />
            </Route>

            <Route path="/*">
              <NotFound404 />
            </Route>
          </Switch>
        </main>

        <Switch>
          <Route path="/">
            <Footer />
          </Route>

          <Route path="/movies">
            <Footer />
          </Route>

          <Route path="/saved-movies">
            <Footer />
          </Route>
        </Switch>
      </React.Fragment>
      <Menu isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
    </CurrentUserContext.Provider>
  );
}

export default App;
