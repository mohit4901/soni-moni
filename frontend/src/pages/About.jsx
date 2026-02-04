import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>

          <p>
            <b className='text-gray-800'>Moni Soni Royal Collection</b> is a
            trusted ethnic wear store known for its elegant and timeless
            collection of Indian suits. With years of experience in offline
            retail, we have built strong relationships with our customers
            through quality, authenticity, and attention to detail.
          </p>

          <p>
            We are now bringing our offline legacy online, so you can enjoy
            the same premium quality, beautiful designs, and perfect fitting
            from the comfort of your home. Every piece in our collection is
            carefully selected to reflect grace, comfort, and modern trends.
          </p>

          <b className='text-gray-800'>Our Mission</b>

          <p>
            Our mission is to offer elegant ethnic wear that makes every woman
            feel confident and beautiful. We aim to deliver high-quality
            products, honest pricing, and a smooth shopping experience while
            maintaining the trust we have earned over the years.
          </p>

        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Premium Quality</b>
          <p className='text-gray-600'>
            Each outfit is crafted using high-quality fabrics with fine
            stitching and elegant finishing to ensure lasting comfort
            and style.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Trusted Offline Heritage</b>
          <p className='text-gray-600'>
            Backed by years of offline retail experience, we bring you
            authenticity, reliability, and a brand you can trust.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Customer-First Approach</b>
          <p className='text-gray-600'>
            Your satisfaction matters to us. We focus on building long-term
            relationships by offering excellent service and honest support.
          </p>
        </div>

      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
