import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Fragment>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 bg-gray-800">
        <nav
          className="max-w-[100rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <Link to="/" className="flex-none text-lg font-semibold text-white">
            ระบบงานบริหารความเสี่ยงของเงินทุนค่าธรรมเนียมผ่านทาง (Risk
            Management : RM)
          </Link>
          <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "#38bdf8" : "#9ca3af",
              })}
              className="font-lg text-gray-400 hover:text-gray-500"
            >
              ค้นหา
            </NavLink>
            <NavLink
              to="/update"
              style={({ isActive }) => ({
                color: isActive ? "#38bdf8" : "#9ca3af",
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
