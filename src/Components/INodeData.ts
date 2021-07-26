type elementType = 'div' | 'button'

interface INodeData {
  elementType: elementType
  name: string
  isVertical?: boolean
  isInterval?: boolean
}

export default INodeData;

