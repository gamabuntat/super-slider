import IViewTreeTemplate from './interfaces/IViewTreeTemplate';

const treeTemplate: IViewTreeTemplate = {
  name: 'ui-slider',
  elementType: 'div',
  childs: [
    {
      name: 'container',
      elementType: 'div',
      childs: [
        {
          name: 'handleStart',
          elementType: 'button',
          childs: [
            {
              name: 'lableStart',
              elementType: 'div'
            }
          ]
        },
        {
          name: 'handleEnd',
          elementType: 'button',
          childs: [
            {
              name: 'lableEnd',
              elementType: 'div'
            }
          ]
        },
        {
          name: 'track',
          elementType: 'div',
          childs: [
            {
              name: 'progressBarStart',
              elementType: 'div'
            },
            {
              name: 'progressBarEnd',
              elementType: 'div'
            }
          ]
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

