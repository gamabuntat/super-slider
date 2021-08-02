type ISNodeDataBasic = {
  elementType: 'div' | 'button'
  name: string
}

interface ISNodeData extends ISNodeDataBasic {
  isInterval?: boolean
  isVertical?: boolean
}

export default ISNodeData;

