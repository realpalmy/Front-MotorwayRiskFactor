import { Fragment } from "react";

export default function TableIndicator() {
  return (
    <Fragment>
      <div className="flex flex-wrap gap-1 sm:gap-3 justify-start sm:justify-end mb-3 w-full">
          <div className="flex items-center">
            <span className="block w-4 h-4 bg-lime-400"></span>
            <span className="ml-1 text-xs font-medium">เสี่ยงต่ำ</span>
          </div>
          <div className="flex items-center">
            <span className="block w-4 h-4 bg-[#FFFF00]/75"></span>
            <span className="ml-1 text-xs font-medium">เสี่ยงปานกลาง</span>
          </div>
          <div className="flex items-center">
            <span className="block w-4 h-4 bg-amber-500"></span>
            <span className="ml-1 text-xs font-medium">เสี่ยงสูง</span>
          </div>
          <div className="flex items-center">
            <span className="block w-4 h-4 bg-red-500"></span>
            <span className="ml-1 text-xs font-medium">เสี่ยงสูงมาก</span>
          </div>
          <div className="flex items-center">
            <span className="block w-6 h-1 bg-black"></span>
            <span className="ml-1 text-xs font-medium">
              ระดับความรุนแรงที่องค์กรยอมรับ
            </span>
          </div>
        </div>
    </Fragment>
  );
}
