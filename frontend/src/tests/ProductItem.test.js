import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import ProductItem from '../components/ProductItem'


test('rendered ProductItem', () => {
    const product_item = {
        price: 19.99,
        product_title: 'H&M - Slim Jeans - Blue',
        product_imgs_src: ['https://sampleimages.com/img1.jpg'],
    }

  const rendered_component = render(
    <ProductItem product={product_item} />
  )

  expect(rendered_component.container).toHaveTextContent('H&M - Slim Jeans - Blue')
  expect(rendered_component.container).toHaveTextContent('19.99')
})
