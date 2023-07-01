import React, { useState } from "react";
const Alert = ({ clickedSave, setClickedSave }) => {
  //const [flag, setFlag] = useState(true);
  return (
    <div className={ clickedSave ? "absolute top-0 container mx-auto middle" : "translate-hide"}>
      <div className="flex items-center justify-center px-4 lg:px-0 py-12">
        <div
          id="alert"
          className={
            clickedSave
              ? "transition duration-300 ease-in-out w-11/12 mx-auto py-3 px-4 bg-green-100 md:flex items-center justify-between shadow rounded"
              : "transition duration-300 ease-in-out w-11/12 mx-auto py-3 px-4 bg-green-100 md:flex items-center justify-between shadow rounded translate-hide"
          }
        >
          <div className="sm:flex sm:items-start lg:items-center bg-secondary-100 text-secondary-800">
            <div className="flex items-end">
              <p className="mr-2 text-base text-[#65a30d] ">
                บันทึกสำเร็จ
              </p>
            </div>
            {/* <p className="text-sm sm:text-base  text-[#65a30d] pt-2 sm:pt-0 pb-2 sm:pb-0">
              บันทึกสำเร็จ  
            </p> */}
          </div>

          <div className="flex items-center justify-end sm:mt-4 md:mt-0 ml-4">
            <div
              onClick={() => setClickedSave(false)}
              className="cursor-pointer text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
            .translate-show {
                transform : translateY(0%);
            }
            .translate-hide {
                transform : translateY(-10rem);
                display: none;
            }
            .hide {
                display: none;
            }
            .middle {
                right: 0px;
                left: 0px;
            }
        `}
      </style>
    </div>
  );
};
export default Alert;
