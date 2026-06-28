import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import QuestionDetails from "./pages/QuestionDetails";
import Interview from "./pages/Interview";
import Interviews from "./pages/Interviews";
import InterviewDetails  from "./pages/InterviewDetails"

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
    </Routes>
    </BrowserRouter>
  )

}

export default App;