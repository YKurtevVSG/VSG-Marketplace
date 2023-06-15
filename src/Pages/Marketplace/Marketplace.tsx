import { useEffect, useState } from 'react';
import { IProduct } from "../../types";
import MarketplaceItemCard from "../../components/Marketplace/MarketplaceItemCard";
import { setTabTitle } from "../../utils/helperFunctions";
import { useGetProductsQuery } from "../../services/productsService";
import NoItemsInList from "../../components/Global/NoItemsInList";
import Loader from '../../components/Global/Loader';

const Marketplace = (): JSX.Element => {
    setTabTitle('Marketplace');
    // Fetched products
    const { data: products, isSuccess, isLoading } = useGetProductsQuery();
    // Marketplace products state
    const [marketplaceProductsState, setMarketplaceProductsState] = useState<IProduct[]>([]);

    // Set marketplace products state
    useEffect(() => {
        products && setMarketplaceProductsState(products?.filter((x: IProduct) => x.quantityForSale > 0));
    }, [products]);

    return (
        <main id="main-container-marketplace">
            <article className="items">
                {isLoading === true
                    ?
                    <Loader />
                    : isSuccess && marketplaceProductsState?.length < 1
                        ? <NoItemsInList props={{ text: 'Marketplace' }} />
                        : marketplaceProductsState.map((x: IProduct) => <MarketplaceItemCard props={x} setMarketplaceProductsState={setMarketplaceProductsState} key={x.id} />)
                }
            </article>
        </main>
    )
}

export default Marketplace;