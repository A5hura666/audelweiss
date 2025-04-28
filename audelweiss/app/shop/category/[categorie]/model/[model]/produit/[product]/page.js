"use client";

import { useParams } from 'next/navigation'

export default function Product(){
    const params = useParams();
    const productCategory = params.categorie;
    const productModel = params.productModel;
    const productName = params.product;

    return (
        <div>
            <h1>Product Page {productCategory} {productModel} {productName}</h1>
            <p>This is the product page.</p>
        </div>
    );
}