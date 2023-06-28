import "./App.css";
import Login from "./components/login/login.";
import UploadImage from "./components/uploadimages/uploadimage";
import PatientSearch from "./components/patient360search/patientsearch";
import MedicationData from "./components/patient360search/medicationData";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  DASHBOARD,
  LOGIN,
  BASE,
  IMAGEUPLOAD,
  PATIENTSEARCH,
  MEDICATIONDATA
} from "./common/constant";
import Footer from "./components/reusable/footer";
import withAuthCheck from "./components/reusable/withAuthenticationCheck";
import home from "./components/home/home";
import dashboard from "./components/dashboard/dashboard";
import Header from "./components/reusable/header";
import PageNotFound from "./components/reusable/pageNotFound";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUpload,
  faSearch,
  faUser,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUpload, faSearch, faUser, faHome);

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>

      <div className="App-footer">
        <Footer />
      </div>
      <Routes>
        <Route exact path={BASE} Component={withAuthCheck(home)} />
        <Route exact path={LOGIN} element={<Login />} />
        <Route exact path={DASHBOARD} Component={withAuthCheck(dashboard)} />
        <Route
          exact
          path={IMAGEUPLOAD}
          Component={withAuthCheck(UploadImage)}
        />
        <Route
          exact
          path={PATIENTSEARCH}
          Component={withAuthCheck(PatientSearch)}
        />
        <Route
          exact
          path={MEDICATIONDATA}
          Component={MedicationData}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
