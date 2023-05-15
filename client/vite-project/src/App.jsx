import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import Nav from './Components/Nav'
import Users from './Pages/Users'
import UsersContextProvider from './Context/UsersContext'
import './App.css'
import Profil from './Pages/Profil'
import Posts from './Pages/Posts'
import PostsContextProvider from './Context/PostsContext'


function App() {

  return (
    <>
      <PostsContextProvider >
        <UsersContextProvider>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path='/' element={<Registration />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/profil/:id' element={<Profil />} />
              <Route path='/users' element={<Users />} />
              <Route path='/posts' element={<Posts />} />
            </Routes>
          </BrowserRouter>
        </UsersContextProvider>
      </PostsContextProvider>

    </>
  )
}

export default App
