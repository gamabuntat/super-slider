import s from 'slider/styles/Slider.module.sass';

type TreeTemplate = {
  name: string;
  classes?: string[];
  elementType?: string;
  childs?: TreeTemplate[];
};

const treeTemplate = {
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
                  classes: [s.Label],
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
                  classes: [s.Label],
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
} as const;

type ExtractChilds<T extends { [k: string]: any }> = {
  [K in keyof T]: GetTreeNames<T[K]>;
}[number];

type GetTreeNames<Tree> = {
  [K in keyof Tree]: K extends 'name'
    ? Tree[K]
    : K extends 'childs'
    ? ExtractChilds<Tree[K]>
    : never;
}[keyof Tree];

type TreeNames = GetTreeNames<typeof treeTemplate>;

export default JSON.parse(JSON.stringify(treeTemplate));

export type { TreeTemplate, TreeNames };
