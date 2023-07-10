import { Fragment, useState, useContext } from "react";
import Table from "../components/Table";
import Context from "../Context";
import TableIndicator from "../components/TableIndicator"


export default function SearchGroup() {
  const { data } = useContext(Context);

  const [searchData, setSearchData] = useState(data);

  const searchForm = (event) => {
    event.preventDefault();
    const year = document.getElementById("year").value;
    const quarter = document.getElementById("quarter").value;

    //console.log(data);

    setSearchData(() => {
      let searchFactor = [];
      if (year !== "" || quarter !== "") {
        searchFactor = data?.filter((risk) => {
          if (year !== "" && quarter !== "") {
            return risk.year == year && risk.quarter == quarter;
          } else if (year !== "") {
            return risk.year == year;
          } else if (quarter !== "") {
            return risk.quarter == quarter;
          }
        });
      } else {
        searchFactor = data;
      }
      return searchFactor;
    });
  };

  return (
    <Fragment>
      <div className="container mx-auto my-6 px-2">
        <div className="p-2 sm:p-0">
          <h1 className="text-xl font-semibold text-center sm:text-start sm:pb-1">
            ค้นหาปัจจัยเสี่ยงระดับแผนปฏิบัติการ
          </h1>
          <div className="flex flex-col justify-start">
            <form onSubmit={searchForm} className="flex justify-start mb-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                <div className="col-span-2 content-end">
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    ปี
                  </label>
                  <select
                    id="year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">เลือกทั้งหมด</option>
                    <option value="2566">ปี 2566</option>
                    <option value="2567">ปี 2567</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="quarter"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    ช่วงเวลา
                  </label>
                  <select
                    id="quarter"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">เลือกทั้งหมด</option>
                    <option value="0">ต้นปีงบประมาณ</option>
                    <option value="1">ไตรมาส 1</option>
                    <option value="2">ไตรมาส 2</option>
                    <option value="3">ไตรมาส 3</option>
                    <option value="4">ไตรมาส 4</option>
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
              <div className="flex flex-col sm:flex-row mb-3 sm:justify-between">
                <div className="flex w-full">
                  <h2 className="font-semibold mb-3">ตารางปัจจัยความเสี่ยง</h2>
                </div>

                <TableIndicator />
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
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
