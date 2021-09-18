import './demo.sass';

import Conf from './Conf';

const options: IOptions[] = [
  {
    step: 1.333, max: 10.01, min: -1, isInterval: true
  },
  {
    isVertical: true, max: 2.2
  },
  {
    max: 9.001
  },
  {
    isInterval: true, isVertical: true, min: -10, max: 100, step: 2,
  },
];

document
  .querySelectorAll<HTMLElement>('.js-container')
  .forEach((c, idx) => new Conf(c).init(options[idx]));

