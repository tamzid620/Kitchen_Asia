import { Link } from 'react-router-dom';
import catteringImage from '../../../../public/images/cattering_service.jpg'
import bgBanner4 from  "../../../../public/images/bg-banner4.jpg"

const Packages = () => {
    return (
        <div
        style={{
          backgroundImage: `url(${bgBanner4})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
            {/* title section  */}
            <div className="flex justify-center mt-16 pt-10" 
            data-aos="zoom-in-down" 
            data-aos-easing="linear"
            data-aos-duration="500">
                <div>
                    <h1 style={{ fontFamily: 'Mooli, sans-serif' }} className="flex justify-center text-3xl text-white font-semibold">Packages</h1>
                    <img src="../../../../public/icons/hr.svg" alt="" />
                </div>
            </div>

            {/*------------------------- information section ------------------------ */}
            <div className=' flex justify-center sm: ms-2 sm: me-2 lg:ms-0 lg:me-0 mt-20 pb-10' 
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="500">
                <div className='bg-slate-900  grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 
                 rounded-xl border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 p-3 '>

                    {/* info section  */}
                    <div className=' p-3'>
                        <h1 className='text-yellow-500 font-semibold text-2xl mb-3'>Elevate Your Event with Our Culinary Delights and <br /> Impeccable Catering Service.</h1>
                        <p className='text-[#808080] font-semibold mt-5'>Indulge in gastronomic excellence at your next event. Our expert chefs use <br /> the finest ingredients to craft unforgettable culinary experiences, <br /> customized for any occasion. Impeccable service ensures your <br /> guests will savor lasting memories of exquisite flavors.</p>

                        {/* platter service button  */}
                        <Link to="/platterService">
                        <button  title="All Packages" className="py-3 border border-yellow-500 bg-transparent text-yellow-500
                        hover:border-white hover:text-white 
           font-bold px-1 mt-16 rounded-md">All Packages</button>
                        </Link>
                    </div>

                    
                    {/* image section  */}
                    <div className=' opacity-70 lg:ms-16 md:ms-16 sm: 0'>
                        <div><img style={{ width: '500px' }} className='rounded-xl transition-transform transform hover:scale-105' src={catteringImage} alt="" /></div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Packages;