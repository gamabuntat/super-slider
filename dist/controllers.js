$('#slider1').slider({interval: true, vertical: false, min: 0, max: 1, step: 0.011});
$('#slider2').slider({interval: true, vertical: true, min: 0, max: 1, step: 0.1});
$('#slider4').slider({interval: false, vertical: true, min: 1, max: 2, step: 0.01});
$('#slider3').slider({interval: false, vertical: false, min: 1, max: 2, step: 0.01});

$('#slider1').slider('option', 'move', 'buttonE', 0.8);
$('#slider1').slider('option', 'move', 'buttonS', 1);
$('#slider2').slider('option', 'move', 'buttonS', 0.4);
$('#slider2').slider('option', 'move', 'buttonE', 0.8);
$('#slider3').slider('option', 'move', 'buttonS', 1.4293);
$('#slider4').slider('option', 'move', 'buttonS', 1.7812);
console.log($('#slider2').slider('option', 'get'));
// $('#slider2').slider('option', 'toggleVisibility', 'display');
// $('#slider2').slider('option', 'toggleVisibility', 'scale');

[...document.querySelectorAll('.controls input:first-child')].forEach((i) => (
  i.addEventListener('change', (e) => (
    $(`#slider${e.target.dataset.sliderid}`)
      .slider('option', 'move', 'buttonS', e.target.value)
  ))
));

const displayStart = document.querySelector('.ui-slider__display_start');
const displaySObserver = new MutationObserver((mr) => (
  document.querySelector('.controls input:first-child').value = (
    mr[0].target.childNodes[0].data
  )
));
displaySObserver.observe(displayStart, {childList: true});
