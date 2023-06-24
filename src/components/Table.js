import { Fragment, useEffect, useState } from "react";

export default function Table({ data }) {
  //console.log(data)

  const emptyArr = new Array(5).fill("").map(() => new Array(5).fill(""));

  const [dataArray, setDataArray] = useState(emptyArr);

  useEffect(() => {
    setDataArray(emptyArr);
    console.log("count");

    data.riskData?.forEach((risk) => {
      if (risk.l !== 0 || risk.i !== 0) {
        console.log(risk.name, risk);
        setDataArray(emptyArr);

        console.log(dataArray);

        // const newRiskName = [...dataArray];
        const newRiskName = [...emptyArr];
        //const newRiskName = emptyArr;
        newRiskName[risk.i - 1][risk.l - 1] = risk.name;
        setDataArray(newRiskName);
      }
    });
  }, [data]);

  const oneToFive = [1, 2, 3, 4, 5];
  const fiveToOne = [5, 4, 3, 2, 1];

  return (
    <Fragment>
      <div className="flex flex-col w-96">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="w-full table-fixed border text-center text-sm font-light dark:border-neutral-500">
                <caption>
                  ระดับความเสี่ยง ณ Quarter {data.quarter} ปี {data.year}
                </caption>
                <thead>
                  <tr>
                    <td
                      rowSpan="2"
                      colSpan="2"
                      className="border border-slate-300 py-6"
                    >
                      ปัจจัยเสี่ยงที่เหลืออยู่ (Residual Risks)
                    </td>
                    <th
                      colSpan="5"
                      scope="colgroup"
                      className="border border-slate-300"
                    >
                      โอกาส (L)
                    </th>
                  </tr>
                  <tr>
                    {oneToFive.map((num) => (
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
                  {fiveToOne.map((num) => (
                    <tr key={num}>
                      {num === 5 && (
                        <th
                          rowSpan="5"
                          scope="rowgroup"
                          className="rotate-180 border border-slate-300"
                          style={{ writingMode: "vertical-rl" }}
                        >
                          ผลกระทบ (I)
                        </th>
                      )}
                      <th
                        scope="row"
                        className="border border-slate-300 bg-gray-50 py-4"
                      >
                        {num}
                      </th>
                      {dataArray[num - 1].map((data, index) => (
                        <td
                          key={index + "" + num}
                          className="border border-slate-300"
                        >
                          {data}
                        </td>
                      ))}
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
