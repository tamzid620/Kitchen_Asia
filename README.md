• Live Site Link:  https://restaurant.4softbd.com/

• front-end-technology:
1.React
2.JavaScript
3.Node
4.Tailwind Css
5.react rating
6.react hook form
7. react icon
8. react toastify
9.sweet alert
10.
localexpose link: https://backend.ap.loclx.io/
server side link: https://marketienrestaurant.000webhostapp.com/


------------------------------------------------------------------------

<div className=' mt-10 gap-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                    {/* food item -1 */}
                    <div className=' rounded-xl border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 p-3 w-80 transition-transform transform hover:scale-105'>
                        <img className='w-80 h-48 rounded-lg' src={photo9} alt="" />
                        <div>
                            <h1 className=' text-xl text-white font-semibold uppercase mt-5'>TandooriChicken</h1>
                            <h2 className='text-[#808080] font-semibold'>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Iusto, vitae?</h2>
                            <div className='flex justify-between mt-5'>
                                <p className='text-yellow-500 text-2xl font-mono font-bold'>$30.00</p>
                                <div className='flex'>
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                </div>
                            </div>
                            <button  onClick={handleOrderNowClick} 
                            className="hover:bg-[#FFD700] hover:text-black
                             bg-[#FFD700]  text-[#808080] border-black font-bold px-3 py-1 
                             rounded-md mt-3 flex items-center gap-2">
                            <span> Add to Cart </span><span> <BsFillCartCheckFill/>  </span> 
                            </button>
                        </div>
                    </div>

                    {/* food item -2 */}
                    <div className=' rounded-xl border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 p-3 w-80 transition-transform transform hover:scale-105'>
                        <img className='w-80 h-48 rounded-lg' src={photo6} alt="" />
                        <div>
                            <h1 className=' text-xl text-white font-semibold uppercase mt-5'>Lobster Chowder</h1>
                            <h2 className='text-[#808080] font-semibold'>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Iusto, vitae?</h2>
                            <div className='flex justify-between mt-5'>
                                <p className='text-yellow-500 text-2xl font-mono font-bold'>$23.70</p>
                                <div className='flex'>
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                </div>
                            </div>
                            <button  onClick={handleOrderNowClick} className="hover:bg-[#FFD700] hover:text-black bg-[#FFD700]  text-[#808080] border-black font-bold px-3 py-1 rounded-md mt-3 flex items-center gap-2">
                            <span> Add to Cart </span><span> <BsFillCartCheckFill/>  </span> 
                            </button>
                        </div>
                    </div>

                    {/* food item -3 */}
                    <div className=' rounded-xl border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 p-3 w-80 transition-transform transform hover:scale-105'>
                        <img className='w-80 h-48 rounded-lg' src={photo4} alt="" />
                        <div>
                            <h1 className=' text-xl text-white font-semibold uppercase mt-5'>kimchi fried rice</h1>
                            <h2 className='text-[#808080] font-semibold'>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Iusto, vitae?</h2>
                            <div className='flex justify-between mt-5'>
                                <p className='text-yellow-500 text-2xl font-mono font-bold'>$10.00</p>
                                <div className='flex'>
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                </div>
                            </div>
                            <button  onClick={handleOrderNowClick} className="hover:bg-[#FFD700] hover:text-black bg-[#FFD700]  text-[#808080] border-black font-bold px-3 py-1 rounded-md mt-3 flex items-center gap-2">
                            <span> Add to Cart </span><span> <BsFillCartCheckFill/>  </span> 
                            </button>
                        </div>
                    </div>

                    {/* food item -4 */}
                    <div className=' rounded-xl border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 p-3 w-80 transition-transform transform hover:scale-105'>
                        <img className='w-80 h-48 rounded-lg' src={photo5} alt="" />
                        <div>
                            <h1 className=' text-xl text-white font-semibold uppercase mt-5'>Kung Pao Chicken</h1>
                            <h2 className='text-[#808080] font-semibold'>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Iusto, vitae?</h2>
                            <div className='flex justify-between mt-5'>
                                <p className='text-yellow-500 text-2xl font-mono font-bold'>$08.20</p>
                                <div className='flex'>
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                </div>
                            </div>
                            <button  onClick={handleOrderNowClick} className="hover:bg-[#FFD700] hover:text-black bg-[#FFD700]  text-[#808080] border-black font-bold px-3 py-1 rounded-md mt-3 flex items-center gap-2">
                            <span> Add to Cart </span><span> <BsFillCartCheckFill/>  </span> 
                            </button>
                        </div>
                    </div>

                    {/* food item -5 */}
                    <div className=' rounded-xl border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 p-3 w-80 transition-transform transform hover:scale-105'>
                        <img className='w-80 h-48 rounded-lg' src={photo3} alt="" />
                        <div>
                            <h1 className=' text-xl text-white font-semibold uppercase mt-5'>Fish Tacos</h1>
                            <h2 className='text-[#808080] font-semibold'>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Iusto, vitae?</h2>
                            <div className='flex justify-between mt-5'>
                                <p className='text-yellow-500 text-2xl font-mono font-bold'>$24.22</p>
                                <div className='flex'>
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                </div>
                            </div>
                            <button  onClick={handleOrderNowClick} className="hover:bg-[#FFD700] hover:text-black bg-[#FFD700]  text-[#808080] border-black font-bold px-3 py-1 rounded-md mt-3 flex items-center gap-2">
                            <span> Add to Cart </span><span> <BsFillCartCheckFill/>  </span> 
                            </button>
                        </div>
                    </div>

                    {/* food item -6 */}
                    <div className=' rounded-xl border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 p-3 w-80 transition-transform transform hover:scale-105'>
                        <img className='w-80 h-48 rounded-lg' src={photo2} alt="" />
                        <div>
                            <h1 className=' text-xl text-white font-semibold uppercase mt-5'>Bibimbap</h1>
                            <h2 className='text-[#808080] font-semibold'>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Iusto, vitae?</h2>
                            <div className='flex justify-between mt-5'>
                                <p className='text-yellow-500 text-2xl font-mono font-bold'>$20.00</p>
                                <div className='flex'>
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                </div>
                            </div>
                            <button  onClick={handleOrderNowClick} className="hover:bg-[#FFD700] hover:text-black bg-[#FFD700]  text-[#808080] border-black font-bold px-3 py-1 rounded-md mt-3 flex items-center gap-2">
                            <span> Add to Cart </span><span> <BsFillCartCheckFill/>  </span> 
                            </button>
                        </div>
                    </div>

                    {/* food item -7 */}
                    <div className=' rounded-xl border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 p-3 w-80 transition-transform transform hover:scale-105'>
                        <img className='w-80 h-48 rounded-lg' src={photo7} alt="" />
                        <div>
                            <h1 className=' text-xl text-white font-semibold uppercase mt-5'>Rasta Pasta</h1>
                            <h2 className='text-[#808080] font-semibold'>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Iusto, vitae?</h2>
                            <div className='flex justify-between mt-5'>
                                <p className='text-yellow-500 text-2xl font-mono font-bold'>$10.00</p>
                                <div className='flex'>
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                </div>
                            </div>
                            <button  onClick={handleOrderNowClick} className="hover:bg-[#FFD700] hover:text-black bg-[#FFD700]  text-[#808080] border-black font-bold px-3 py-1 rounded-md mt-3 flex items-center gap-2">
                            <span> Add to Cart </span><span> <BsFillCartCheckFill/>  </span> 
                            </button>
                        </div>
                    </div>
                    
                    {/* food item -8 */}
                    <div className=' rounded-xl border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 p-3 w-80 transition-transform transform hover:scale-105'>
                        <img className='w-80 h-48 rounded-lg' src={photo8} alt="" />
                        <div>
                            <h1 className=' text-xl text-white font-semibold uppercase mt-5'>Ratatouille</h1>
                            <h2 className='text-[#808080] font-semibold'>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Iusto, vitae?</h2>
                            <div className='flex justify-between mt-5'>
                                <p className='text-yellow-500 text-2xl font-mono font-bold'>$09.80</p>
                                <div className='flex'>
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                </div>
                            </div>
                            <button  onClick={handleOrderNowClick} className="hover:bg-[#FFD700] hover:text-black bg-[#FFD700]  text-[#808080] border-black font-bold px-3 py-1 rounded-md mt-3 flex items-center gap-2">
                            <span> Add to Cart </span><span> <BsFillCartCheckFill/>  </span> 
                            </button>
                        </div>
                    </div>

                    {/* food item -9 */}
                    <div className=' rounded-xl border-t-2 border-yellow-500 shadow-lg shadow-yellow-500 p-3 w-80 transition-transform transform hover:scale-105'>
                        <img className='w-80 h-48 rounded-lg' src={photo1} alt="" />
                        <div>
                            <h1 className=' text-xl text-white font-semibold uppercase mt-5'>Beef Wellington</h1>
                            <h2 className='text-[#808080] font-semibold'>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Iusto, vitae?</h2>
                            <div className='flex justify-between mt-5'>
                                <p className='text-yellow-500 text-2xl font-mono font-bold'>$22.50</p>
                                <div className='flex'>
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                    <img className="w-[15px]" src={icon1} alt="" />
                                </div>
                            </div>
                            <button  onClick={handleOrderNowClick} className="hover:bg-[#FFD700] hover:text-black bg-[#FFD700]  text-[#808080] border-black font-bold px-3 py-1 rounded-md mt-3 flex items-center gap-2">
                            <span> Add to Cart </span><span> <BsFillCartCheckFill/>  </span> 
                            </button>
                        </div>
                    </div>


                </div>

------------------------------------------------------------------------