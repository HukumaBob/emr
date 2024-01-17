import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Patients from "./components/patients/Patients";
import TodaySchedule from "./components/appointmens/TodaySchedule";
// import ThisWeekSchedule from './ThisWeekSchedule';
// import ThisMonthSchedule from './ThisMonthSchedule';
// import WholeTimeSchedule from './WholeTimeSchedule';
import ProtectedRoute from "./components/routers/ProtectedRoute";
import { ToastContainer } from "react-toastify";

const App = ({ isAuthenticated }) => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Header />}> */}
          <Route index element={<div>Access limited</div>} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="patients"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Patients />
              </ProtectedRoute>
            }
          />
          {/* <Route path="login" element={<LoginForm />} /> */}
          {/* </Route> */}
          <Route
            path="today-schedule"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TodaySchedule />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(App);
