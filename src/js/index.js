import { Slider, Terrain } from './Slide';
import { Select } from './Select';
import { HouseCarusel } from './HouseCarusel'
import * as $ from 'jquery';
import Glide from '@glidejs/glide'

if(document.querySelector("#main")) {
  var glide = new Glide('.glide', {
    perView: 3,
    focusAt: '1',
    type: 'carousel',
    animationDuration: 300,
    animationTimingFunc: 'ease-in',
    startAt: 1
  });
  var terrain = new Glide('.terrain__carousel', {
    perView: 3,
    focusAt: '0',
    type: 'carousel',
    animationDuration: 300,
    animationTimingFunc: 'ease-in',
    startAt: 1,
    peek: {
      before: 0,
      after: 100
    }
  });

  terrain.mount();
  glide.mount();
}
$(window).scroll(function() {
  if ($(window).scrollTop()  > 0)
  {
    $('.navbar').addClass('header__navbar-scroll')
  }
  if ($(window).scrollTop()  < 1)
  {
    $('.navbar').removeClass('header__navbar-scroll')
  }
});

if(document.querySelector(".selection")) {
  const select = new Select('#select', {
    placeholder: 'любая',
    selectedId: '1',
    data: [
      {id: 1, value: "200'000"},
      {id: 2, value: "250'000"},
      {id: 3, value: "300'000"},
      {id: 4, value: "350'000"},
      {id: 5, value: "400'000"},
      {id: 6, value: "450'000"}
    ],
    onSelect(item) {
      console.log('Selected Item', item)
    }
  });
  const select2 = new Select('#select2', {
    placeholder: 'любая',
    selectedId: '1',
    data: [
      {id: 1, value: "200'000"},
      {id: 2, value: "250'000"},
      {id: 3, value: "300'000"},
      {id: 4, value: "350'000"},
      {id: 5, value: "400'000"},
      {id: 6, value: "450'000"}
    ],
    onSelect(item) {
      console.log('Selected Item', item)
    }
  });
  const select1 = new Select('#select1', {
    placeholder: 'любая',
    selectedId: '1',
    data: [
      {id: 1, value: "200'000"},
      {id: 2, value: "250'000"},
      {id: 3, value: "300'000"},
      {id: 4, value: "350'000"},
      {id: 5, value: "400'000"},
      {id: 6, value: "450'000"}
    ],
    onSelect(item) {
      console.log('Selected Item', item)
    }
  });
}
if(document.querySelector("#main")) {
  new Terrain('.terrain__carousel', {
    data: [
      { id:1, src: 'img/terrain__1.jpg' },
      { id:2, src: 'img/terrain__2.jpg' },
      { id:3, src: 'img/terrain__1.jpg' },
      { id:4, src: 'img/terrain__2.jpg' },
      { id:5, src: 'img/terrain__1.jpg' },
      { id:6, src: 'img/terrain__2.jpg' }
    ]
  });

  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

  mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsemVyIiwiYSI6ImNrZzBxaWhoNzAzcWgycnBoZHJjaHRxMXUifQ.CEe4PZMxDD8pjYu83EPn9w';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/felzer/ckg0s10cy2hw719leiqczsmdw',
    center: [104.4, 52.25], // starting position
    zoom: 11, // starting zoom
    pitch: 40
  });
  map.addControl(new mapboxgl.NavigationControl());
  var marker = new mapboxgl.Marker()
      .setLngLat([104.441983, 52.222982])
      .addTo(map); // add the marker to the map
}
if(document.querySelector(".house-slider")) {
  new HouseCarusel('.house-slider', {
    selectedId: 2,
    data: [
      { id:1, src: 'img/house__1.png' },
      { id:2, src: 'img/house__2.png' },
      { id:3, src: 'img/house__3.png' },
      { id:4, src: 'img/house__4.png' }
    ]
  });
}
if(document.querySelector("#single-project")) {
  new Slider('.itemHouse__slider', {
    data: [
      { id:1, src: 'img/house__1.png' },
      { id:2, src: 'img/house__2.png' },
      { id:3, src: 'img/house__3.png' },
      { id:4, src: 'img/house__4.png' }
    ]
  });
}



