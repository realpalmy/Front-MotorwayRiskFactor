import React, { useState } from 'react';

const PlanTable = ({ operationData }) => {
    const trow_css = " py-4 sm:p-0 flex flex-col sm:table-row "
    const thead_css = " w-full sm:w-1/4 sm:py-4 pb-1 sm:pe-2 text-gray-600 font-medium align-top "
    const tdata_css = " w-full sm:w-3/4 sm:py-4 align-top "

    return (
        operationData && 
        <div className="w-full inline-block align-top">
            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-ful table-auto divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                        <tr className={trow_css}>
                            <td className={thead_css}>
                                งาน / โครงการ / กิจกรรม / กระบวนการปฏิบัติงาน:
                            </td>
                            <td className={tdata_css + "whitespace-pre-line"}>
                                {operationData.project}
                            </td>
                        </tr>
                        <tr className={trow_css}>
                            <td className={thead_css}>
                                ปัจจัยความเสี่ยง / ปัจจัยเสี่ยงหรือสาเหตุของความเสี่ยงที่เหลืออยู่ (1)
                            </td>
                            <td className={tdata_css}>
                                {operationData.risk}
                            </td>
                        </tr>
                        <tr>
                            <td className={"py-3 pe-0 text-gray-800 font-semibold"} colSpan={2}>
                                ขั้นตอนการบริหารความเสี่ยง
                            </td>
                        </tr>
                        <tr className={trow_css}>
                            <td className={thead_css}>
                                วิธีจัดการความเสี่ยง (2)
                            </td>
                            <td className={tdata_css}>
                                {operationData.solution} <span className='underline underline-offset-auto font-semibold'>{operationData.solution_underline}</span>
                            </td>
                        </tr>
                        <tr className={trow_css}>
                            <td className={thead_css}>
                                กิจกรรมการจัดการความเสี่ยง (3)
                            </td>
                            <td className={tdata_css + "whitespace-pre-wrap"}>
                                <ul className={operationData.activity?.length > 1 ? "list-disc ps-4" : "list-none"}>
                                    {operationData.activity?.map((list, i) => <li key={i} className="whitespace-pre-line">{list}</li>)}
                                </ul>
                            </td>
                        </tr>
                        <tr className={trow_css}>
                            <td className={thead_css}>
                                ผลที่คาดว่าจะได้รับ (4)
                            </td>
                            <td className={tdata_css + "whitespace-pre-line"}>
                                <ul className={operationData.result?.length > 1 ? "list-disc ps-4" : "list-none"}>
                                    {operationData.result?.map((list, i) => <li key={i} className="whitespace-pre-line">{list}</li>)}
                                </ul>
                            </td>
                        </tr>
                        <tr className={trow_css}>
                            <td className={thead_css}>
                                ระยะเวลาการดำเนินการ (5)
                            </td>
                            <td className={tdata_css}>
                                {operationData.duration}
                            </td>
                        </tr>
                        <tr className={trow_css}>
                            <td className={thead_css}>
                                ผู้รับผิดชอบ (6)
                            </td>
                            <td className={tdata_css}>
                                {operationData.responsibleBy}
                            </td>
                        </tr>
                        <tr className={trow_css}>
                            <td className={thead_css}>
                                งบประมาณ
                            </td>
                            <td className={tdata_css}>
                                {operationData.budget}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const ResidualRiskTable = ({before, dataset}) => {
    return (
        dataset && <div>
        <table
            className="table-fixed max-w-full border rounded-lg text-center text-sm border-gray-200">
            <thead className="border-b font-medium border-gray-200">
                <tr>
                    <td className="text-center px-6 py-4 font-[550]" colSpan={3}>{before == true ? "ความรุนแรงก่อนการบริหาร" : "ความรุนแรงที่องค์กรยอมรับได้"}</td>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b">
                    <td className="w-[8rem] whitespace-nowrap border-r px-3 py-4">โอกาส</td>
                    <td className="w-1/3 whitespace-nowrap border-r px-3 py-4">ผลกระทบ</td>
                    <td className="w-1/3 whitespace-nowrap px-3 py-4">ระดับความเสี่ยง</td>
                </tr>
                <tr className="border-b">
                    <td className="border-r px-6 py-4">{dataset.l}</td>
                    <td className="border-r px-6 py-4">{dataset.i}</td>
                    <td className="px-6 py-4">{parseInt(dataset.l) * parseInt(dataset.i)}</td>
                </tr>

            </tbody>
        </table>
    </div>
    )
}

const ResidualRisk = ({riskDataset}) => {
    return (
        riskDataset && <div className="flex flex-col sm:flex-row gap-3">
            <div>
                <ResidualRiskTable before={true} dataset={riskDataset.before}></ResidualRiskTable>
            </div>
            <div>
                <ResidualRiskTable before={false} dataset={riskDataset.organization}></ResidualRiskTable>
            </div>
        </div>
    )
}

export {PlanTable, ResidualRisk}