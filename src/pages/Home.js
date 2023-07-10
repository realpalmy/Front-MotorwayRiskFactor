import { Fragment } from "react";
import Factor2022 from "../components/FactorInput";
import SearchGroup from "../components/SearchGroup";
import NavBar from "../components/NavBar";
import { Link, NavLink } from "react-router-dom";


export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <NavBar />
      <div
        className="bg-no-repeat bg-cover bg-center h-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 60, 145, 0.8), rgba(0, 60, 145, 0.8)), url('https://www.motorway.go.th/wp-content/uploads/2016/11/home-banner-3.jpg')",
        }}
      >
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full slg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="max-w-xl mx-auto lg:max-w-2xl">
            <div className="flex py-6 flex-col mb-16 text-center sm:mb-0">
              <div className="my-6 sm:my-0 sm:mt-6 mx-auto flex items-center justify-center w-16 sm:w-[12rem] h-16 sm:h-[12rem] rounded-full bg-teal-accent-400">
                <img
                  src="https://www.motorway.go.th/wp-content/uploads/2016/10/cropped-logo_doh-2.png"
                  alt="react logo"
                />
              </div>
              <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
                <h2 className="max-w-lg mb-6 font-sans text-xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
                  <span className="relative inline-block">
                    <span className="relative leading-normal sm:leading-snug">
                      ระบบงานบริหารความเสี่ยงของเงินทุนค่าธรรมเนียมผ่านทาง 
                      <p></p>
                      (Risk Management : RM)
                    </span>
                  </span>
                </h2>
                <p className="text-base font-semibold text-white md:text-lg">
                  กองหลวงพิเศษระหว่างเมือง
                </p>
              </div>
              <div>
                <Link
                  to='/search'
                  className="inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-300/50 hover:text-deep-purple-900 focus:shadow-outline focus:outline-none"
                >
                  เข้าสู่ระบบ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
