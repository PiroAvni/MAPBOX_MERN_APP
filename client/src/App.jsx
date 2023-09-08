import { Navbar } from "./components";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import { Home } from "./pages";
import { Routes, Route } from "react-router-dom";
import { useValue } from "./context/ContextProvider";
import Notification from "./components/Notification/Notification";
import Loading from "./components/Loading/Loading";
import BottomNav from "./components/BottomNav/BottomNav";
import "./App.css";




function App() {


  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  return (
 
      <>
      <Loading/>
      <Notification />
      <Login />
      <Navbar /> 
     {/* If user is NOT logged in dont render Home and Footer */}
      {!currentUser ? (
       <>
      <Home />
      <Footer />
        </>
      ):( 
     
      <BottomNav/>
      )}
      </>
  );
}

export default App;
