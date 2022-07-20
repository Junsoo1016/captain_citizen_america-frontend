import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Login from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
import UserProfile from './UserProfile/UserProfile';
import { io } from 'socket.io-client';

function App() {

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([])


  const getUserData = async () => {
    try {
      const response = await axios.get('https://captain-citizen-america.herokuapp.com/users');
      setUserData(response.data);
      setIsLoading(false);
    }
    catch (error) {
      setIsError(true);
    }
  }

  useEffect(() => {
    getUserData();
  }
  , []);

  const user = userData[4];



  const navigate = useNavigate()
  const location = useLocation();
  
  // const [user, setUser] = useState(userData[2]);


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

  // const validateLogin = () => {

  //   const userSignIn = userData.find(
  //     (user) => user.user_id === loginForm.user_id
  //   );
  //   if (userSignIn.password === loginForm.password) {
  //     console.log('welcome');
  //     axios
  //       .put(
  //         `https://captain-citizen-america.herokuapp.com/users/${user.id}`,
  //         {
  //           login: true,
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //         setUser(res.data);
  //       });
  //   } else {
  //     alert('The password you’ve entered is incorrect.');
  //   }
  // };

  const [signUpForm, setSignUpForm] = useState(null)

  const handleSignUp = (e) => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = () => {
    axios
      .post(
        'https://captain-citizen-america.herokuapp.com/users/',
        signUpForm
      )
      .then((res) => {
        let oldArray = [...userData];
        oldArray.push(res.data);
        setUserData(oldArray);
      });
  };
  
  const [login, setLogin] = useState(false);
  // console.log(userData);

  return (
    <div className="App">
      <nav>
      {login ? 
       <Nav user={user} setNotifications={setNotifications}/>
       : null }
      </nav>

      <main>
        <Routes>
          <Route 
            path="/home" 
            element={
            <Home className='home' userData={userData} socket={socket} user={user} setNotifications={setNotifications} />
            } 
          />
          <Route
            path='/'
            element={
              <Login className='login' handleLogin={handleLogin} setLogin={setLogin}/>
            }
          />
          <Route
            path='sign-up'
            element={
              <SignUp handleSignUp={handleSignUp} createUser={createUser} />
            }
          />
          <Route
            path='user-profile'
            element={<UserProfile user={user}/>
          }
          />
          </Routes>
      </main>

    </div>
  );
}

export default App;
