import { IEventEmitter } from 'slider/EventEmitter/EventEmitter';

import { TreeNames } from './treeTemplate';

type Components = Record<TreeNames, HTMLElement>;

interface IView extends IEventEmitter {
  parseResponse(response: Model): void;
}

export default IView;

export type { Components };
