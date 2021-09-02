import './demo.sass';

console.log('demo');

$('#slider1').slider({
  step: 2.123, max: -32, min: -74, isInterval: true, from: -52.77
});
$('#slider2').slider({ isVertical: false })
  .slider({ isVertical: true, max: 2 });
$('#slider3').slider({});
$('#slider4')
  .slider({
    isInterval: false, isVertical: false, min: -10, max: 100, step: 2,
  })
  .slider({ isInterval: true, isVertical: true })
;


