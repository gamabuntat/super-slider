import IViewTreeTemplate from './interfaces/IViewTreeTemplate';

const treeTemplate: IViewTreeTemplate = {
  name: 'ui-slider',
  elementType: 'div',
  childs: [
    {
      name: 'foremostContainer',
      elementType: 'div',
      childs: [
        {
          name: 'handleStart',
          elementType: 'button'
        },
        {
          name: 'handleEnd',
          elementType: 'button'
        },
        {
          name: 'track',
          elementType: 'div',
          childs: []
        }
      ]
    },
    {
      name: 'scale',
      elementType: 'div'
    }
  ]
};

export default treeTemplate;

