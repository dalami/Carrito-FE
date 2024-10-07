import { fetchDataPbyId } from '@/components/Fetching/fetchData'
import ProductDetail from '@/components/ProductDetail/ProductDetail'
import React from 'react'

interface DetailProps {
    params: {
        productId: string;
    };
}

const Detail = async ({ params }: DetailProps) => {
    const product = await fetchDataPbyId(params.productId);
    return <ProductDetail {...product} />;
};

export default Detail;