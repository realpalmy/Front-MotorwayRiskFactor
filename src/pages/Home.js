import { Fragment } from "react";

export default function Home() {
  const data = {
    year: 2023,
    quarter: 1,
    monthStart: 4,
    monthEnd: 7,
    riskData: [
      {
        name: "FEU2",
        l: 4,
        i: 2,
      },
    ],
  };
  //console.log(data.riskData.find((x) => (x.name = "FEU2")).chance);

  const oneToFive = [1, 2, 3, 4, 5];
  const fiveToOne = [5, 4, 3, 2, 1];

  let dataArray = new Array(5).fill("").map(()=> new Array(5).fill(""))

  data.riskData.map(risk => {
    dataArray[risk.i-1][risk.l-1] = risk.name;
  })
  

  return (
    <Fragment>
      <div className="flex flex-col w-[25rem]">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="w-full table-fixed border text-center text-sm font-light dark:border-neutral-500">
                <thead>
                  <tr>
                    <td
                      rowSpan="2"
                      colSpan="2"
                      className="border border-slate-300 py-4"
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
                        className="border border-slate-300 bg-gray-50 py-2"
                      >
                        {num}
                      </th>
                      {dataArray[num - 1].map((data) => (
                        <td className="border border-slate-300">{data}</td>
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
