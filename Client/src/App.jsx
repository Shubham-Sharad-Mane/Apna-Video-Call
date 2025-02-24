
import './App.css'

import LandingPage from "./pages/landing";
import Authentication from "./pages/authentication";
import {Route , BrowserRouter as Router, Routes} from "react-router-dom"; //we need to import the routes , browserrouter as rputer and the routes from the react router dom for the routing
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet';
import History from './pages/History';
import HomeComponent from './pages/Home';
function App() {

//we use the <Route path="/:url" element={<VideoMeetComponent/>}/> that route for if common path of the room is detected then what operation is gona be performed
  return (
    <div className="App">
    <Router>
      <AuthProvider>
      <Routes>
       <Route path="/" element={<LandingPage/>} />  
       <Route path="/auth" element={<Authentication/>}/>
       <Route path="/:url" element={<VideoMeetComponent/>}/>
       {/* <Route path="/history" elements={<History/>}/> */}
       <Route path="/history" element={<History/>}/>
       <Route path="/home" element={<HomeComponent />} />
      </Routes>
      </AuthProvider>
    </Router>
    </div>
  )
}

export default App
//first install the react router dom
//use router then inside routes then inside route and use the path for the for on which route that request is comming and then use elements for on which route in the backend that request is comming
// installed the miui --npm i @mui/material @emotion/react @emotion/styled
//then i installed the http-status and the axios and the socket.io-client
//creting the new page into the pagees called authentication.jsx
//now creating the route for the authentication 
