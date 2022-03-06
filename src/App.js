import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Main from './components/Main'
import Protected from './components/Protected';
import AddPost from './components/AddPost'
import Post from './components/Post'
import Bookmark from './components/Bookmark'
import Default from './components/Default'
import React from 'react'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path = "/" element={<Default/>}/>
          <Route exact path = "/login" element={<Login/>}/>
          <Route exact path = "/register" element={<Register/>}/>
          <Route exact path = "/main" element={<Protected Cmp={Main}/>}/>
          <Route exact path = "/addpost" element={<Protected Cmp={AddPost}/>}/>
          <Route exact path = "/post/:id" element={<Protected Cmp={Post}/>}/>
          <Route exact path = "/bookmark" element={<Protected Cmp={Bookmark}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
