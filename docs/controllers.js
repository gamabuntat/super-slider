$('#slider1').slider(
  {interval: true, vertical: false, min: 0, max: 1, step: 0.011}
)
  .slider('option', 'move', 'buttonE', 0.8)
  .slider('option', 'move', 'buttonS', 1);
$('#slider2').slider(
  {interval: true, vertical: true, min: 0, max: 1, step: 0.1}
)
  .slider('option', 'move', 'buttonS', 0.4)
  .slider('option', 'move', 'buttonE', 0.8);
$('#slider4').slider(
  {interval: false, vertical: true, min: 1, max: 2, step: 0.01}
)
  .slider('option', 'move', 'buttonS', 1.7812);
$('#slider3').slider(
  {interval: false, vertical: false, min: 1, max: 2, step: 0.01}
)
  .slider('option', 'move', 'buttonS', 1.4293);


class ISlider {
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

  toggleVisibility(elem) {
    $(`${this.rootID}`).slider('option', 'toggleVisibility', elem);
  }

  rebuild(options) {
    $(`${this.rootID}`).slider(options);
  }
}

class Interaction extends ISlider {
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
    this.interval.addEventListener('change', (e) => (
      this.rebuild({interval: e.target.checked})
    ));
    this.vertical.addEventListener('change', (e) => (
      this.rebuild({vertical: e.target.checked})
    ));
    this.displays.addEventListener('change', () => (
      this.toggleVisibility('display'),
      this.updateO()
    ));
    this.scale.addEventListener('change', () => (
      this.toggleVisibility('scale'),
      this.updateO()
    ));
    this.max.addEventListener('change', (e) => (
      this.rebuild({max: e.target.value}),
      this.updateAttr()
    ));
    this.min.addEventListener('change', (e) => (
      this.rebuild({min: e.target.value}),
      this.updateAttr()
    ));
    this.step.addEventListener('change', (e) => (
      this.rebuild({step: e.target.value}),
      this.updateAttr()
    ));
    this.observerS = new MutationObserver((mr) => (
      this.btnS.value = mr[0].target.childNodes[0].data
    ));
    this.observerE = new MutationObserver((mr) => (
      this.btnE.value = mr[0].target.childNodes[0].data
    ));
    this.o = this.getOptions();
    this.observe();
    this.toggleDisableInput(this.btnE);
    this.init();
    this.updateAttr();
  }

  rebuild(newOption) {
    const newO = {...this.o, ...newOption};
    super.rebuild(newO);
    this.updateO();
    this.observe();
    this.toggleDisableInput(this.btnE);
  }

  updateO() {
    this.o = this.getOptions();
  }
  
  updateAttr() {
    this.btnS.max = this.o.max;
    this.btnS.min = this.o.min;
    this.btnS.step = this.o.step;
    if (this.o.interval) {
      this.btnE.max = this.o.max;
      this.btnE.min = this.o.min;
      this.btnE.step = this.o.step;
    }
  }

  observe() {
    this.observerS.observe(this.getDisplayS(), {childList: true});
    if (this.o.interval) {
      this.observerE.observe(this.getDisplayE(), {childList: true});
    }
  }

  toggleDisableInput(input) {
    input.disabled = !this.o.interval;
  }

  init() {
    this.max.value = String(this.o.max);
    this.min.value = String(this.o.min);
    this.step.value = this.o.step.toString();
    this.interval.checked = this.o.interval;
    this.vertical.checked = this.o.vertical;
    this.displays.checked = !this.o.displayVisibility;
    this.scale.checked = !this.o.scaleVisibility;
  }
}

['slider1', 'slider2', 'slider3', 'slider4'].map((s) => new Interaction(s));

