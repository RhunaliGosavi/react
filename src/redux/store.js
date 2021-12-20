import { createStore ,combineReducers,applyMiddleware} from "redux";
import createSaga from "redux-saga"
import rootSaga from "./saga/rootsaga"
import DataStewardshipTestingReducer from "../reducers/DataStewardshipTestingReducer"
import DataStewardshipAuditingReducer from "../reducers/DataStewardshipAuditingReducer"
import DataStewardshipZipTerrReducer from "../reducers/DataStewardshipZipTerrReducer"
import ZipTerrAuditingReducer from "../reducers/ZipTerrAuditingReducer"
import ProductAuditingReducer from "../reducers/ProductAuditingReducer"
import AlignmentAuditingReducer from "../reducers/AlignmentAuditingReducer"
import LoginReducer from "../reducers/LoginReducer"
import AlignmentReducer from "../reducers/AlignmentReducer"
import ProductReducer from "../reducers/ProductReducer"
import PricingReducer from "../reducers/PricingReducer"
import PricingAuditingReducer from "../reducers/PricingAuditingReducer"

import ProductForecastReducer from "../reducers/ProductForecastReducer"
import ProductForecastAuditingReducer from "../reducers/ProductForecastAuditingReducer"
import RepPrimaryReducer from "../reducers/RepPrimaryReducer"
import RepPrimaryAuditingReducer from "../reducers/RepPrimaryAuditingReducer"

const sagaMiddleware=createSaga()
const reducer =combineReducers({RepPrimaryAuditingReducer,RepPrimaryReducer,ProductForecastAuditingReducer,ProductForecastReducer,PricingAuditingReducer,PricingReducer,ProductAuditingReducer,AlignmentAuditingReducer,ProductReducer,AlignmentReducer,DataStewardshipTestingReducer,DataStewardshipAuditingReducer,LoginReducer,DataStewardshipZipTerrReducer,ZipTerrAuditingReducer})


const store=createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga)

export default store