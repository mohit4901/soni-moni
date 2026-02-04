import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-[#fff1f1] mt-20 sm:mt-24">

      {/* ───────────── TOP FOOTER ───────────── */}
      <div className="w-full px-4 sm:px-6 md:px-16 py-12 sm:py-16 bg-[#fbdfd2]">
        <div className="
          max-w-[1400px] mx-auto
          grid grid-cols-1
          sm:grid-cols-2
          md:grid-cols-4
          gap-10 sm:gap-12
          text-sm
        ">

          {/* SHOP */}
          <div className="text-center md:text-left">
            <h3 className="mb-5 sm:mb-6 font-semibold tracking-wide text-[#b64400]">
              SHOP
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li><Link to="/collection" className="hover:underline">Trending Now</Link></li>
              <li><Link to="/collection" className="hover:underline">All Products</Link></li>
              <li><Link to="/collection" className="hover:underline">Under 1500</Link></li>
            </ul>
          </div>

          {/* INFORMATION */}
          <div className="text-center md:text-left">
            <h3 className="mb-5 sm:mb-6 font-semibold tracking-wide text-[#b64400]">
              INFORMATION
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li><Link to="/" className="hover:underline">Shipping Policy</Link></li>
              <li><Link to="/" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:underline">Refund Policy</Link></li>
              <li><Link to="/" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div className="text-center md:text-left">
            <h3 className="mb-5 sm:mb-6 font-semibold tracking-wide text-[#b64400]">
              CUSTOMER SERVICE
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="cursor-pointer hover:underline">Track Order</li>
              <li>
                <a
                  href="https://g.co/kgs/ADM1GBF"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Visit Our Store
                </a>
              </li>
              <li className="cursor-pointer hover:underline">FAQ</li>
              <li className="cursor-pointer hover:underline">Contact Us</li>
            </ul>
          </div>

          {/* VISIT STORE */}
          <div className="text-center md:text-left">
            <h3 className="mb-5 sm:mb-6 font-semibold tracking-wide text-[#b64400]">
              VISIT OUR STORE
            </h3>
            <div className="space-y-4 text-gray-700 leading-6">
              <p>
              Moni Soni royal collection <br/>
              Auchandi road opposite post office wali Gali<br/> bawana, Delhi (110039)
              </p>
              <p>support@sonimonicoll.com</p>
            </div>
          </div>

        </div>
      </div>

      {/* ───────────── COPYRIGHT BAR ───────────── */}
      <div className="border-t border-[#f2c6b8] bg-[#fbdfd2] py-4">
        <div className="
          max-w-[1400px] mx-auto
          px-4 sm:px-6
          flex flex-col md:flex-row
          items-center justify-between
          gap-3 sm:gap-4
          text-xs text-gray-700
        ">
          <p className="text-center md:text-left">
            © 2026 Soni Moni Collection. All Rights Reserved.
          </p>
          <p className="text-center md:text-left">
       Designed with ❤️ by Mohit Mudgil
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Google Pay</span>
          </div>
        </div>
      </div>

      {/* ───────────── FOOTER BOTTOM IMAGE (ALWAYS VISIBLE) ───────────── */}
      <div className="w-full">
        <img
          src={assets.footer_bg}
          alt="footer decoration"
          className="
            w-full
            h-[120px] sm:h-[180px] md:h-[220px]
            object-cover
          "
        />
      </div>

    </footer>
  )
}

export default Footer
