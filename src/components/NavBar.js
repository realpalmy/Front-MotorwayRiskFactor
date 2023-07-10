import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Fragment>
      <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm py-4 bg-gray-800">
        <nav
          className="max-w-[100rem] w-full mx-auto px-4 md:flex md:items-center md:justify-between"
          aria-label="Global"
        >
          <Link to="/" className="flex flex-row md:flex-col text-lg font-semibold text-white">
            ระบบงานบริหารความเสี่ยงของเงินทุนค่าธรรมเนียมผ่านทาง (Risk
            Management : RM)
          </Link>
          <div className="flex items-center gap-5 mt-5 md:justify-end md:mt-0 md:pl-5 sm:text-base">
            <NavLink
              to="/search"
              style={({ isActive }) => ({
                color: isActive ? "#0ea5e9" : "#9ca3af",
              })}
              className="font-lg text-gray-400 hover:text-gray-500"
            >
              ค้นหา
            </NavLink>
            <NavLink
              to="/update"
              style={({ isActive }) => ({
                color: isActive ? "#0ea5e9" : "#9ca3af",
              })}
              className="font-lg text-gray-400 hover:text-gray-500"
            >
              กรอกข้อมูลปัจจัยความเสี่ยง
            </NavLink>
          </div>
        </nav>
      </header>
    </Fragment>
  );
}
