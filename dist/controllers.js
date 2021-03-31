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
// $('#slider1').slider('option', 'toggleVisibility', 'display');
// $('#slider2').slider('option', 'toggleVisibility', 'scale');

class Slider {
  constructor(rootID) {
    this.rootID = `#${rootID}`;
    this.update();
  }

  getDisplayS() {
    return document.querySelector(`${this.rootID} .ui-slider__display_start`);
  }

  getDisplayE() {
    return document.querySelector(`${this.rootID} .ui-slider__display_end`);
  }

  update() {
    this.displayS = this.getDisplayS();
    this.displayE = this.getDisplayE() || false;
  }
}

class Interaction {
  constructor() {
    this.index = this.compose(this.whatIndex, this.findDisplayS);
    this.rootElems = document.querySelectorAll('.slider');
    this.sliders = (
      [...this.rootElems].map((s) => s.id).map((id) => new Slider(id))
    );
    this.buttonSInputs = (
      document.querySelectorAll('.controls input:first-child')
    );
    this.buttonEInputs = (
      document.querySelectorAll('.controls input:nth-child(2)')
    );
    this.buttonSInputs.forEach((i, idx) => (
      i.addEventListener('change', (e) => (
        $(this.sliders[idx].rootID)
          .slider('option', 'move', 'buttonS', e.target.value)
      ))
    ));
    this.buttonEInputs.forEach((i, idx) => (
      i.addEventListener('change', (e) => (
        $(this.sliders[idx].rootID)
          .slider('option', 'move', 'buttonE', e.target.value)
      ))
    ));
    this.observerS = new MutationObserver((mr) => {
      this.buttonSInputs[this.index(mr[0].target)].value = (
        mr[0].target.childNodes[0].data
      );
    });
    this.observerE = new MutationObserver((mr) => {
      this.buttonEInputs[this.index(mr[0].target)].value = (
        mr[0].target.childNodes[0].data
      );
    });
    this.sliders.forEach((s) => {
      this.observerS.observe(s.displayS, {childList: true});
      s.displayE && this.observerE.observe(s.displayE, {childList: true});
    });
  }

  findDisplayS(display) {
    return this.sliders.find((s) => (
      s.displayS === display || s.displayE === display
    ));
  }

  whatIndex(slider) {
    return slider.rootID.match(/\d/)[0] - 1;
  }

  compose(...fns) {
    return fns
      .map((f) => f.bind(this))
      .reduce((a, b) => (...args) => a(b(...args)));
  }
}

const interaction = new Interaction();

