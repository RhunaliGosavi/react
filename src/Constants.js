//export const TOKEN_BASE_URL = "https://localhost:8080";

export const TOKEN_BASE_URL = "https://ace-uat.travere.com";
export const TABLEAU_BASE_URL ="https://tableau-uat.travere.com";
export const WORKSHEET_BASE_URL ="http://public.tableau.com";//not in use

export const LOCALENV=false;//in local tablue url will always give 401 and it will redirect to login page , 
//to avoid redirection set true for loc env Local:true else false
export const IS_UAT=false;//disabled dashboard by default set uat=true else set false
export const deployment =process.env.REACT_APP_BASE_URL+"/dist";
//export const deployment ="";

export const auditMessage="To regress; to slip backwards";
export const auditText="Undo";
export const auditRevertMessage="To regress; to slip backwards";
export const fileSizeErr="File size cannot be greater than 10 MB"
/****not in use*****/
//export const LOGO_REDIRECT=localStorage.redirect;
export const LOGO_REDIRECT="/field-dashboard";
