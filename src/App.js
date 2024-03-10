import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomeScreen from './Screens/Home/HomeScreen';
import LoginLogout from './Screens/Login/LoginLogout';
import SignUpScreen from './Screens/SignUp/SignUpScreen';
import ProfileScreen from './Screens/Profile/ProfileScreen';
import Favorite from './Screens/Favourite/Favorite';
import WatchList from './Screens/Watchlist/WatchList';
import { Provider } from 'react-redux';
import store from './store/Store';
import MovieDetail from './Screens/MovieDetails/MovieDetail';
import NavbarScreen from './Screens/NavScreen/NavbarScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// https://api.themoviedb.org/3/movie/now_playing?api_key=59002511c086d7be02536c9e73b1568b
function App() {


  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <ToastContainer />
          <NavbarScreen />
          <Routes>

            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginLogout />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/favourite" element={<Favorite />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/Profile" element={<ProfileScreen />} />

          </Routes>

        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
