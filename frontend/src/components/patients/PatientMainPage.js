import PatientProfile from "./PatientProfile.js";
import PatientsList from "./PatientsList.js";

const PatientMainPage = () => {
  return (
    <div className="row">
      <div className="col-lg-3">
        <PatientProfile />
      </div>
      <div className="col-lg-3">
        <PatientsList />
      </div>
    </div>
  );
};

export default PatientMainPage;
