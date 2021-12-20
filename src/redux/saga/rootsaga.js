import {fork} from "redux-saga/effects"
import DataStewardshipAuditingSaga from "./DataStewardshipAuditingSaga"
import DataStewardshipTestingSaga from "./DataStewardshipSagaTesting"
import DataStewardshipZipTerrSaga from "./DataStewardshipZipTerrSaga"
import ZipTerrAuditingSaga from "./ZipTerrAuditingSaga"
import ProductAuditingSaga from "./ProductAuditingSaga"
import AlignmentAuditingSaga from "./AlignmentAuditingSaga"
import LoginSaga from "./LoginSaga"
import AlignmentSaga from "./AlignmentSaga"
import ProductSaga from "./ProductSaga"
import PricingSaga from "./PricingSaga"
import PricingAuditingSaga from "./PricingAuditingSaga"
import ProductForecastAuditingSaga from "./ProductForecastAuditingSaga"
import ProductForecastSaga from "./ProductForecastSaga"
import RepPrimarySaga from "./RepPrimarySaga"
import RepPrimaryAuditingSaga from "./RepPrimaryAuditingSaga"


import AxiosInterceptor from "../../components/Common/AxiosInterceptor"
export default function* rootsaga(){
    
    yield fork(RepPrimaryAuditingSaga)
    yield fork(RepPrimarySaga)
    yield fork(ProductForecastAuditingSaga)
    yield fork(ProductForecastSaga)
    yield fork(PricingAuditingSaga)
    yield fork(PricingSaga)
    yield fork(ProductSaga)
    yield fork(ProductAuditingSaga)
    yield fork(AlignmentAuditingSaga)
    yield fork(AlignmentSaga)
    yield fork(DataStewardshipTestingSaga)
    yield fork(DataStewardshipAuditingSaga)
    yield fork(DataStewardshipZipTerrSaga)
    yield fork(ZipTerrAuditingSaga)
    yield fork(LoginSaga)
}