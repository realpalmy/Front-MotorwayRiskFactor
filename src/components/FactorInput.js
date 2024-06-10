import { Fragment, useState, useContext } from "react";
import Table from "./Table";
import Context from "../Context";
import Alert from "./Alert";
import { Transition } from "@headlessui/react";
import axios from "axios";

export default function Factor2022() {
  const { data, updateData } = useContext(Context);

  const [SIC1Chance, setSIC1Chance] = useState(0);
  const [SIC1Effect, setSIC1Effect] = useState(0);
  const [SEU1Chance, setSEU1Chance] = useState(0);
  const [SEU1Effect, setSEU1Effect] = useState(0);

  const [OEU1Chance, setOEU1Chance] = useState(0);
  const [OEU1Effect, setOEU1Effect] = useState(0);
  const [FEU1Chance, setFEU1Chance] = useState(0);
  const [FEU1Effect, setFEU1Effect] = useState(0);
  const [FEU2Chance, setFEU2Chance] = useState(0);
  const [FEU2Effect, setFEU2Effect] = useState(0);

  const [year, setYear] = useState("2567");
  const [quarter, setQuarter] = useState("");

  const [clickedSave, setClickedSave] = useState(false);

  /* Update database */
  const path = process.env.REACT_APP_API_URL;

  const updateFactors = (year, quarter, factorData) => {
    //console.log(year, quarter, factorData)
    try {
      axios.put(path + `${year}/${quarter}`, factorData)
        .then(response => {
          console.log(response); 
        })
        .catch(error => {
          console.error('Error updating data:', error.message); 
        });
    } catch (error) {
      console.error(error);
    }
  }
  /* Update database */

  const updateRiskData = (event) => {
    event.preventDefault();

    updateData((prevData) => {
      const newData = prevData?.map((item) => {
        if (item.year == year && item.quarter == quarter) {
          if (year === "2567") {
            const newRiskData = item.riskData?.map((riskItem) => {
              if (riskItem.name === "SIC1") {
                return {
                  ...riskItem,
                  ...{ l: parseInt(SIC1Chance), i: parseInt(SIC1Effect) },
                };
              }
              if (riskItem.name === "SEU1") {
                return {
                  ...riskItem,
                  ...{ l: parseInt(SEU1Chance), i: parseInt(SEU1Effect) },
                };
              }
              return riskItem;
            });
            updateFactors(year, quarter, newRiskData)
            return {
              ...item,
              riskData: newRiskData,
            };
          }

          if (year === "2566") {
            const newRiskData = item.riskData?.map((riskItem) => {
              if (riskItem.name === "OEU1") {
                return {
                  ...riskItem,
                  ...{ l: parseInt(OEU1Chance), i: parseInt(OEU1Effect) },
                };
              }
              if (riskItem.name === "FEU1") {
                return {
                  ...riskItem,
                  ...{ l: parseInt(FEU1Chance), i: parseInt(FEU1Effect) },
                };
              }
              if (riskItem.name === "FEU2") {
                return {
                  ...riskItem,
                  ...{ l: parseInt(FEU2Chance), i: parseInt(FEU2Effect) },
                };
              }
              return riskItem;
            });
            updateFactors(year, quarter, newRiskData)
            return {
              ...item,
              riskData: newRiskData,
            };
          }
        } 
        return item;
      });
      if(quarter !== '') {
        setClickedSave(true);
      }
      return newData;
    });
  };

  const table_css = "border border-black p-2";

  return (
    <Fragment>
      <Transition
        className=""
        show={clickedSave}
        enter="transition-all ease-in-out duration-500 delay-[200ms]"
        enterFrom="opacity-0 translate-y-6"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Alert clickedSave={clickedSave} setClickedSave={setClickedSave} />
      </Transition>

      <div className="container mx-auto sm:px-2">
        <div className="flex sm:p-0">
          <form onSubmit={updateRiskData} className="flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center my-4">
              <h1 className="text-xl font-semibold">
                บันทึกปัจจัยเสี่ยงที่เหลืออยู่
              </h1>

              <div className="grid grid-cols-4 gap-4 p-2 min-w-[20rem]">
                <div className="col-span-2 content-end">
                  <select
                    id="selectYear"
                    defaultValue={2567}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={() =>
                      setYear(document.getElementById("selectYear").value)
                    }
                  >
                    <option value="2566">ปี 2566</option>
                    <option value="2567">
                      ปี 2567
                    </option>
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
                    <option value="">ระบุ ช่วงเวลา</option>
                    <option value="0">ต้นปีงบประมาณ</option>
                    <option value="1">ไตรมาส 1</option>
                    <option value="2">ไตรมาส 2</option>
                    <option value="3">ไตรมาส 3</option>
                    <option value="4">ไตรมาส 4</option>
                  </select>
                </div>
              </div>
            </div>

            {year === "2566" && (
              <div className="overflow-x-auto w-screen sm:w-full px-2 sm:p-0">
                <section>
                  <div className="flex sm:justify-center">
                    <div className="min-w-[60rem] sm:min-w-full grid grid-cols-8 align border border-black">
                      <div className={"col-span-4 " + table_css}>
                        ปัจจัยความเสี่ยง
                      </div>
                      <div className={"col-span-1 " + table_css}>โอกาส</div>
                      <div className={"col-span-1 " + table_css}>ผลกระทบ</div>
                      <div className={"col-span-1 " + table_css}>
                        ความรุนแรงของความเสี่ยงระดับองค์กร
                      </div>
                      <div className={"col-span-1 " + table_css}>
                        ความเสี่ยงเหลืออยู่ (Residual Risk)
                      </div>

                      <div className={"col-span-8 border border-black px-2"}>
                        1.ความเสี่ยงด้านการดำเนินงานต่อปัจจัยเสี่ยงภายนอกที่ควบคุมไม่ได้
                        (Operational External Uncontrollable Risk: OEU)
                      </div>

                      <div className={"col-span-1 " + table_css}>OEU1</div>
                      <div className={"col-span-3 " + table_css}>
                        ผู้ใช้ทางขาดความรู้ความเข้าใจในการใช้เทคโนโลยีการจัดเก็บค่าผ่านทางแบบใหม่
                        (M-Flow)
                      </div>
                      <div className={"col-span-1 " + table_css}>
                        <select
                          id="OEU1Chance"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={() =>
                            setOEU1Chance(
                              document.getElementById("OEU1Chance").value
                            )
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
                          id="OEU1Effect"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={() =>
                            setOEU1Effect(
                              document.getElementById("OEU1Effect").value
                            )
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
                        {OEU1Chance * OEU1Effect}
                      </div>
                      <div className={"col-span-1 " + table_css}>ใช่</div>

                      <div className={"col-span-8 border border-black px-2"}>
                        2.
                        แผนบริหารความเสี่ยงด้านการเงินต่อปัจจัยเสี่ยงภายนอกที่ควบคุมไม่ได้
                        (Financial External Uncontrollable Risk: FEU)
                      </div>

                      <div className={"col-span-1 " + table_css}>FEU1</div>
                      <div className={"col-span-3 " + table_css}>
                        การจัดเก็บรายได้ค่าธรรมเนียมผ่านทางไม่ได้ตามแผนที่คาดการณ์ไว้
                      </div>
                      <div className={"col-span-1 " + table_css}>
                        <select
                          id="FEU1Chance"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={() =>
                            setFEU1Chance(
                              document.getElementById("FEU1Chance").value
                            )
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
                          id="FEU1Effect"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={() =>
                            setFEU1Effect(
                              document.getElementById("FEU1Effect").value
                            )
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
                        {FEU1Chance * FEU1Effect}
                      </div>
                      <div className={"col-span-1 " + table_css}>ใช่</div>

                      <div className={"col-span-1 " + table_css}>FEU2</div>
                      <div className={"col-span-3 " + table_css}>
                        การจัดเก็บค่าธรรมเนียมผ่านระบบ M-Flow รั่วไหล
                        กรณีผู้ใช้ทางหลีกเลี่ยงการจ่ายค่าผ่านทาง
                      </div>
                      <div className={"col-span-1 " + table_css}>
                        <select
                          id="FEU2Chance"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={() =>
                            setFEU2Chance(
                              document.getElementById("FEU2Chance").value
                            )
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
                          id="FEU2Effect"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={() =>
                            setFEU2Effect(
                              document.getElementById("FEU2Effect").value
                            )
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
                        {FEU2Chance * FEU2Effect}
                      </div>
                      <div className={"col-span-1 " + table_css}>ใช่</div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {year === "2567" && (
              <div className="overflow-x-auto w-screen sm:w-full px-2 sm:p-0">
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
                          id="SIC1Chance"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={() =>
                            setSIC1Chance(
                              document.getElementById("SIC1Chance").value
                            )
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
                          id="SIC1Effect"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={() =>
                            setSIC1Effect(
                              document.getElementById("SIC1Effect").value
                            )
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
                        {SIC1Chance * SIC1Effect}
                      </div>
                      <div className={"col-span-1 " + table_css}>
                        ฝ่ายบริหารการร่วมลงทุน
                      </div>
                      <div className={"col-span-1 " + table_css}>ใช่</div>

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
                          id="SEU1Chance"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={() =>
                            setSEU1Chance(
                              document.getElementById("SEU1Chance").value
                            )
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
                          id="SEU1Effect"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={() =>
                            setSEU1Effect(
                              document.getElementById("SEU1Effect").value
                            )
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
                        {SEU1Chance * SEU1Effect}
                      </div>
                      <div className={"col-span-1 " + table_css}>
                        ฝ่ายบริหารการร่วมลงทุน
                      </div>
                      <div className={"col-span-1 " + table_css}>ใช่</div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {year === "2567" || year === "2566" ? (
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
            <h2 className="font-semibold mb-3">
              ตารางข้อมูลปัจจัยความเสี่ยงที่เลือก
            </h2>
            <div className="flex flex-wrap justify-around">
              {data?.map(
                (riskFactor) =>
                  riskFactor.year == year &&
                  riskFactor.quarter == quarter && (
                    <Table
                      key={riskFactor.year + "" + riskFactor.quarter}
                      data={riskFactor}
                    />
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
