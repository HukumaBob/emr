import Dashboard from "../dashboard/Dashboard.js";
import Patients from "./Patients.js";

const PatientMainPage = () => {
  return (
    <div className="row">
      <div className="col-lg-3">
        <Dashboard />
      </div>
      <div className="col-lg-3">
        <Patients />
      </div>
    </div>
  );
};

export default PatientMainPage;
