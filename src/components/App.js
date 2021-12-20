import React, { Component } from "react";

import '../styles/App.css';

import { Switch,Route,Redirect} from "react-router-dom";
import Login from '../components/Login/Login';
import FieldDashboard from '../components/Dashboard/FieldDashboard';
import VeevaDashboard from '../components/Dashboard/VeevaDashboard';
import ExecutiveDashboard from '../components/Dashboard/ExecutiveDashboard';
import Alignment from './DataStewardship/RTRX/Alignment';
import ChangePassword from "./ChangePassword/ChangePassword";
import TestingAuditing from '../components/DataStewardship/Auditing/TestingAuditing';
import ZipTerritoryAuditing from '../components/DataStewardship/Auditing/ZipTerritoryAuditing';
import AlignmentAuditing from '../components/DataStewardship/Auditing/AlignmentAuditing';
import ProductAuditing from '../components/DataStewardship/Auditing/ProductAuditing';
import PricingAuditing from '../components/DataStewardship/Auditing/PricingAuditing';
import ProductForecastAuditing from '../components/DataStewardship/Auditing/ProductForecastAuditing';
import Testing from "./DataStewardship/Testing";
import ZipTerritory from "./DataStewardship/RTRX/ZipTerritory";
import Product from "./DataStewardship/RTRX/Product";
import ProductForecast from "./DataStewardship/RTRX/ProductForecast";
import Pricing from "./DataStewardship/RTRX/Pricing";
import RepPrimary from "./DataStewardship/RTRX/RepPrimary";
import RepPrimaryAuditing from '../components/DataStewardship/Auditing/RepPrimaryAuditing';

/*******test******/
import Test from '../components/DataStewardship/TestPagination';
import PaginationTest from '../components/DataStewardship/PaginationTest';

import Auditing_dropdowntest from '../components/DataStewardship/Auditing_dropdowntest';
import CMPDashboard from "./Dashboard/CMPDashboard";
import BrandedThiolaDashboard from "./Dashboard/BrandedThiolaDashboard";
import WeeklySalesReport from "./Dashboard/WeeklySalesReport";
import LoginWithCredentials from "./Login/LoginWithCredentials";
import PatientGoalVsActual from "./Dashboard/PatientGoalVsActual";




/*******test******/


class App extends Component {


    render() {
        console.log("env variable -->",typeof(process.env.REACT_APP_IS_DEV),process.env.REACT_APP_IS_DEV,process.env.REACT_APP_IS_DEV
        ? "LoginWithCredentials" : "Login");

      
        return (
            <div className="App hide-scroll">
      <Switch>
          
          <Route exact path="/" component={process.env.REACT_APP_IS_DEV ? LoginWithCredentials : Login}></Route>
          <Route exact path={process.env.REACT_APP_BASE_URL} component={process.env.REACT_APP_IS_DEV ? LoginWithCredentials :  Login}></Route>
         
          <Route exact path="/field-dashboard" component={FieldDashboard}></Route>
          <Route exact path="/patient-goal-vs-actual" component={PatientGoalVsActual}></Route>
          <Route exact path="/cmp-dashboard" component={CMPDashboard}></Route>
          <Route exact path="/veeva-dashboard" component={VeevaDashboard}></Route>
          <Route exact path="/executive-dashboard" component={ExecutiveDashboard}></Route>
          <Route exact path="/branded-thiola-dashboard" component={BrandedThiolaDashboard}></Route>
          <Route exact path="/weekly-sales-report" component={WeeklySalesReport}></Route>
          <Route exact path="/zip-territory" component={ZipTerritory}></Route>
          <Route exact path="/alignment" component={Alignment}></Route>
          <Route exact path="/product" component={Product}></Route>
          <Route exact path="/product-forecast" component={ProductForecast}></Route>
          <Route exact path="/pricing" component={Pricing}></Route>
          <Route exact path="/rep-primary" component={RepPrimary}></Route>
          
          
          <Route exact path="/testing-auditing" component={TestingAuditing}></Route>
          <Route exact path="/zip-territory-auditing" component={ZipTerritoryAuditing}></Route>
          <Route exact path="/alignment-auditing" component={AlignmentAuditing}></Route>
          <Route exact path="/product-auditing" component={ProductAuditing}></Route>
          <Route exact path="/pricing-auditing" component={PricingAuditing}></Route>
          <Route exact path="/product-forecast-auditing" component={ProductForecastAuditing}></Route>
          <Route exact path="/rep-primary-auditing" component={RepPrimaryAuditing}></Route>
          
          <Route exact path="/ChangePassword" component={ChangePassword}></Route>
          <Route exact path="/Testing" component={Testing}></Route>
          
          <Route exact path="/auditing-test" component={Auditing_dropdowntest}></Route>
          <Route exact path="/test" component={Test}></Route>
          <Route exact path="/PaginationTest" component={PaginationTest}></Route>
          
       </Switch>
       {console.log("env check",process.env.REACT_APP_API_BASE_URL)}
    </div>
        );
    }
}

export default App;