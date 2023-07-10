import { Fragment, useState, useEffect } from "react";
import SearchGroup from "../components/SearchGroup";
import SearchOrganization from "../components/SearchOrganization";
import NavBar from "../components/NavBar";
import { Link, NavLink } from "react-router-dom";


export default function Search() {

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  

  return (
    <Fragment>
      <NavBar />

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 sm:mt-3">
        <ul className="max-w-[100rem] w-full mx-auto flex flex-wrap -mb-px sm:text-base">
          <li className="max-w-[50rem] w-1/2">
            <Link
              to=""
              className={`w-full inline-block p-4 rounded-t-lg ${activeTab === 1 ? 'text-blue-600 bg-gray-100 ' : 'hover:text-gray-600 hover:bg-gray-50'}`}
              onClick={() => handleTabClick(1)}
            >
              ความเสี่ยงระดับองค์กร
            </Link>
          </li>
          <li className="max-w-[50rem] w-1/2">
            <Link
              to=""
              className={`w-full inline-block px-1 sm:px-4 py-4 rounded-t-lg ${activeTab === 2 ? 'text-blue-600 bg-gray-100 ' : 'hover:text-gray-600 hover:bg-gray-50'}`}
              onClick={() => handleTabClick(2)}
            >
              ความเสี่ยงระดับแผนปฏิบัติการ
            </Link>
          </li>
        </ul>
      </div>

      {activeTab === 1 ? <SearchOrganization /> : <SearchGroup />}

      
    </Fragment>
  );
}
