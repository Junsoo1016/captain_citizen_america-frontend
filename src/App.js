import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Login from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
import UserProfile from './UserProfile/UserProfile';

function App() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [login, setLogin] = useState(false);

  const location = useLocation();

  const getUserData = async () => {
    try {
      const response = await axios.get('https://captain-citizen-america.herokuapp.com/users');
      setUserData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const user = userData[4]; // 임시 사용자 선택

  const [loginForm, setLoginForm] = useState({
    user_id: '',
    password: '',
  });

  const handleLogin = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const [signUpForm, setSignUpForm] = useState(null);

  const handleSignUp = (e) => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async () => {
    try {
      const response = await axios.post(
        'https://captain-citizen-america.herokuapp.com/users/',
        signUpForm
      );
      setUserData((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // 숨길 경로 설정
  const hideHeaderPaths = ['/', '/sign-up'];

  return (
    <div className="App">
      {/* 조건부 네비게이션 */}
      {!hideHeaderPaths.includes(location.pathname) && login && (
        <Nav user={user} setNotifications={setNotifications} />
      )}

      <main>
        <Routes>
          <Route
            path="/home"
            element={
              <Home
                className="home"
                userData={userData}
                user={user}
                setNotifications={setNotifications}
              />
            }
          />
          <Route
            path="/"
            element={
              <Login
                className="login"
                handleLogin={handleLogin}
                setLogin={setLogin}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <SignUp
                handleSignUp={handleSignUp}
                createUser={createUser}
              />
            }
          />
          <Route
            path="/user-profile"
            element={<UserProfile user={user} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
