import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {findByText, render} from '@testing-library/react'
import axios from 'axios'
import ProductList from '../components/ProductList'
import * as apiUtils from '../helpers/api'


test('render ProductList', async (object, method) => {

    jest.mock('axios')
    const product_list = [
        {
            price: 19.99,
            product_title: 'H&M - Slim Jeans - Blue',
            product_imgs_src: ['https://sampleimages.com/img1.jpg'],
        },
        {
            price: 24.99,
            product_title: 'H&M - 2-pack Knit Hats - Black',
            product_imgs_src: ['https://sampleimages.com/img2.jpg'],
        }]

    jest.spyOn(apiUtils, 'getProducts', 'get').mockImplementation(() => {
        return Promise.resolve({data: product_list})
    })

    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(
        {
            "results": product_list,
            "next": null,
            "previous": null,
            "current": 1,
            "lastPage": 1,
            "countItemsOnPage": 2,
            "count": 2
        }
    ))

    const rendered_component = render(<ProductList/>)
    const container = rendered_component.container;

    // const container_selector = rendered_component.findByText()
    expect(await findByText(container, 'H&M - Slim Jeans - Blue')).toBeInTheDocument()

    const buttons_selector = container.querySelectorAll('button')
    const previous_button = buttons_selector[0]
    const next_button = buttons_selector[4]
    expect(previous_button).toHaveTextContent('Previous')
    expect(previous_button).toBeDisabled()
    expect(next_button).toHaveTextContent('Next')
    expect(next_button).toBeDisabled()

    expect(container.querySelector("button[value='1']")).toHaveClass('bg-blue-500')

    expect(container.querySelector("span[value='2 Products']"))
        .toHaveTextContent('2 Products')

    expect(container.getElementsByClassName('uppercase').length).toBe(2);
});
