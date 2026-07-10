import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import HomeRedirect from "./components/HomeRedirect";

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
import Profile from "./pages/Profile";
import GenerateInterview from "./pages/GenerateInterview"
import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminQuestions from "./pages/AdminQuestions";
import AdminInterviews  from "./pages/AdminInterviews";


function App(){
  return (
    <BrowserRouter> 
    <Routes>
       <Route
          path="/login"
         element={
            <PublicRoute>
              <Login />
            </PublicRoute>
         }
       />

       <Route
           path="/register"
          element={<Register />}
       />
       <Route
         path="/dashboard"
         element={
           <ProtectedRoute>
             <Dashboard />
           </ProtectedRoute>
          }
        />

       <Route path="/" element={<HomeRedirect />} />

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
    <Route 
            path="/profile"
            element={<Profile />} 
         />

    <Route
      path="/profile/edit"
      element={<EditProfile />}
    />

    <Route
      path="/change-password"
      element={<ChangePassword />}
    />     
    
    {/* <Route
    path="/admin"
    element={
      <AdminRoute>
       <AdminDashboard />
      </AdminRoute>}
    /> */}

    <Route
     path="/admin"
     element={
        <AdminRoute>
            <AdminDashboard />
        </AdminRoute>
       }
    />

    <Route
     path="/admin/users"
     element={
        <AdminRoute>
            <AdminUsers />
        </AdminRoute>
     }
    />

   <Route
     path="/admin/questions"
     element={
        <AdminRoute>
            <AdminQuestions />
        </AdminRoute>
     }
   />

    <Route
      path="/admin/interviews"
      element={
        <AdminRoute>
            <AdminInterviews />
        </AdminRoute>
      }
    />


    </Routes>
    <Toaster
      position="top-right"
    />

    </BrowserRouter>
  )

}

export default App;