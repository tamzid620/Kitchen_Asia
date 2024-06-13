import { Link } from 'react-router-dom';
import catteringImage from '../../../../public/images/cattering_service.jpg'
import bgBanner3 from '../../../../public/images/bg-banner3.jpg'

const Cattering = () => {
    return (
 
        <div
        style={{
          backgroundImage: `url(${bgBanner3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
            {/* title section  */}
            <div className="flex justify-center mt-16 pt-10"
             data-aos="zoom-in-down" data-aos-easing="linear"
            data-aos-duration="500">
                <div>
                    <h1 style={{ fontFamily: 'Mooli, sans-serif' }} className="flex justify-center text-3xl text-white font-semibold">Cattering</h1>
                    <img src="../../../../public/icons/hr.svg" alt="" />
                </div>
            </div>

            {/*------------------------- information section ------------------------ */}
            <div className=' flex justify-center sm: ms-2 sm: me-2 lg:ms-0 lg:me-0 mt-20 pb-10' data-aos="fade-right" 
            data-aos-easing="linear"
             data-aos-duration="500">
                <div className='bg-slate-900  grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 
                 rounded-xl border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 p-3 '>

                    {/* image section  */}
                    <div className=' opacity-70'>
                        <div><img style={{ width: '500px'}} className='rounded-xl transition-transform transform hover:scale-105' src={catteringImage} alt="" /></div>
                    </div>

                    {/* info section  */}
                    <div className=' p-3'>
                        <h1 className='text-yellow-500 font-semibold text-2xl mb-3'>Elevate Your Event with Our Culinary Delights and <br /> Impeccable Catering Service.</h1>
                        <p className='text-[#808080] font-semibold mt-5'>Indulge in gastronomic excellence at your next event. Our expert chefs use <br /> the finest ingredients to craft unforgettable culinary experiences, <br /> customized for any occasion. Impeccable service ensures your <br /> guests will savor lasting memories of exquisite flavors.</p>
                        <Link to="/reservation">
                        <button  title="Cattering service" className="
                         border border-yellow-500 bg-transparent text-yellow-500
                        hover:border-white hover:text-white 
           font-bold px-1 py-3 mt-16 rounded-md">Cattering service</button>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Cattering;