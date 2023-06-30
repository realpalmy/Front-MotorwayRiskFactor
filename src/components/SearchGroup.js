import { Fragment, useState, useEffect, useContext } from "react";
import Table from "../components/Table";
import Context from "../Context";

export default function SearchGroup() {
  const { data, updateData } = useContext(Context);

  const [searchData, setSearchData] = useState(data);

  const searchForm = (event) => {
    event.preventDefault();
    const year = document.getElementById("year").value;
    const quarter = document.getElementById("quarter").value;

    console.log("search count");

    setSearchData(() => {
      let serchFactor = [];
      if (year !== "" || quarter !== "") {
        serchFactor = data.filter((risk) => {
          if (year !== "" && quarter !== "") {
            return risk.year == year && risk.quarter == quarter;
          } else if (year !== "") {
            return risk.year == year;
          } else if (quarter !== "") {
            return risk.quarter == quarter;
          }
        });
      } else {
        serchFactor = data;
      }
      return serchFactor;
    });
  };

  return (
    <Fragment>
      <div className="container mx-auto my-6">
        <div className="p-2 sm:p-0">
          <div className="flex flex-col justify-start">
            <form onSubmit={searchForm} className="flex justify-start mb-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                <div className="col-span-2 content-end">
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ปี
                  </label>
                  <select
                    id="year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">เลือกทั้งหมด</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="quarter"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ไตรมาส
                  </label>
                  <select
                    id="quarter"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">เลือกทั้งหมด</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className="grid content-end col-span-2 md:col-span-1">
                  <button
                    type="submit"
                    className="py-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    ค้นหา
                  </button>
                </div>
              </div>
            </form>

            <div className="flex-col border my-4 p-5 rounded">
              <h2 className="font-semibold mb-3">ตารางปัจจัยความเสี่ยง</h2>
              <div className="flex flex-wrap justify-around">
                {searchData?.map((quarter) => (
                  <Table
                    key={quarter.year + "" + quarter.quarter}
                    data={quarter}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
