import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'
import BookBanner from '../components/BookBanner'

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
      <Hero />
      <RecentlyAdded/>
      <BookBanner/>
      
    </div>
  )
}

export default Home
