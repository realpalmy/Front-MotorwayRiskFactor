import { Fragment, useState, useContext } from "react";
import Table from "../components/Table";
import Context from "../Context";
import Alert from "./Alert";

export default function Factor2022() {
  const { data, updateData } = useContext(Context);

  const [chance1, setChance1] = useState(0);
  const [effect1, setEffect1] = useState(0);
  const [chance2, setChance2] = useState(0);
  const [effect2, setEffect2] = useState(0);

  const [year, setYear] = useState("");
  const [quarter, setQuarter] = useState("");

  const [clickedSave, setClickedSave] = useState(false);

  const updateRiskData = (event) => {
    event.preventDefault();

    updateData((prevData) => {
      const newData = prevData?.map((item) => {
        if (item.year == year && item.quarter == quarter) {
          const newRiskData = item.riskData?.map((riskItem) => {
            if (riskItem.name === "SIC1") {
              return {
                ...riskItem,
                ...{ l: parseInt(chance1), i: parseInt(effect1) },
              };
            }
            if (riskItem.name === "SEU1") {
              return {
                ...riskItem,
                ...{ l: parseInt(chance2), i: parseInt(effect2) },
              };
            }
            return riskItem;
          });
          return {
            ...item,
            riskData: newRiskData,
          };
        }
        return item;
      });
      return newData;
    });

    setClickedSave(true);
  };

  /*useEffect(() => {
    const button = document.getElementById("savaButton");
    if (button) {
      button.click();
    }
  }, []);*/

  const table_css = "border border-black p-2"; //min-w-[8rem]

  return (
    <Fragment>
      <Alert clickedSave={clickedSave} setClickedSave={setClickedSave} />

      <div className="container mx-auto px-2">
        <div className="flex p-2 sm:p-0">
          <form onSubmit={updateRiskData} className="flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center my-4">
              <h1 className="text-xl font-semibold">บันทึกปัจจัยความเสี่ยง</h1>

              <div className="grid grid-cols-4 gap-4 p-2 min-w-[20rem]">
                <div className="col-span-2 content-end">
                  <select
                    id="selectYear"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={() =>
                      setYear(document.getElementById("selectYear").value)
                    }
                  >
                    <option value="">ระบุ ปี</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <select
                    id="selectQuarter"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={() =>
                      setQuarter(document.getElementById("selectQuarter").value)
                    }
                  >
                    <option value="">ระบุ ไตรมาส</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto w-screen sm:w-full">
              <section>
                <div className="flex sm:justify-center">
                  <div className="min-w-[60rem] sm:min-w-full grid grid-cols-9 align border border-black">
                    <div className={"col-span-4 " + table_css}>
                      ปัจจัยความเสี่ยง
                    </div>
                    <div className={"col-span-1 " + table_css}>โอกาส</div>
                    <div className={"col-span-1 " + table_css}>ผลกระทบ</div>
                    <div className={"col-span-1 " + table_css}>
                      ความรุนแรงของความเสี่ยงระดับองค์กร
                    </div>
                    <div className={"col-span-1 " + table_css}>
                      หน่วยงานรับผิดชอบ
                    </div>
                    <div className={"col-span-1 " + table_css}>
                      ความเสี่ยงเหลืออยู่ (Residual Risk)
                    </div>

                    <div className={"col-span-9 border border-black px-2"}>
                      1. ความเสี่ยงด้านกลยุทธ์ต่อปัจจัยเสี่ยงภายในที่ควบคุมได้
                      (Strategic Internal Controllable Risk: SIC)
                    </div>

                    <div className={"col-span-1 " + table_css}>SIC1</div>
                    <div className={"col-span-3 " + table_css}>
                      ความล่าช้าในขั้นตอนการเสนอโครงการร่วมลงทุน
                    </div>
                    <div className={"col-span-1 " + table_css}>
                      <select
                        id="chance1"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={() =>
                          setChance1(document.getElementById("chance1").value)
                        }
                      >
                        <option value="0">ระบุ โอกาส</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className={"col-span-1 " + table_css}>
                      <select
                        id="effect1"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={() =>
                          setEffect1(document.getElementById("effect1").value)
                        }
                      >
                        <option value="0">ระบุความเสี่ยง</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className={"col-span-1 text-center " + table_css}>
                      {chance1 * effect1}
                    </div>
                    <div className={"col-span-1 " + table_css}>
                      ฝ่ายบริหารการร่วมลงทุน
                    </div>
                    <div className={"col-span-1 " + table_css}>
                      {chance1 * effect1 > 8 ? "ใช่" : "ไม่"}
                    </div>

                    <div className={"col-span-9 border border-black px-2"}>
                      2.
                      ความเสี่ยงด้านกลยุทธ์ต่อปัจจัยเสี่ยงภายนอกที่ควบคุมไม่ได้
                      (Strategic External Uncontrollable Risk: SEU)
                    </div>

                    <div className={"col-span-1 " + table_css}>SEU1</div>
                    <div className={"col-span-3 " + table_css}>
                      ความล่าช้าในขั้นตอนการคัดเลือกเอกชนผู้ร่วมลงทุน
                    </div>
                    <div className={"col-span-1 " + table_css}>
                      <select
                        id="chance2"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={() =>
                          setChance2(document.getElementById("chance2").value)
                        }
                      >
                        <option value="0">ระบุ โอกาส</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className={"col-span-1 " + table_css}>
                      <select
                        id="effect2"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={() =>
                          setEffect2(document.getElementById("effect2").value)
                        }
                      >
                        <option value="0">ระบุ ความเสี่ยง</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className={"col-span-1 text-center " + table_css}>
                      {chance2 * effect2}
                    </div>
                    <div className={"col-span-1 " + table_css}>
                      ฝ่ายบริหารการร่วมลงทุน
                    </div>
                    <div className={"col-span-1 " + table_css}>
                      {chance2 * effect2 > 8 ? "ใช่" : "ไม่"}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {year === "2023" ? (
              <div className="flex justify-end my-4">
                <button
                  id="savaButton"
                  type="submit"
                  className="me-4 sm:me-0 py-2 w-32 text-white bg-lime-600 border border-gray-300 focus:outline-none hover:bg-lime-500 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  บันทึก
                </button>
              </div>
            ) : (
              <div className="flex justify-end my-4">
                <div className="me-4 sm:me-0 text-center py-2 w-32 text-white bg-lime-600 border border-gray-300 font-medium rounded-lg text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 opacity-50 cursor-not-allowed">
                  บันทึก
                </div>
              </div>
            )}
          </form>
        </div>

        {year && quarter && (
          <div className="flex-col border m-2 p-5 rounded">
            <h2 className="font-semibold mb-3">Preview</h2>
            <div className="flex flex-wrap justify-around">
              {data?.map((riskFactor) =>
                riskFactor.year == year && riskFactor.quarter == quarter ? (
                  <Table
                    key={riskFactor.year + "" + riskFactor.quarter}
                    data={riskFactor}
                  />
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
