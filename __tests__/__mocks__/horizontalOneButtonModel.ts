import Model from '../../src/Model/Model';
import ButtonModel from '../../src/Model/ButtonModel';

function calcRelativeButtonW() {
  return this.buttonW / this.trackSize;
}

function calcRalativeDisplaySize() {
  return this.displaySize / this.trackSize;
}

function calcValueOfDivision() {
  return (this.max - this.min) / this.step;
}

let buttonModel: ButtonModel;

function createButtonModel(isInterval: boolean): ButtonModel {
  if (isInterval) {
    return buttonModel;
  }
  this.relativePos = isInterval ? 1 : 0;
  this.maxExtreme = isInterval ? 
};

const horizontalOneButtonModel: Model = {
  isVertical: false,
  isInterval: false,
  min: 0,
  max: 10,
  step: 1,
  trackCoord: 1,
  trackSize: 100,
  buttonS: buttonModel,
  buttonE: buttonModel,
  buttonW: 2,
  displaySize: 5,
  relativeButtonW: calcRelativeButtonW(),
  relativeDisplaySize: calcRalativeDisplaySize(),
  valueOfDivision: calcValueOfDivision(),
};

const horizontalTwoButtonModel: Model = {
  isVertical: false,
  isInterval: true,
  min: 0,
  max: 10,
  step: 1,
  trackCoord: 1,
  trackSize: 100,
  buttonS: buttonModel,
  buttonE: buttonModel,
  buttonW: 2,
  displaySize: 5,
  relativeButtonW: calcRelativeButtonW(),
  relativeDisplaySize: calcRalativeDisplaySize(),
  valueOfDivision: calcValueOfDivision(),
}

export {horizontalOneButtonModel};
