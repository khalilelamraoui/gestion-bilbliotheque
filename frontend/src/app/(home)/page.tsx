"use client";

import { HeroParallaxDemo } from '@/components/Books-hero'
import React from 'react'
import Video from './Video'
import Book from './Book'


var fn = function () {
  /* do you want */  
}

export default function() {
  return (
    <div>
      <h1 className='text-center mb-20'>Book page</h1>
      <a href="/available" >available items</a>
      <HeroParallaxDemo />
      <Book />
      
    </div>
  )
}
