
import  {Navbar}  from './components';

import Footer from './components/Footer/Footer';
import { LocationMap, Employee,Home } from './pages';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'

function App() {


  return (
    <>
    {/* <div className='App'> */}
      <Navbar />
    <Routes>
        <Route index element={<Home/>}/>
        {/* <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} /> */}
        <Route path="/Location" element={<LocationMap />} />
        <Route path="/Employee" element={<Employee />} />
        


        {/* <Route path="" element={<PrivateRoute />}>
          <Route path='/profile' element={<UserProfile />} />
          <Route path="/homework">
            <Route index element={<Pages.HomeworkListPage />} />
            <Route path="/homework/:id" element={<Pages.HomeworkPage />} />
          </Route>
        </Route> */}

        {/* <Route path = "*" element={<Pages.NotFoundPage />} /> */}
      {/* </Route> */}
    </Routes>
    <Footer />
  {/* </div> */}
  </>
  )
}

export default App
