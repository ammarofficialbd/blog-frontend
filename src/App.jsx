import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.component'
import UserAuthForm from './pages/userAuthForm.page';
import { createContext, useEffect, useState } from 'react';
import { lookInSession } from './common/session';
import Editor from './pages/editor.pages';
import HomePage from './pages/home.page';
import { SearchPage } from './pages/search.page';

export const UserContext = createContext({})
const App = () => {
  const [userAuth, setUserAuth] = useState({})
 // dark theme 
 const [isDark, setIsDark] = useState(false)
 
  useEffect(()=>{
    // Check system preference on mount
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
    }
    let userInsession = lookInSession("user")
    userInsession ? setUserAuth(JSON.parse(userInsession)) : setUserAuth({token : null})
  }, [])
    return (
      <UserContext.Provider value={{userAuth, setUserAuth , isDark, setIsDark}}> 
        <Routes> 
        <Route path={'/editor'} element={<Editor/>}/>
            <Route path={'/'} element={<Navbar/>}>
              <Route index element={<HomePage/>}/>  
              <Route path={'/signin'} element={<UserAuthForm type='sign-in'/>}/>
              <Route path={'/signup'} element={<UserAuthForm type='sign-up'/>}/>
              <Route path={'/search/:query'} element={<SearchPage/>}/>

            </Route>
        </Routes>
      </UserContext.Provider>
    )
}

export default App;