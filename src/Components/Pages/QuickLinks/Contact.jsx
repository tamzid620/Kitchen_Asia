import contactPhoto from '../../../../public/images/contactUs.jpg';
import contactPhoto1 from '../../../../public/images/ContactSection.jpeg';
import gmailPhoto from '../../../../public/images/Gmail.jpg';
import { useState } from 'react';

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission logic here, for example, send the data to a server or perform some action.
        console.log(formData);
    };

    return (
        <div>
            {/* title section */}
            <div
                style={{
                    backgroundImage: `url(${contactPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '350px',
                    // marginTop:'30px'
                }}
                className="flex justify-center">
                {/* title tag */}
                <div className="bg-gray-800 opacity-70 w-full h-full flex flex-col justify-center items-center">
                    <h1
                        style={{ fontFamily: 'Mooli, sans-serif' }}
                        className="text-3xl text-white font-semibold "
                    >
                        Contact Us
                    </h1>
                    <img src="../../../../public/icons/hr.svg" alt="" />
                </div>
            </div>

            {/* information section  */}
            <div className=' max-w-screen-xl mx-auto my-20 '>
                <div className='flex justify-center items-center '>
                    <div className=' grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 sm: ms-2 sm: me-2 lg:ms-0 lg:me-0'>
                        <div className='flex items-center'>
                            <div>
                                <h1 className='font-serif text-2xl text-white'>FEEL AT HOME</h1> <br />
                                <h1 style={{ fontFamily: 'Mooli, sans-serif' }} className='text-4xl text-white mb-5'>WE’RE HERE FOR YOU</h1>
                                <p className='text-yellow-500 sm: mb-5 text-lg'>Your happiness is our number one priority! Feel <br /> free to reach out with any questions or concerns – <br />We can’t wait to see you soon!</p>
                            </div>
                        </div>
                        <img className='rounded-xl' src={contactPhoto1} alt="" />
                    </div>
                </div>

                <div className='grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-20 sm: ms-2 sm: me-2 lg:ms-0 lg:me-0'>
                    {/* form section  */}
                    <div className='form'>
                        <form onSubmit={handleSubmit} className="form">
                            <div className="mb-2">
                                <label htmlFor="name" className="text-white text-xl">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder='Your Name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg py-2 px-4 placeholder-gray-500 focus:outline-none focus:ring focus:ring-yellow-500"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email" className="text-white text-xl">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder='Your Email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg py-2 px-4 placeholder-gray-500 focus:outline-none focus:ring focus:ring-yellow-500"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="phone" className="text-white text-xl">
                                    Phone
                                </label>
                                <input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    placeholder='Your Phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg py-2 px-4 placeholder-gray-500 focus:outline-none focus:ring focus:ring-yellow-500"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="message" className="text-white text-xl">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder='Your Message'
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg py-2 px-4 placeholder-gray-500 focus:outline-none focus:ring focus:ring-yellow-500"
                                />
                            </div>
                            <button type="submit" className="hover:bg-[#FFD700] hover:text-black bg-[#FFD700]  text-[#808080] border-black font-bold px-3 py-1 rounded-md">Send Message</button>
                        </form>
                    </div>
                    {/* details section  */}
                    <div className='flex items-center'>
                        <img className='w-[600px] h-[350px] rounded-xl' src={gmailPhoto} alt="" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Contact;
