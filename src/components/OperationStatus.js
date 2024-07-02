import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import StatusModal from "./StatusModal";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function OperationStatus() {

  const thead = " whitespace-nowrap px-6 py-3 text-sm text-left font-medium text-gray-500 uppercase tracking-wider"

  const [searchYear, setSearchYear] = useState("");
  const searchForm = (event) => {
    event.preventDefault();
    const year = document.getElementById("year").value;
    setSearchYear(year)
    fetchStatusData(year)
  };

  /* const mockData = {
    2566 : [
      {
        status : "โครงการประชาสัมพันธ์ระบบจัดเก็บค่าผ่านทางแบบไม่มีไม้กั้น",
        year : 2566,
        plan_no : 1
      },
      {
        status : "การตรวจสอบรายได้ค่าธรรมเนียมผ่านทาง และรายงานผลการจัดเก็บค่าธรรมเนียมผ่านทาง",
        year : 2566,
        plan_no : 2
      }
    ]
  } */

  const [operationStatusSet, setOperationStatusSet] = useState();
  const [isLoading, setIsLoading] = useState(false);
  /* Database */
  const path = process.env.REACT_APP_API_URL;
  const fetchStatusData = async (year) => {
    try {
      setIsLoading(true);
      const searchPath = (year && year !== "") ? `status/${year}` : "status";
      const riskFactorsData = await axios.get(path + searchPath);
      const data = riskFactorsData.data;
      
      const groupedByYear = data.reduce((accumulator, currentValue) => {
        const year = currentValue.year;
        if (!accumulator[year]) {
          accumulator[year] = [];
        }
        accumulator[year].push(currentValue);
        return accumulator;
      }, {});
    
      setOperationStatusSet(groupedByYear)
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchStatusData("");
    //setOperationStatusSet(mockData)
  }, []);

  const updateStatus = (year, plan_no, status) => {
    //console.log(year, plan_no, status)
    try {
      axios.put(path + `status/${year}/${plan_no}`, {status})
        .then(response => {
          console.log(response); 
          fetchStatusData(searchYear)
          saveSuccess();
        })
        .catch(error => {
          saveError();
          console.error('Error updating data:', error.message); 
        });
    } catch (error) {
      console.error(error);
    }
  }
  /* Database */

  const [statusChange, setStatusChange] = useState("");
  const [statusOnEdit, setStatusOnEdit] = useState({year: 0 , plan_no: 0});
  const [editing, setEditing] = useState(false);

  const handleStatusChange = (event) => {
    setStatusChange(event.target.value);
  }

  const onEditStatus = async (year, plan_no, status) => {
    if(editing === true) {
      const confirmModal = await openCancelModal();
      if(confirmModal) {
        setStatusOnEdit({year, plan_no})
        setStatusChange(status)
      }
    } else {
      setEditing(true)
      setStatusOnEdit({year, plan_no})
      setStatusChange(status)
    }
  }

  const onSaveStatus = async (year, plan_no) => {
    console.log(statusChange)
    const confirmModal = await openSaveModal();
    if(confirmModal) {
      updateStatus(year, plan_no, statusChange);
      setEditing(false)
    }
  }
  
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [modalResolve, setModalResolve] = useState(null);
  const cancelMessage = {
    title : "มีรายการอยู่ระหว่างการแก้ไข",
    content : "ต้องการละทิ้งการแก้ไขหรือไม่",
    cancel : "ยกเลิก",
    confirm: "ละทิ้งการแก้ไข",
    confirm_color: "red"
  }
  const saveMessage = {
    title : "ยืนยันการบันทึก",
    content : "",
    cancel : "ยกเลิก",
    confirm: "ยืนยัน",
    confirm_color: "green"
  }

  const openCancelModal = () => {
    return new Promise((resolve) => {
        setIsCancelModalOpen(true);
        setModalResolve(() => resolve); // Set modalResolve to the resolve function of the promise
    });
  };

  const openSaveModal = () => {
    return new Promise((resolve) => {
        setIsSaveModalOpen(true);
        setModalResolve(() => resolve); // Set modalResolve to the resolve function of the promise
    });
  };

  const handleConfirm = () => {
    setIsCancelModalOpen(false);
    setIsSaveModalOpen(false);
    if (modalResolve) {
        modalResolve(true);
    }
  };

  const handleCancel = () => {
    setIsCancelModalOpen(false);
    setIsSaveModalOpen(false);
    if (modalResolve) {
        modalResolve(false);
    }
  };

  const saveSuccess = () => toast.success("บันทึกสถานะการดำเนินงานของแผนปฏิบัติการสำเร็จ");
  const saveError = () => toast.error("บันทึกสถานะการดำเนินงานของแผนปฏิบัติการไม่สำเร็จ");

  return (
    <Fragment>
      <ToastContainer position="top-center" />

      <div className="container mx-auto my-6 px-2">
        <div className="p-2 sm:p-0">
          <h1 className="text-xl font-semibold text-center sm:text-start sm:pb-1">
            สถานะการดำเนินงานของแผนปฏิบัติการ
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


            {isLoading &&
              <div className="py-3 sm:py-5">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-6 py-1"> 
                    <div className="h-2 bg-slate-400 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-400 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            }

            {operationStatusSet && !isLoading &&
              <Fragment>
                {Object.entries(operationStatusSet).map(([key, operationStatus]) => 
                  <div key={key} className="flex-col border my-4 p-3 sm:p-5 rounded">
                      <div className="flex w-full mb-1">
                        <h2 className="font-semibold">แผนปฏิบัติการรองรับความเสี่ยงของเงินทุนค่าธรรมเนียมผ่านทาง ประจำปี {key}</h2>
                      </div>
                
                      <div className="flex flex-col">
                          <div className="sm:-mx-6 lg:-mx-8">
                              <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
                                  <div className="overflow-x-auto w-full border-b border-gray-200">
                                      <table className="table-fixed divide-y divide-gray-200">
                                          <thead className="bg-gray-50">
                                              <tr>
                                                  <th scope="col" className={'whitespace-nowrap px-2 sm:px-6 py-3 text-sm text-left font-medium text-gray-500 uppercase tracking-wider' + ' sticky left-0 bg-gray-50'}>
                                                      ลำดับ
                                                  </th>
                                                  <th scope="col" className={thead + ' min-w-[14rem] w-1/3 '}>
                                                      ชื่อแผนงาน
                                                  </th>
                                                  <th scope="col" className={thead}>
                                                      หน่วยงานรับผิดชอบ
                                                  </th>
                                                  <th scope="col" className={thead + ' min-w-[14rem] w-1/3 '}>
                                                      สถานะการดำเนินงาน
                                                  </th>
                                                  <th scope="col" className="relative px-6 py-3">
                                                      <span className="sr-only">Edit</span>
                                                  </th>
                                              </tr>
                                          </thead>
                                          <tbody className="bg-white divide-y divide-gray-200">
                                              {operationStatus.map((operation) => 
                                              <tr key={operation.plan_no}>
                                                <td className="sticky left-0 bg-white px-2 sm:px-6 py-4 whitespace-nowrap">
                                                  <div className="flex items-center">
                                                    <div className="ml-4">
                                                      <div className="text-sm font-medium text-gray-900">{operation.plan_no}</div>
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                  <div className="text-sm text-gray-900">{operation.operation_name}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                  <div className="text-sm text-gray-900">{operation.responsible_by}</div>
                                                </td>
                                                <td className="px-6 py-2 text-sm text-gray-900">
                                                  {(editing && statusOnEdit.year === operation.year && statusOnEdit.plan_no === operation.plan_no) ?
                                                    <textarea defaultValue={operation.status} onChange={handleStatusChange} className="w-full resize-y p-1 rounded-md border border-gray-200 text-sm"></textarea>
                                                    : <span className="whitespace-pre-line">{operation.status}</span>
                                                  }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                  {(editing && statusOnEdit.year === operation.year && statusOnEdit.plan_no === operation.plan_no) ?
                                                    <span onClick={() => onSaveStatus(operation.year, operation.plan_no)} className="text-green-600 hover:text-green-900">บันทึก</span>
                                                    : <span onClick={() => onEditStatus(operation.year, operation.plan_no, operation.status)} className="text-indigo-600 hover:text-indigo-900">แก้ไข</span>
                                                  }
                                                </td>
                                              </tr>
                                              )}
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                )}
              </Fragment>
            }
            
          </div>
        </div>
      </div>

      <StatusModal isOpen={isCancelModalOpen} onConfirm={handleConfirm} onCancel={handleCancel} message={cancelMessage} ></StatusModal>
      <StatusModal isOpen={isSaveModalOpen} onConfirm={handleConfirm} onCancel={handleCancel} message={saveMessage} ></StatusModal>
    
    </Fragment>
  );
}
