import './demo.sass';

import Conf from '../conf/Conf';

const options: IOptions[] = [
  {
    step: 0.1, max: 1e3, min: 0, isInterval: false
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

