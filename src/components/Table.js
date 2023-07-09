import { Fragment, useEffect, useState } from "react";

export default function Table({ data }) {
  //console.log(data)

  const emptyArr = new Array(5).fill("")?.map(() => new Array(5).fill(""));

  const [dataArray, setDataArray] = useState(emptyArr);

  useEffect(() => {
    setDataArray(emptyArr);

    data.riskData?.forEach((risk) => {
      if (risk.l !== 0 || risk.i !== 0) {
        setDataArray(emptyArr);

        // const newRiskName = [...dataArray];
        const newRiskName = [...emptyArr];
        //const newRiskName = emptyArr;
        if (!newRiskName[risk.i - 1][risk.l - 1].includes(risk.name)) {
          if (newRiskName[risk.i - 1][risk.l - 1] !== "") {
            newRiskName[risk.i - 1][risk.l - 1] += ", " + risk.name;
          } else {
            newRiskName[risk.i - 1][risk.l - 1] += risk.name;
          }
        }

        setDataArray(newRiskName);
      }
    });
  }, [data]);

  const oneToFive = [1, 2, 3, 4, 5];
  const fiveToOne = [5, 4, 3, 2, 1];

  const stair = "border-t-black border-r-black";
  const left = "border-l-black";
  const bottom = "border-b-black";
  const color = (l, i) => {
    let risk = l * i;
    if (risk < 4) {
      return "bg-lime-400";
    } else if (risk < 10) {
      return "bg-[#FFFF00]/75";
    } else if (risk < 17) {
      return "bg-amber-500";
    } else {
      return "bg-red-500";
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col w-[25rem]">
        <div className="">
          <div className="">
            <div className="overflow-hidden">
              <table className="w-full table-fixed border text-center text-sm font-light dark:border-neutral-500">
                {data.quarter === 0 ? (
                  <caption>
                    ระดับความเสี่ยง ณ ต้นปีงบประมาณ ปี {data.year}
                  </caption>
                ) : (
                  <caption>
                    ระดับความเสี่ยง ณ ไตรมาส {data.quarter} ปี {data.year}
                  </caption>
                )}

                <thead>
                  <tr>
                    <td
                      rowSpan="2"
                      colSpan="2"
                      className="border border-slate-300 bg-orange-300 h-24"
                    >
                      <span>ปัจจัยเสี่ยงที่</span>
                      <p></p>
                      <span>เหลืออยู่</span>
                      <p></p>
                      <span>(Residual Risks)</span>
                    </td>
                    <th
                      colSpan="5"
                      scope="colgroup"
                      className="border border-slate-300  bg-neutral-400 text-white h-12"
                    >
                      โอกาส (L)
                    </th>
                  </tr>
                  <tr>
                    {oneToFive?.map((num) => (
                      <th
                        key={num}
                        scope="col"
                        className="border border-slate-300 bg-gray-50"
                      >
                        {num}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fiveToOne?.map((num) => (
                    <tr key={num}>
                      {num === 5 && (
                        <th
                          rowSpan="5"
                          scope="rowgroup"
                          className="border border-slate-300 bg-neutral-400 text-white"
                          //style={{ writingMode: "vertical-rl" }}
                          style={{ writingMode: "vertical-rl" , transform: "rotate(180deg)" }}
                        >
                          ผลกระทบ (I)
                        </th>
                      )}
                      <th
                        scope="row"
                        className="border border-slate-300 bg-gray-50 h-12"
                      >
                        {num}
                      </th>

                      {data.year === 2566 &&
                        dataArray[num - 1]?.map((data, index) =>
                          (index + 1 === 1 && num === 5) ||
                          (index + 1 === 2 && num === 4) ||
                          (index + 1 === 4 && num === 2) ||
                          (index + 1 === 5 && num === 1) ? (
                            <td
                              key={index + "" + num}
                              className={`border-2 ${stair} $ ${color(
                                index + 1,
                                num
                              )}`}
                            >
                              {data}
                            </td>
                          ) : index + 1 === 3 && num === 3 ? (
                            <td
                              key={index + "" + num}
                              className={`border-2 ${left} ${bottom} ${color(
                                index + 1,
                                num
                              )}`}
                            >
                              {data}
                            </td>
                          ) : (
                            <td
                              key={index + "" + num}
                              className={`border ${color(index + 1, num)}`}
                            >
                              {data}
                            </td>
                          )
                        )}

                      {data.year === 2567 &&
                        dataArray[num - 1]?.map((data, index) =>
                          (index + 1 === 1 && num === 5) ||
                          (index + 1 === 2 && num === 4) ||
                          (index + 1 === 3 && num === 3) ||
                          (index + 1 === 4 && num === 2) ||
                          (index + 1 === 5 && num === 1) ? (
                            <td
                              key={index + "" + num}
                              className={`border-2 ${stair} $ ${color(
                                index + 1,
                                num
                              )}`}
                            >
                              {data}
                            </td>
                          ) : (
                            <td
                              key={index + "" + num}
                              className={`border ${color(index + 1, num)}`}
                            >
                              {data}
                            </td>
                          )
                        )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
