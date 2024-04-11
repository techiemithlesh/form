import Login from "./Admin/Pages/Login";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from './components/PrivateRoute';
import Admindashboard from "./Admin/Pages/Admindashboard";
import EnquiryList from "./Admin/Pages/EnquiryList";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form/>}/>
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Admindashboard />
              </PrivateRoute>
            }
          />
          <Route path='/admin/enquiry/list' element={<PrivateRoute><EnquiryList/></PrivateRoute>}/>
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
