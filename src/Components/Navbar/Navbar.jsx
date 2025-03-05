import React, { useContext, useState } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { tokenContext } from './../../Context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  const { numOfCartItems } = useContext(CartContext)
  const { token, setToken } = useContext(tokenContext)
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logoutUser() {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')
  }

  return (
    <nav className="bg-slate-100 border-gray-200 dark:bg-gray-900 relative z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        <Link to={'/'} className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Logo" />
        </Link>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          type="button" 
          className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 absolute top-4 right-4 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <div className="hidden md:flex space-x-6">
          <NavLink to={'/'} className="text-gray-900 hover:text-green-700 dark:text-white">Home</NavLink>
          <NavLink to={'Products'} className="text-gray-900 hover:text-green-700 dark:text-white">Products</NavLink>
          <NavLink to={'categories'} className="text-gray-900 hover:text-green-700 dark:text-white">Categories</NavLink>
          <NavLink to={'brands'} className="text-gray-900 hover:text-green-700 dark:text-white">Brands</NavLink>
          <NavLink to={'wishlist'} className="text-gray-900 hover:text-green-700 dark:text-white">Wishlist</NavLink>
          
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md md:hidden">
  <ul className="flex flex-col p-4 space-y-2">
    <li><NavLink to={'/'} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 dark:text-white">Home</NavLink></li>
    <li><NavLink to={'Products'} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 dark:text-white">Products</NavLink></li>
    <li><NavLink to={'categories'} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 dark:text-white">Categories</NavLink></li>
    <li><NavLink to={'brands'} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 dark:text-white">Brands</NavLink></li>
    <li><NavLink to={'wishlist'} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 dark:text-white">Wishlist</NavLink></li>
    <li>
      <NavLink to={'Cart'} className="relative text-gray-900">
        <AiOutlineShoppingCart className='text-3xl hidden md:block' />
        <span className='block md:hidden py-2 px-3 text-gray-900 hover:bg-gray-200 dark:text-white'>Cart</span>
      </NavLink>
    </li>
  </ul>
</div>
        )}

        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-blue-700"><FaFacebook /></a>
          <a href="#" className="text-orange-500"><FaInstagram /></a>
          <a href="#" className="text-red-600"><FaYoutube /></a>
          <a href="#" className="text-blue-800"><FaLinkedin /></a>
          <a href="#" className="text-gray-900"><FaTiktok /></a>

          {token ? (
            <>
              <NavLink to={'Cart'} className="relative text-gray-900">
                <AiOutlineShoppingCart className='text-3xl' />
                <span className='absolute h-5 w-5 -right-2 -top-2 rounded-full flex justify-center items-center bg-green-500 text-white'>{numOfCartItems}</span>
              </NavLink>
              <button onClick={logoutUser} className="text-gray-900 hover:text-green-700 dark:text-white">Sign Out</button>
            </>
          ) : (
            <>
              <NavLink to={'Login'} className="text-gray-900 hover:text-green-700 dark:text-white">Login</NavLink>
              <NavLink to={'Register'} className="text-gray-900 hover:text-green-700 dark:text-white">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}


{/*
  import React, { useContext } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { tokenContext } from './../../Context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {

  const {numOfCartItems} =useContext(CartContext)

  const { token, setToken } = useContext(tokenContext)
  const navigate = useNavigate()

  function logoutUser() {
    //remove local storage
    // set context =>null
    //navigate to login
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')

  }
  return (


    <nav className="bg-slate-100 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className='flex items-center'>
          <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8 me-4" alt="FlowBite Logo" />
          </Link>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          {token && <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to={'/'} className="block py-2 px-3 text-gray-900 bg-green-700 rounded-sm md:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500" aria-current="page">Home</NavLink>
              </li>
              <li>
                <NavLink to={'Products'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</NavLink>
              </li>
              <li>
                <NavLink to={'categories'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">categoris</NavLink>
              </li>
              <li>
                <NavLink to={'brands'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Brands</NavLink>
              </li>
              <li>
                <NavLink to={'wishlist'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">wishlist</NavLink>
              </li>
            </ul>
          </div>}
        </div>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-green-500" aria-current="page"><FaFacebook />
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-orange-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><FaInstagram />
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-red-600 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><FaYoutube />
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-blue-800 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><FaLinkedin />
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><FaTiktok />
              </a>
            </li>
            {token &&
              <>
                <li>
                  <NavLink to={'Cart'} className="relative block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-semibold">
                    <AiOutlineShoppingCart className='text-3xl'/>
                    <span className='absolute h-5 w-5 -right-2 -top-2 rounded-full flex justify-center items-center bg-green-500'>{numOfCartItems}</span>                  
                  </NavLink>
                </li>
                <li>
                  <div onClick={() => { logoutUser() }} className="block cursor-pointer py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">SignOut
                  </div>
                </li></>}
            {!token &&
              <>
                <li>
                  <NavLink to={'Login'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'Register'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register
                  </NavLink>
                </li>
              </>}
          </ul>
        </div>
      </div>
    </nav>


  )
}



  */}