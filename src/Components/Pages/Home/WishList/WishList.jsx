import photo1 from '../../../../../public/images/beef-wellington (1).jpg'
import photo2 from '../../../../../public/images/Bibimbap (1).jpg'
import photo3 from '../../../../../public/images/Fish-Tacos (1).jpg'
import photo4 from '../../../../../public/images/kimchi-fried-rice-recipe.jpg'
import photo5 from '../../../../../public/images/Kung-Pao-Chicken (1).jpg'
import photo6 from '../../../../../public/images/Lobster-Chowder.jpeg'
import photo7 from '../../../../../public/images/Rasta_Pasta.jpeg'
import photo8 from '../../../../../public/images/Ratatouille (1).jpg'
import photo9 from '../../../../../public/images/Tandoori-Chicken.jpg'
import icon1 from '../../../../../public/icons/start-filled.svg'
import icon2 from '../../../../../public/icons/star-grey.svg'
import aboutPhoto from '../../../../../public/images/contactUs.jpg';
import { BsFillCartCheckFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishList = () => {

  const handleOrderNowClick = () => {
    toast.success('Item added to Cart!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
};


  return (
    <div className="">
            {/* title section */}
            <div
                style={{
                    backgroundImage: `url(${aboutPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '350px',
                    // marginTop:'30px'
                }}
                className="flex justify-center"
            >
                {/* title tag */}
                <div className="bg-gray-800 opacity-70 w-full h-full flex flex-col justify-center items-center">
                    <h1
                        style={{ fontFamily: 'Mooli, sans-serif' }}
                        className="text-3xl text-white font-semibold "
                    >
                        Wishlist
                    </h1>
                    <img src="../../../../public/icons/hr.svg" alt="" />
                </div>
            </div>
            {/*------------------------- information section ------------------------ */}
            <div className='max-w-screen-xl mx-auto flex justify-center'>
                


            </div>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

    </div>
  );
};

export default WishList;