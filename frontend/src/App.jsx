import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import QuestionDetails from "./pages/QuestionDetails";
import Interview from "./pages/Interview";
import Interviews from "./pages/Interviews";
import InterviewDetails  from "./pages/InterviewDetails"
import Report from "./pages/Report"
import CreateInterview from "./pages/CreateInterview"
import ReportPage from "./pages/ReportPage";
import Performance from "./pages/Performance"
import Leaderboard from "./pages/Leaderboard"
import GenerateInterview from "./pages/GenerateInterview"


function App(){
  return (
    <BrowserRouter> 
    <Routes>
       <Route
           path="/login"
          element={<Login />}
       />

       <Route
           path="/register"
          element={<Register />}
       />
       <Route
           path="/dashboard"
          element={<Dashboard />}
       />

       <Route 
            path="/questions"
            element={<Questions />} 
         />

       <Route
           path="/questions/:id"
           element={<QuestionDetails />}
       />

       <Route
        path="/interview/:id"
        element={<Interview />}
      />

      <Route
        path="/interviews"
       element={<Interviews />}
      />


     <Route
       path="/interviews/:id"
       element={<InterviewDetails />}
    />
     <Route
       path="/report/:id"
       element={<Report />}
     />

     <Route
     path="/create-interview"
     element={<CreateInterview />}
    />
    
    <Route path="/report/:id"
     element={<ReportPage />}
    />
    
    <Route
      path="/performance"
      element={<Performance />}
    />

    <Route
      path="/leaderboard"
      element={<Leaderboard />}
    />
    <Route
    path="/generate-interview"
    element={<GenerateInterview />}
    />

    </Routes>
    <Toaster
      position="top-right"
    />
    </BrowserRouter>
  )

}

export default App;