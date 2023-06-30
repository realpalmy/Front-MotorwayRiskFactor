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
          <Link
            to="/"
            className="flex-none text-xl font-semibold text-white"
          >
            MOTORWAY RISK FACTOR
          </Link>
          <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
            <Link
              to="/search"
              className="font-medium text-gray-400 hover:text-gray-500"
            >
              ค้นหา
            </Link>
            <Link to="/update" className="font-medium text-blue-500">
              กรอกข้อมูลปัจจัยความเสี่ยง
            </Link>
          </div>
        </nav>
      </header>
    </Fragment>
  );
}
