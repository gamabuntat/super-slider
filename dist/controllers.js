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
// $('#slider1').slider('option', 'toggleVisibility', 'display');
// $('#slider2').slider('option', 'toggleVisibility', 'scale');

class Slider {
  constructor(rootID) {
    this.rootID = `#${rootID}`;
  }

  getDisplayS() {
    return document.querySelector(`${this.rootID} .ui-slider__display_start`);
  }

  getDisplayE() {
    return document.querySelector(`${this.rootID} .ui-slider__display_end`);
  }

  getOptions() {
    return $(`${this.rootID}`).slider('option', 'get');
  }

  moveButton(pos, button) {
    $(`${this.rootID}`).slider('option', 'move', button, pos);
  }

  rebuild(options) {
    $(`${this.rootID}`).slider(options);
  }
}

class Interaction extends Slider {
  constructor(rootID) {
    super(rootID);
    document.getElementById(`${rootID}`).parentElement
      .querySelectorAll('input')
      .forEach((i) => (this[i.name] = i));
    this.btnS.addEventListener('change', (e) => (
      this.moveButton(e.target.value, 'buttonS')
    ));
    this.btnE.addEventListener('change', (e) => (
      this.moveButton(e.target.value, 'buttonE')
    ));
    this.observerS = new MutationObserver((mr) => (
      this.btnS.value = mr[0].target.childNodes[0].data
    ));
    this.observerE = new MutationObserver((mr) => (
      this.btnE.value = mr[0].target.childNodes[0].data
    ));
    this.observe();
  }

  observe() {
    this.observerS.observe(this.getDisplayS(), {childList: true});
    this.getDisplayE() && 
      this.observerE.observe(this.getDisplayE(), {childList: true});
  }

  toggleDisableInput(input) {
    input.disabled = !this.getOptions().interval;
  }

  compose(...fns) {
    return fns
      .map((f) => f.bind(this))
      .reduce((a, b) => (...args) => a(b(...args)));
  }
}

const interactions = (
  ['slider1', 'slider2', 'slider3', 'slider4'].map((s) => (
    new Interaction(s)
  ))
);

console.log(interactions[3])
