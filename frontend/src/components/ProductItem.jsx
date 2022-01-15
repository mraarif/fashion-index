import React from 'react';

function ProductItem({product}) {
    return (
        <div className="w-full max-w-xs mx-auto rounded-md shadow-md">
            <div className="flex items-end justify-end h-56 w-full bg-cover hover:bg-contain"
                 style={{backgroundImage: `url('${product.product_imgs_src[0]}')`}}>
            </div>
            <div className="px-5 py-3">
                <h4 className="text-gray-700 uppercase">{product.product_title}</h4>
                <span className="text-gray-500 mt-2">${product.price}</span>
            </div>
        </div>
    );
}

export default ProductItem;