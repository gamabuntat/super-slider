import s from 'slider/styles/Slider.module.sass';

type TreeTemplate = {
  name: string;
  classes?: string[];
  elementType?: string;
  childs?: TreeTemplate[];
};

const treeTemplate: TreeTemplate = {
  name: 'slider',
  classes: [s.Slider],
  childs: [
    {
      name: 'mainContainer',
      classes: [s.MainContainer],
      childs: [
        {
          name: 'fillerStart',
          classes: [s.Filler, s.FillerStateStart],
        },
        {
          name: 'fillerEnd',
          classes: [s.Filler, s.FillerStateEnd],
        },
        {
          name: 'container',
          classes: [s.Container],
          childs: [
            {
              name: 'handleStart',
              classes: [s.Handle, s.HandleStateStart],
              elementType: 'button',
              childs: [
                {
                  name: 'labelStart',
                  classes: [s.Label, s.LabelStateStart],
                },
              ],
            },
            {
              name: 'handleEnd',
              classes: [s.Handle, s.HandleStateEnd],
              elementType: 'button',
              childs: [
                {
                  name: 'labelEnd',
                  classes: [s.Label, s.LabelStateEnd],
                },
              ],
            },
            {
              name: 'track',
              classes: [s.Track],
              childs: [
                {
                  name: 'progressBarStart',
                  classes: [s.ProgressBar],
                },
                {
                  name: 'progressBarEnd',
                  classes: [s.ProgressBar],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'scale',
      classes: [s.Scale],
    },
  ],
};

export default treeTemplate;

export type { TreeTemplate };
