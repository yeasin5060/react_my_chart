import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Sigin from "./Pages/Signin/Sigin";
import MainPage from "./Main/MainPage";
import Hpme from "./Pages/Home/Hpme";
import Message from "./Pages/Message/Message";
import Notification from "./Pages/Notification/Notification";
import Setting from "./Pages/Setting/Setting";




function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <>  
        <Route path="/" element={<Sigin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<MainPage/>}>
           <Route path="/home" element = {<Hpme/>}/>
           <Route path="/message" element = {<Message/>}/>
           <Route path="/notification" element = {<Notification/>}/>
           <Route path="/setting" element = {<Setting/>}/>
        </Route>
    </>  
    )
  );
  return (
    <RouterProvider
    router={router}
  />
  )
}

export default App
