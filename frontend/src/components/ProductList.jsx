import React, {useEffect, useState} from "react";
import axios from 'axios';
import {getBaseApiUrl} from "../helpers/utils";
import ProductItem from "./ProductItem";


const ProductList = () => {
    let [products, setProductsList] = useState([]);
    let [filtered_products_count, setFilteredProductsCount] = useState(0);
    let [search_term, setSearchTerm] = useState('');
    let [isLoading, setIsLoading] = useState(false);
    let [current_page, setCurrentPage] = useState(1);
    let [next_page, setNextPage] = useState('api/products/?page=2');
    let [previous_page, setPreviousPage] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            search(current_page);
        }
    };

    const handleOnBlur = () => {
        search(current_page)
    };

    const get_button_styles = (disabled) => {
        const button_disabled = "opacity-50 cursor-not-allowed"
        const button_styles = "py-2 px-4 leading-tight border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
        return disabled ? button_disabled + " " + button_styles : button_styles;
    }

    const handlePrevious = () => {
        search(current_page -1);
    };

    const handleNext = () => {
        search(current_page + 1);
    }

    const handlePageClick = (event) => {
        if (event.target.value === current_page || !next_page){
            return;
        }
        search(event.target.value);
    }

    const search =  (page_number) => {
        let baseApiUrl = getBaseApiUrl();
        setIsLoading(true);
        axios({
            "method": "GET",
            "url": `${baseApiUrl}/api/products/`,
            params : {
                search: search_term,
                page: page_number
            }
        }).then((response) => {
            setFilteredProductsCount(response.data.count)
            setProductsList(response.data.results)
            setCurrentPage(response.data.current)
            setNextPage(response.data.next)
            setPreviousPage(response.data.previous)
        }).catch((error) => {
            console.log(error)
        })
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        search()
    }, [setIsLoading])

    const ProductItems = () => {
        if (isLoading) {
            return <div className="text-center">Loading...</div>
        }
        return (
            <div className="my-8">
                <div className="container mx-auto px-6">
                    <h3 className="text-gray-700 text-2xl font-medium">{search_term}</h3>
                    <span className="mt-3 text-sm text-gray-500">{filtered_products_count} Products</span>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                        {
                            products.map((product) => {
                                return <ProductItem key={product.id} product={product}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="container mx-auto px-6 py-3">
                <div className="relative mt-6 max-w-lg mx-auto mb-auto">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                    <input onKeyDown={handleKeyDown} value={search_term} onChange={e => setSearchTerm(e.target.value)} onBlur={handleOnBlur} type="text" placeholder="Search"
                        className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"/>
                </div>
            </div>
            <ProductItems/>
            <div className="flex justify-center mt-5 mb-5">
                <div className="flex rounded-md mt-8">
                    <button onClick={handlePrevious} disabled={!previous_page} className={get_button_styles(!previous_page) + " ml-0 rounded-l"} >
                        <span>Previous</span></button>
                    <button value={current_page} onClick={handlePageClick} className={get_button_styles(false) + " text-white bg-blue-500"}>
                        <span>{current_page}</span></button>
                    <button value={current_page + 1} onClick={handlePageClick} className={get_button_styles(false)}>
                        <span>{current_page + 1}</span></button>
                    <button value={current_page + 2} onClick={handlePageClick} className={get_button_styles(false)}>
                        <span>{current_page + 2}</span></button>
                    <button onClick={handleNext} disabled={!next_page} className={get_button_styles(!next_page)}>
                        <span>Next</span></button>
                </div>
            </div>
        </div>
    )
}

export default ProductList;