import { Fragment, useState, useContext } from "react";
import Table from "../components/Table";
import Context from "../Context";
import TableIndicator from "../components/TableIndicator";
import { organizeData2567 } from "../data/organizeData2567"
import { organizeData2566 } from "../data/organizeData2566"

export default function SearchGroup() {
  const { data } = useContext(Context);

  const [year, setYear] = useState("2567")

  const searchForm = (event) => {
    event.preventDefault();
    const year = document.getElementById("year").value;
    setYear(year)

    console.log(data);
  };

  const organizeData = year === '2566' ? organizeData2566 : year === '2567' ? organizeData2567 : '';

  //console.log(organizeData2567)

  const table_css = " border border-black p-2 ";
  const header = " font-medium  ";
  const section_header = " bg-amber-200 ";

  const header_section = (
    <div className={"grid grid-cols-9 col-span-9"}>
      <div className={"col-span-4 " + header + table_css}>ปัจจัยความเสี่ยง</div>
      <div className={"col-span-1 " + header + table_css}>โอกาส</div>
      <div className={"col-span-1 " + header + table_css}>ผลกระทบ</div>
      <div className={"col-span-1 " + header + table_css}>
        ความรุนแรงของความเสี่ยงระดับองค์กร
      </div>
      <div className={"col-span-1 " + header + table_css}>
        หน่วยงานรับผิดชอบ
      </div>
      <div className={"col-span-1 " + header + table_css}>
        ความเสี่ยงเหลืออยู่ (Residual Risk)
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className="container mx-auto my-6 px-2">
        <div className="p-2 sm:p-0">
          <h1 className="text-xl font-semibold text-center sm:text-start sm:pb-1">
            ค้นหาปัจจัยเสี่ยงระดับองค์กร
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
                    <option value="2566">ปี 2566</option>
                    <option value="2567" selected>ปี 2567</option>
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
                <div class="flex w-full">
                  <h2 className="font-semibold mb-3">ผลการประเมินระดับความเสี่ยงระดับองค์กร ปี {year}</h2>
                </div>
                <TableIndicator />
              </div>

          
              <div className="flex flex-wrap justify-center my-3">
                <Table data={organizeData2567[1].listData[0]} />
              </div>

              {organizeData !== '' && 
              <div className="overflow-x-auto w-80 sm:w-full overflow-clip sm:p-0">
              <section>
                <div className="flex sm:justify-center">
                  <div className="min-w-[60rem] sm:min-w-full grid grid-cols-9 align border border-black">
                    {organizeData.map((dataSection) => {
                      return (
                      <div className="grid grid-cols-9 col-span-9">
                        <div className={"col-span-9 " + section_header + header + table_css}>
                          {dataSection.sectionName}
                        </div>
                        {header_section}
                        {dataSection.listData.map((list) => {
                        return (
                          <div className="grid grid-cols-9 col-span-9">
                            <div className={"col-span-9 border border-black px-2" + header}>
                              {list.list === 0 ? '' : list.list + '.'} {list.listName}
                            </div>
                            {list.riskData.map((riskFactor) => {
                              return (
                                <div className="grid grid-cols-9 col-span-9">
                                  <div className={"col-span-1 " + table_css}>{riskFactor.name}</div>
                                  <div className={"col-span-3 " + table_css}>{riskFactor.description}</div>
                                  <div className={"col-span-1 text-center" + table_css}>{riskFactor.l}</div>
                                  <div className={"col-span-1 text-center" + table_css}>{riskFactor.i}</div>
                                  <div className={"col-span-1 text-center " + table_css}>{riskFactor.i * riskFactor.l}</div>
                                  <div className={"col-span-1 " + table_css}>{riskFactor.responseBy}</div>
                                  <div className={"col-span-1 " + table_css}>{riskFactor.risk}</div>
                                </div>
                              )
                            })}    
                          </div>
                        )
                        })}                         
                      </div>
                      )                        
                      })}          
                    </div>
                  </div>
                </section>
              </div>}
              
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
