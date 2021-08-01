type elementType = 'div' | 'button'

interface ISNodeData {
  elementType: elementType
  name: string
  isVertical?: boolean
  isInterval?: boolean
}

export default ISNodeData;

