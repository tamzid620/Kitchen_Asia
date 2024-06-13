import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="sm: ms-2 sm: me-2 lg:ms-0 lg:me-0 pt-24 bg-gray-300">
            <div>
            <footer className="max-w-screen-xl mx-auto ">
           <div className="text-[#bc161c]">
               <div className="last-boxes grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-5">
                {/* ------------About Us ------------- */}
                   <div className="">
                    <div className="text-center">
                       <h3 
                       style={{ fontFamily: "Montserrat, sans-serif " ,fontWeight: 600 }}
                       className="flex justify-center text-xl font-semibold">Contact Us</h3>
                       <hr className="mb-3" style={{ borderColor: '#bc161c'}} />
                       <div style={{ fontFamily: "Montserrat, sans-serif " ,fontWeight: 500 }}>
                        <div className="flex items-center mb-2">
                            <FaMapMarkerAlt className="text-2xl mr-3 " />
                            <p className='hover:text-black'>
                                123 Main Street, <br />
                                City, Country
                            </p>
                        </div>
                        <div className="flex items-center mb-2">
                            <FaPhone className="text-2xl mr-3 " />
                            <p className='hover:text-black'>
                                Phone: +1 (123) 456-7890 <br />
                                Mobile: +1 (987) 654-3210
                            </p>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="text-2xl mr-3 " />
                            <p className='hover:text-black'>
                                Email: example@example.com
                            </p>
                        </div>
                    </div>
                       </div>
                    </div>
                    {/* ------------Instagram ------------- */}
                   <div className="flex justify-center">
                    <div>

                   <h3 style={{ fontFamily: "Montserrat, sans-serif " ,fontWeight: 600 }}
                    className="text-xl text-center font-semibold">Instagram</h3>
                       <hr className="mb-3" style={{ borderColor: '#bc161c'}} />
                       <div className="photo grid lg:grid-cols-2 md:grid-cols-3 sm: grid-cols-3 gap-3 w-60">
                           <div>
                               <img src="./images/food-table.jpg" alt=""/>
                           </div>
                           <div>
                            <img src="./images/food-table.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="./images/food-table.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="./images/food-table.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="./images/food-table.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="./images/food-table.jpg" alt=""/>
                        </div>
                       </div>
                    </div>

                   </div>
                   {/* ------------Quick Links ------------- */}
                   <div className="text-center">
                   <h3 style={{ fontFamily: "Montserrat, sans-serif " ,fontWeight: 600 }}
                    className="text-xl  font-semibold">Quick Links</h3>
                       <hr className=" mb-3" style={{ borderColor: '#bc161c'}} />
                    <div style={{ fontFamily: "Montserrat, sans-serif " ,fontWeight: 500 }}>
                    <ul>
                        <li>
                            <a className="hover:text-black" href="/">Home</a>
                        </li>
                        <li>
                            <a className="hover:text-black" href="/aboutUs">About us</a>
                        </li>
                        <li>
                            <a className="hover:text-black" href="/platterService">Services</a>
                        </li>
                        <li>
                            <a className="hover:text-black" href="#">Gallery</a>
                        </li>
                        <li>
                            <a className="hover:text-black" href="/contactUs">Contact Us</a>
                        </li>
                        <Link to="/deliverymanPanel">
                        <li>
                            <a className="hover:text-black" href="/contactUs">Delivery Panel</a>
                        </li>
                        </Link>
                    </ul>
                    </div>
                   </div>
                   {/* ------------Follow us ------------- */}
                   <div className="text-center">
                    <div>

                   <h3 style={{ fontFamily: "Montserrat, sans-serif " ,fontWeight: 600 }}
                    className="text-xl font-semibold">Follow Us</h3>
                       <hr className=" mb-3" style={{ borderColor: '#bc161c'}} />
                       <div style={{ fontFamily: "Montserrat, sans-serif " ,fontWeight: 500 }} className="flex justify-center">
                       <ul className="text-center">
                           <li>
                               <a href="#" className="flex">
                                   <img src="./icons/facebook.svg" alt=""/>
                                   <span className=" ms-3 hover:text-black" > facebook</span>
                               </a>
                           </li>
                           <li>
                               
                            <a href="#" className="flex">
                                <img src="./icons/instagram.svg" alt=""/>
                                <span className=" ms-3 hover:text-black" >Instagram</span>
                            </a>
                        </li>
                        <li>
                               
                            <a href="#" className="flex ">
                                <img src="./icons/twitter.svg" alt=""/>
                                <span className=" ms-3 hover:text-black" >Twitter</span>
                            </a>
                        </li>
                       </ul>
                    </div>
                    </div>

                   </div>
               </div>
           </div>
       </footer>
       <footer className="copyright">
           <div className=" py-3 mt-16  flex justify-center text-white bg-[#bc161c]">
               <h1 style={{ fontFamily: "Montserrat, sans-serif " ,fontWeight: 500 }}>copyright @ 2023. All rights reserved by <a target='blank' href="https://marketien.online/">MarketienIT</a></h1>
           </div>
       </footer>
            </div>

        </div>
    );
};

export default Footer;