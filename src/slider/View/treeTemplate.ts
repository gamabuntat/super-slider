import IViewTreeTemplate from './interfaces/IViewTreeTemplate';

const treeTemplate: IViewTreeTemplate = {
  name: 'ui-slider',
  elementType: 'div',
  childs: [
    {
      name: 'mainContainer',
      elementType: 'div',
      childs: [
        {
          name: 'gigletStart',
          elementType: 'div',
        },
        {
          name: 'gigletEnd',
          elementType: 'div',
        },
        {
          name: 'container',
          elementType: 'div',
          childs: [
            {
              name: 'handleStart',
              elementType: 'button',
              childs: [
                {
                  name: 'labelStart',
                  elementType: 'div'
                }
              ]
            },
            {
              name: 'handleEnd',
              elementType: 'button',
              childs: [
                {
                  name: 'labelEnd',
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

