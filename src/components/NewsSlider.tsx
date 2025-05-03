import React from 'react'
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const splide = new Splide( '.splide', {
  type   : 'loop',
  drag   : 'free',
  focus  : 'center',
  perPage: 3,
  autoScroll: {
    speed: 1,
  },
} );

splide.mount({ AutoScroll });

const NewsSlider = () => {
  return (
    <div>NewsSlider</div>
  )
}

export default NewsSlider