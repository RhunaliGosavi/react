import React, { Component } from "react"
import { Link,NavLink} from "react-router-dom";
import * as ConstVal from "../../Constants"

class Sidebar extends Component{
    constructor(){
        super();
        var mini = true;
      
    }
    
    componentDidMount(){

        var elems = document.getElementsByClassName('fa-sidemenu');
        for (var i=0;i<elems.length;i+=1){
        elems[i].style.display = 'none';
        }
       
      // this.toggleClass(0);
    }

    openSidebar=()=>{
        document.getElementById("mySidebar").style.width = "270px";
        var elems = document.getElementsByClassName('fa-sidemenu');
        for (var i=0;i<elems.length;i+=1){
            elems[i].style.display = 'block';
        }
    }


    closeSidebar=()=>{
        document.getElementById("mySidebar").style.width = "42px";
        var elems = document.getElementsByClassName('fa-sidemenu');
        for (var i=0;i<elems.length;i+=1){
            elems[i].style.display = 'none';
        }
    }

    checkEmailAccess=()=>{

      return  localStorage.email && (localStorage.email.indexOf('saama') >= 0 || localStorage.email.toLowerCase()==("Brandon.Main@travere.com").toLowerCase() || localStorage.email.toLowerCase()== ("Nam.Huynh@travere.com").toLowerCase() || localStorage.email.toLowerCase()==("Lynette.Beck@travere.com").toLowerCase() || localStorage.email.toLowerCase()==("loy.russell@travere.com").toLowerCase()) ? true :false;
    }
    
    render(){
     
        return (
            <>
            
                <div id="mySidebar" className="sidebar" onMouseOver={()=>this.openSidebar()} onMouseOut={()=>this.closeSidebar()} >
                   
                    <div className="wrapper">
                        <>
                        <nav id="sidebar">
                            <div className="col-lg-5 p-0">
                                <NavLink to={localStorage.redirect ? localStorage.redirect : ""} className="navbar-brand p-0 logo-margin"> <img className="saama-logo" src={ConstVal.deployment+"/assets/img/ACE Logo New.png"} /> </NavLink>
                            </div>
                            <ul className="list-unstyled components menu " id="sidemenu">
                               
                               
                                {localStorage.menu!=='field' ? 
                                   <li className={this.props.activeIndex == 0 ? "active" : ""}>
                                    <a href="#" className="disabled-link">
                                        <i className="fa fa-bar-chart side-icons " aria-hidden="true"></i> Sales & Launch <i className="fa fa-chevron-down fa-sidemenu" aria-hidden="true"></i>
                                    </a>
                                    <ul className="list-unstyled secondSubmenu submenu" id="homeSubmenu">
                                        <li  className={(ConstVal.IS_UAT ) ? "disble-link active-2ndlevel" :  "active-2ndlevel"}   > <NavLink to="/executive-dashboard"  activeClassName="active-submenu"  id="sales-perf"><span className="spanSubmenu"> Executive Dashboard</span></NavLink> </li>
                                         

                                         { localStorage.menu!=='non-revenue' ? 
                                        <li  className={(ConstVal.IS_UAT ) ? "disble-link active-2ndlevel" : "active-2ndlevel"}   > <NavLink to="/weekly-sales-report"  activeClassName="active-submenu"  id="weekly-report"><span className="spanSubmenu"> Weekly Sales Report</span></NavLink> </li>
                                        :""}

                                        <li   className={(ConstVal.IS_UAT  ) ? "disble-link active-2ndlevel" : "active-2ndlevel"}  > <NavLink to="/branded-thiola-dashboard"  activeClassName="active-submenu"  id="weekly-report"><span className="spanSubmenu">Branded Thiola Dashboard</span></NavLink> </li>
                                       <li   className={(ConstVal.IS_UAT  ) ? "disble-link active-2ndlevel" : "active-2ndlevel"}  > <NavLink to="/patient-goal-vs-actual"  activeClassName="active-submenu"  id="weekly-report"><span className="spanSubmenu">Patient Goal vs Actual</span></NavLink> </li>
                                    </ul>
                                </li> :""
                                 }
                              
                                <li className={this.props.activeIndex == 1 ? "active" : ""}>
                                    <a href="#" className="disabled-link">
                                     <img src={ConstVal.deployment+"/assets/img/menu/Field-Insights.png"} className="menu-icons"/> Field Insights <i className="fa fa-chevron-down fa-sidemenu" aria-hidden="true"></i>
                                    </a>
                                        <ul className="collapse list-unstyled submenu" id="SecondSubmenu">
                                        <li className={ConstVal.IS_UAT ? "disble-link active-2ndlevel" : "active-2ndlevel"} ><NavLink to="/field-dashboard" activeClassName="active-submenu"><span className="spanSubmenu">Field Dashboard</span></NavLink></li>
                                        <li className= {ConstVal.IS_UAT ? "disble-link active-2ndlevel" : "active-2ndlevel"}> <NavLink to="/veeva-dashboard" activeClassName="active-submenu"> <span className="spanSubmenu">Veeva Dashboard</span> </NavLink> </li>
                                        <li className= { "active-2ndlevel"}> <NavLink to="/cmp-dashboard" activeClassName="active-submenu"> <span className="spanSubmenu">CMP Dashboard</span> </NavLink> </li>
                                        
                                        </ul>
                                </li>
                               
                            {["global", "ace"].indexOf(localStorage.menu)!== -1  ? 
                                <li className={this.props.activeIndex == 2 ? "active " : ""}>
                                    <a href="#" className="disabled-link"><img src={ConstVal.deployment+"/assets/img/menu/Marketing-Insights.png"} className="menu-icons"/>Data Stewardship <i className="fa fa-chevron-down fa-sidemenu" aria-hidden="true"></i></a>

                                     
                                    <ul className=" list-unstyled submenu" >
                                        
                                        <li  ><a href="#"  className={this.props.activeInnerIdex==0 ? "active-submenu disabled-link" : "disabled-link"}><span className="spanMultiSubMenu">RTRX</span></a>
                                            <ul className=" list-unstyled innerSubMenu" id="">
                                                <li> <NavLink to="/zip-territory" activeClassName="active-submenu"><span className="spanSubmenu">ZIP Territory</span></NavLink></li>
                                                <li> <NavLink to="/alignment" activeClassName="active-submenu"><span className="spanSubmenu">Alignment</span></NavLink></li>
                                                <li> <NavLink to="/product" activeClassName="active-submenu"><span className="spanSubmenu">Product</span></NavLink></li>
                                                <li> <NavLink to="/pricing" activeClassName="active-submenu"><span className="spanSubmenu">Pricing</span></NavLink></li>
                                                <li> <NavLink to="/product-forecast" activeClassName="active-submenu"><span className="spanSubmenu">Product Forecast</span></NavLink></li>
                                                <li> <NavLink to="/rep-primary" activeClassName="active-submenu"><span className="spanSubmenu">Rep Primary</span></NavLink></li>
                                                      
                                            </ul>
                                        </li>
                                        
                                        <li  ><NavLink to="/Testing"  className={this.props.activeInnerIdex==1 ? "active-submenu" : ""}><span className="spanMultiSubMenu">Testing</span></NavLink>
                                          
                                        </li>
                                        
                                       
                                    </ul>
                                </li> : ""
                            }
                               
                            </ul>
                        </nav>
                       </>
                    </div> 
                </div> 
            </>	
        );
    }
}
export default Sidebar;




