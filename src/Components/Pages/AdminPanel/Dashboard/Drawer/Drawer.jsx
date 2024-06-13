import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosSpeedometer } from "react-icons/io";

const Drawer = () => {
    return (
        <div>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black w[20px] h-[20px] px-3 py-5 rounded-xl flex items-center">
              <label htmlFor="my-drawer-2">
                <BiMenuAltLeft size={25} />
              </label>
            </button>
          </div>
          <div className="drawer-side ">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay "></label>
            <ul className="menu p-4 w-80 min-h-full bg-gray-800 text-white border-r-2 border-yellow-500">
              {/* Sidebar content here */}

              <h1 className="font-bold text-2xl text-yellow-500 mb-5">Navigation </h1>

              <li className="font-semibold text-lg mb-3">
                <span className="rounded-r-full bg-[#191c24] p-2 border-l-4 border-red-500"><IoIosSpeedometer className="text-red-500" size={20} /> Option-1</span>
              </li>

              <li className="font-semibold text-lg mb-3">
                <span className="rounded-r-full bg-[#191c24] p-2 border-l-4 border-blue-500"><IoIosSpeedometer className="text-blue-500" size={20} /> Option-2</span>
              </li>

              <li className="font-semibold text-lg mb-3">
                <span className="rounded-r-full bg-[#191c24] p-2 border-l-4 border-green-500"><IoIosSpeedometer className="text-green-500" size={20} /> Option-3</span>
              </li>

              <li className="font-semibold text-lg mb-3">
                <span className="rounded-r-full bg-[#191c24] p-2 border-l-4 border-yellow-500"><IoIosSpeedometer className="text-yellow-500" size={20} /> Option-4</span>
              </li>
              
              <li className="font-semibold text-lg mb-3">
                <span className="rounded-r-full bg-[#191c24] p-2 border-l-4 border-orange-500"><IoIosSpeedometer className="text-orange-500" size={20} /> Option-5</span>
              </li>

              <li className="font-semibold text-lg mb-3">
                <span className="rounded-r-full bg-[#191c24] p-2 border-l-4 border-gray-500"><IoIosSpeedometer className="text-gray-500" size={20} /> Option-6</span>
              </li>

              <li className="font-semibold text-lg mb-3">
                <span className="rounded-r-full bg-[#191c24] p-2 border-l-4 border-teal-500"><IoIosSpeedometer className="text-teal-500" size={20} /> Option-7</span>
              </li>

              <li className="font-semibold text-lg mb-3">
                <span className="rounded-r-full bg-[#191c24] p-2 border-l-4 border-pink-500"><IoIosSpeedometer className="text-pink-500" size={20} /> Option-8</span>
              </li>

              <li className="font-semibold text-lg mb-3">
                <span className="rounded-r-full bg-[#191c24] p-2 border-l-4 border-indigo-500"><IoIosSpeedometer className="text-indigo-500" size={20} /> Option-9</span>
              </li>

              <li className="font-semibold text-lg mb-3">
                <span className="rounded-r-full bg-[#191c24] p-2 border-l-4 border-violet-500"><IoIosSpeedometer className="text-violet-500" size={20} /> Option-10</span>
              </li>

            </ul>
          </div>
        </div>
      </div>
    );
};

export default Drawer;