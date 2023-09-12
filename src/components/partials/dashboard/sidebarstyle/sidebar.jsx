import { useEffect, memo, Fragment, useContext } from "react";

//router
import { Link, Navigate } from "react-router-dom";

//components
import VerticalNav from "./vertical-nav";
import Logo from "../../components/logo";

//scrollbar
import Scrollbar from "smooth-scrollbar";

// Import selectors & action from setting store
import * as SettingSelector from "../../../../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";
import { AuthContext } from "../../../../context/AuthContext";
import VerticalNavSecretario from "./vertical-navSecretario";

const Sidebar = memo((props) => {
  const sidebarColor = useSelector(SettingSelector.sidebar_color);
  const sidebarType = useSelector(SettingSelector.sidebar_type); // array
  const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style);
  const {user} = useContext(AuthContext)
  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };

  // const resizePlugins = () => {
  //     // For sidebar-mini & responsive

  //   }
  useEffect(() => {
    Scrollbar.init(document.querySelector("#my-scrollbar"));

    window.addEventListener("resize", () => {
      const tabs = document.querySelectorAll(".nav");
      const sidebarResponsive = document.querySelector(
        '[data-sidebar="responsive"]'
      );
      if (window.innerWidth < 1025) {
        Array.from(tabs, (elem) => {
          if (
            !elem.classList.contains("flex-column") &&
            elem.classList.contains("nav-tabs") &&
            elem.classList.contains("nav-pills")
          ) {
            elem.classList.add("flex-column", "on-resize");
          }
          return elem.classList.add("flex-column", "on-resize");
        });
        if (sidebarResponsive !== null) {
          if (!sidebarResponsive.classList.contains("sidebar-mini")) {
            sidebarResponsive.classList.add("sidebar-mini", "on-resize");
          }
        }
      } else {
        Array.from(tabs, (elem) => {
          if (elem.classList.contains("on-resize")) {
            elem.classList.remove("flex-column", "on-resize");
          }
          return elem.classList.remove("flex-column", "on-resize");
        });
        if (sidebarResponsive !== null) {
          if (
            sidebarResponsive.classList.contains("sidebar-mini") &&
            sidebarResponsive.classList.contains("on-resize")
          ) {
            sidebarResponsive.classList.remove("sidebar-mini", "on-resize");
          }
        }
      }
    });
  });

  return (
    <Fragment>
      <aside
        className={`${sidebarColor} ${sidebarType.join(
          " "
        )} ${sidebarMenuStyle} sidebar sidebar-base  navs-rounded-all hide-on-print`}
        data-sidebar="responsive"
      >
        <div className="sidebar-header d-flex align-items-center justify-content-start">
          <Link to="/" className="navbar-brand">
            <Logo />
            <h4 className="logo-title">{props.app_name}</h4>
          </Link>
          <div
            className="sidebar-toggle"
            data-toggle="sidebar"
            data-active="true"
            onClick={minisidebar}
          >
            <i className="icon">
              <svg className="icon-10" width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.29853 8C7.11974 8 6.94002 7.93083 6.80335 7.79248L3.53927 4.50446C3.40728 4.37085 3.33333 4.18987 3.33333 4.00036C3.33333 3.81179 3.40728 3.63081 3.53927 3.4972L6.80335 0.207279C7.07762 -0.069408 7.52132 -0.069408 7.79558 0.209174C8.06892 0.487756 8.06798 0.937847 7.79371 1.21453L5.02949 4.00036L7.79371 6.78618C8.06798 7.06286 8.06892 7.51201 7.79558 7.79059C7.65892 7.93083 7.47826 8 7.29853 8Z" fill="white" />
                <path d="M3.96552 8C3.78673 8 3.60701 7.93083 3.47034 7.79248L0.206261 4.50446C0.0742745 4.37085 0.000325203 4.18987 0.000325203 4.00036C0.000325203 3.81179 0.0742745 3.63081 0.206261 3.4972L3.47034 0.207279C3.74461 -0.069408 4.18831 -0.069408 4.46258 0.209174C4.73591 0.487756 4.73497 0.937847 4.4607 1.21453L1.69649 4.00036L4.4607 6.78618C4.73497 7.06286 4.73591 7.51201 4.46258 7.79059C4.32591 7.93083 4.14525 8 3.96552 8Z" fill="white" />
              </svg>
            </i>
          </div>
        </div>
        <div
          className="pt-0 sidebar-body data-scrollbar"
          data-scroll="1"
          id="my-scrollbar"
        >
          {/* sidebar-list class to be added after replace css */}
          <div className="sidebar-list "  id="sidebar">
            {
              user.usertype==="Admin"?<VerticalNav />:(
                user.usertype===""?<VerticalNavSecretario/>:
                user.usertype===""?<VerticalNavProfessor/>:""
              )
            }
          </div>
        </div>
        <div className="sidebar-footer"></div>
      </aside>
    </Fragment>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
