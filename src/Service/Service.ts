import EventEmitter from '../EventEmitter/EventEmitter';
import Model from '../Model/Model';

export default class Service extends EventEmitter {
  private activeButton: buttonT[]
  constructor(private m: Model) {
    super();
    this.activeButton = ['buttonS', 'buttonE'];
  }

  getOptions(): Options {
    return {
      interval: this.m.isInterval,
      vertical: this.m.isVertical,
      displayVisibility: this.m.displayVisibility,
      scaleVisibility: this.m.scaleVisibility,
      min: this.m.min,
      max: this.m.max,
      step: this.m.step,
    };
  }

  getTrackSizes(): void {
    this.emit('getTrackSizes');
  }

  validateButtonPosition(button: buttonT, pos: number): void {
    if (!this.m.isInterval && button == 'buttonE') { return; }
    if (this.m.isInterval && this.activeButton[0] != button) {
      this.activeButton.reverse();
    }
    this.getTrackSizes();
    this.emit(
      'sendButtonApi',
      Math.min(this.m.max, Math.max(pos, this.m.min)),
      this.m.max,
      this.m.min,
      this.m[this.activeButton[0]].maxExtreme,
      this.m[this.activeButton[0]].minExtreme
    );
  }

  updateVisibility(prop: visibilityT): void {
    const key = prop == 'scale' ? 'scaleVisibility' : 'displayVisibility';
    this.m[key] = !this.m[key];
    this.emit(`toggle${key[0].toUpperCase()}${key.slice(1)}`);
  }

  determineButton(coord: number): void {
    let relativePointerPosition = (
      (coord - this.m.trackCoord) / this.m.trackSize
    );
    if (this.m.isVertical) {
      relativePointerPosition = 1 - relativePointerPosition;
    }
    const diff = this.activeButton.reduce((diff, b) => (
      Math.abs(
        relativePointerPosition - (
          this.m[b].relativePos 
          + this.m.relativeButtonW * (b == 'buttonS' ? -0.5 : 0.5)
        )
      ) - diff
    ), 0);
    diff < 0 && this.activeButton.reverse();
  }

  setExtremes(): void {
    this.m.buttonS.maxExtreme = this.m.buttonE.relativePos;
    this.m.buttonE.minExtreme = this.m.buttonS.relativePos;
  }

  sendButtonData(coord: number): void {
    this.getTrackSizes();
    this.emit(
      'sendButtonData',
      coord,
      this.m[this.activeButton[0]].maxExtreme, 
      this.m[this.activeButton[0]].minExtreme,
      this.m.trackCoord,
      this.m.trackSize
    );
  }

  sendDisplayData(): void {
    this.emit(
      'sendDisplayData',
      this.m[this.activeButton[0]].relativePos,
      this.m.trackSize,
      this.m.isInterval ? this.m[this.activeButton[0]].maxExtreme : Infinity,
      this.m[this.activeButton[0]].minExtreme,
    );
    this.emit(
      'changeValue',
      this.m[this.activeButton[0]].relativePos,
      this.m.min,
      this.m.max,
      this.m.step
    );
  }

  sendProgressBarData(): void {
    this.emit(
      'changeSize',
      this.m[this.activeButton[0]].relativePos,
      this.m.relativeButtonW
    );
  }

  sendScaleData(): void {
    this.emit('sendScaleData', this.m.max, this.m.min, this.m.step);
  }

  getActiveButton(): buttonT {
    return this.activeButton[0];
  }

  saveLastPosition(coord: number): void {
    let relPos = (coord - this.m.trackCoord) / this.m.trackSize;
    if (this.m.isVertical) {
      relPos = 1 - relPos;
    }
    this.m[this.activeButton[0]].relativePos = relPos;
    if (this.m.isInterval) {
      this.setExtremes();
    }
    this.sendDisplayData();
    this.sendProgressBarData();
  }

  updateSizes(size: number, coord: number): void {
    this.m.trackSize = size;
    this.m.trackCoord = coord;
    this.m.relativeButtonW = this.m.buttonW / size;
    this.m.relativeDisplaySize = this.m.displaySize / size;
  }

  init(): void {
    this.sendButtonData(this.m.isVertical ? Infinity : -Infinity);
    this.sendDisplayData();
    if (this.m.isInterval) {
      this.activeButton.reverse();
      this.sendButtonData(this.m.isVertical ? -Infinity : Infinity);
      this.sendDisplayData();
    }
    if (!this.m.displayVisibility) {
      this.emit('toggleDisplayVisibility');
    }
    if (!this.m.scaleVisibility) {
      this.emit('toggleScaleVisibility');
    }
    this.sendScaleData();
  }
}

