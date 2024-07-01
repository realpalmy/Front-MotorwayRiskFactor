import { Fragment, useState, useContext, useEffect } from "react";
import { PlanTable, ResidualRisk } from "./OperationPlanTable";
import { plan2566 } from "../data/operation_plan/plan2566";
import { plan2567 } from "../data/operation_plan/plan2567";
import { plan2568 } from "../data/operation_plan/plan2568";

export default function SearchOrganization() {

  const currentYear = new Date().getFullYear() + 543;
  console.log(currentYear)
  const yearData = (year) => {
    if(year === '2566') 
      return plan2566
    else if (year === '2567') 
      return plan2567
    else if (year === '2568') 
      return plan2568
    else
      return '';
  }
  
  const [year, setYear] = useState(currentYear.toString())
  const [operationDataSet, setOperationDataSet] = useState(yearData(year));

  const searchForm = (event) => {
    event.preventDefault();
    const year = document.getElementById("year").value;
    setYear(year)
    setOperationDataSet(yearData(year))
  };

  


  return (
    <Fragment>
      <div className="container mx-auto my-6 px-2">
        <div className="p-2 sm:p-0">
          <h1 className="text-xl font-semibold text-center sm:text-start sm:pb-1">
            ค้นหาแผนปฏิบัติการรองรับความเสี่ยงประจำปี
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
                    defaultValue={year}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">ระบุ ปี</option>
                    <option value="2566">ปี 2566</option>
                    <option value="2567">ปี 2567</option>
                    <option value="2568">ปี 2568</option>
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

            {year !== '' && 
            
            <Fragment>
                <div id="search_result" className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="flex w-full">
                        <h2 className="font-semibold text-lg">แผนปฏิบัติการรองรับความเสี่ยงของเงินทุนค่าธรรมเนียมผ่านทาง ประจำปี {year}</h2>
                    </div>
                </div>
            
                {operationDataSet?.length > 0 && operationDataSet.map((operationData) => 
                  <div key={operationData.title} className="flex-col border mt-4 p-3 sm:p-5 rounded">
                    <h3 className="font-semibold text-indigo-500">{operationData.title}</h3>
                    <PlanTable operationData={operationData}></PlanTable>

                    <p className="my-4 font-semibold">การพิจารณาระดับความเสี่ยงที่ยอมรับได้ของความเสี่ยงที่เหลืออยู่ (Residual Risk) ขององค์กร</p>
                    <ResidualRisk riskDataset={operationData.residualRisk}></ResidualRisk>
                </div>
                )}
            </Fragment>
            }
            
          </div>
        </div>
      </div>
    </Fragment>
  );
}
