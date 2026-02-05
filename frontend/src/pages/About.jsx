import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      {/* ───── ABOUT HEADER ───── */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* ───── INTRO ───── */}
      <div className="my-10 flex flex-col md:flex-row gap-16 px-4">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="about"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            <b className="text-gray-800">Moni Soni Royal Collection</b> is a
            trusted ethnic wear store known for its elegant and timeless Indian
            outfits. With years of offline retail experience, we have earned
            customer trust through quality and authenticity.
          </p>

          <p>
            We are now bringing our offline legacy online, allowing customers
            across India to enjoy premium ethnic wear from the comfort of their
            homes.
          </p>

          <p>
            Each piece in our collection reflects comfort, modern trends, and
            graceful craftsmanship.
          </p>
        </div>
      </div>

      {/* ───── WHY CHOOSE US ───── */}
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-10 flex flex-col gap-4">
          <b>Premium Quality</b>
          <p className="text-gray-600">
            High-quality fabrics, detailed stitching, and long-lasting comfort.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-10 flex flex-col gap-4">
          <b>Offline Trust</b>
          <p className="text-gray-600">
            Years of offline experience and satisfied repeat customers.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-10 flex flex-col gap-4">
          <b>Customer First</b>
          <p className="text-gray-600">
            Honest pricing, smooth support, and reliable service.
          </p>
        </div>
      </div>

      {/* ───── POLICIES ───── */}
      <div className="text-xl py-4">
        <Title text1="OUR" text2="POLICIES" />
      </div>

      <div className="max-w-[900px] mx-auto px-4 text-sm text-gray-600 space-y-10">

        {/* SHIPPING */}
        <div>
          <b className="text-gray-800 block mb-2">Shipping Policy</b>
          <p>
            Orders are processed within 1–3 business days. Delivery timelines
            depend on your location and courier service availability.
          </p>
        </div>

        {/* PRIVACY */}
        <div>
          <b className="text-gray-800 block mb-2">Privacy Policy</b>
          <p>
            We respect your privacy. All personal information is kept secure and
            is never shared with third parties except for order processing.
          </p>
        </div>

        {/* REFUND */}
        <div>
          <b className="text-gray-800 block mb-2">Refund Policy</b>
          <p>
            Returns and exchanges are accepted within 7 days of delivery,
            provided the product is unused and in original condition.
          </p>
        </div>

        {/* TERMS */}
        <div>
          <b className="text-gray-800 block mb-2">Terms of Service</b>
          <p>
            By using our website, you agree to comply with our terms, including
            pricing, payment, and return conditions.
          </p>
        </div>

      </div>

      {/* ───── HELP & SUPPORT ───── */}
      <div className="text-xl py-10">
        <Title text1="HELP &" text2="SUPPORT" />
      </div>

      <div className="max-w-[900px] mx-auto px-4 text-sm text-gray-600 space-y-10 mb-20">

        {/* VISIT STORE */}
        <div>
          <b className="text-gray-800 block mb-2">Visit Our Store</b>
          <p>
            Moni Soni Royal Collection <br />
            Auchandi Road, Opposite Post Office Wali Gali <br />
            Bawana, Delhi – 110039
          </p>
        </div>

        {/* FAQ */}
        <div>
          <b className="text-gray-800 block mb-2">FAQ</b>
          <p>
            For common questions related to sizing, delivery, or payments,
            please contact our support team.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <b className="text-gray-800 block mb-2">Contact Us</b>
          <p>Email: support@sonimonicoll.com</p>
          <p>Phone: +91 9289892828</p>
        </div>

      </div>

      <NewsletterBox />

    </div>
  )
}

export default About

