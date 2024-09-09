
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Session",
    href: "/session",
    icon: "bi bi-speedometer2",
  },
  {
    title: "School",
    href: "/school",
    icon: "bi bi-bell",
  },
  {
    title: "SchoolAdmin",
    href: "/school-admin",
    icon: "bi bi-patch-check",
  },
  {
    title: "Role",
    href: "/role",
    icon: "bi bi-hdd-stack",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    const sidebar = document.getElementById("sidebarArea");
    if (sidebar) {
      sidebar.classList.toggle("showSidebar");
    }
  };

  const location = useLocation();

  return (
    <div className="p-3 mt-2">
      <Nav vertical className="sidebarNav">
        {navigation.map((navi, index) => (
          <NavItem key={index} className="sidenav-bg">
            <Link
              to={navi.href}
              className={
                location.pathname === navi.href
                  ? "active nav-link py-3"
                  : "nav-link text-secondary py-3"
              }
            >
              <i className={navi.icon}></i>
              <span className="ms-3 d-inline-block">{navi.title}</span>
            </Link>
          </NavItem>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
