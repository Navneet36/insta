import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import './Components/NavBar'
import NavBar from './Components/NavBar';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './Components/screens/Home';
import Profile from './Components/screens/Profile';
import Login from './Components/screens/Login';
import Signup from './Components/screens/Signup';
import Create_Post from './Components/screens/Create_Post';
import UserProfile from './Components/screens/UserProfile';
import { reducer,initialState } from './Reducers/userReducer'
export const UserContext= createContext()

const Routing = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        
        if (user) {
            dispatch({ type: "USER", payload: user })
        }
        else {
            history.push('/login')
        }
    },[])
    return (
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/signup'>
                <Signup />
            </Route>
            <Route exact path='/profile'>
                <Profile />
            </Route>
            <Route path='/createpost'>
            <Create_Post />
            </Route>
            <Route path='/profile/:userid'>
                <UserProfile />
            </Route>
        </Switch>
        )
}
function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <UserContext.Provider value={{ state,dispatch }}>
            <BrowserRouter>
                <NavBar />
                <Routing/>
            </BrowserRouter>
        </UserContext.Provider>
  );
}

export default App;
