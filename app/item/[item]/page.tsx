import React from 'react'

const ItemPage = ({ params }: { params: { item: string }}) => {
  return (
    <div>
      <h1 className='text-3xl font-semibold capitalize'>{ params.item } Page</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Velit illo autem minima assumenda laborum ad corporis aliquid fugiat eos vel quas sequi iste molestiae, 
        voluptatum porro facere quod consequatur consectetur.
      </p>
    </div>
  )
}

export default ItemPage