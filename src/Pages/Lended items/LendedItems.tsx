import LendedItemsRow from "../../components/Lended Items/LendedItemsRow";
import { useGetRentItemsQuery } from "../../services/rentItemsService";
import { IUserLendedItems } from "../../types";
import { setTabTitle } from "../../utils/helperFunctions";
import { useState, useEffect } from 'react';
import NoItemsInList from "../../components/Global/NoItemsInList";
import Loader from "../../components/Global/Loader";

const LendedItems = (): JSX.Element => {
    setTabTitle('Lended items');
    // Fetched rented items
    const { data: rentedItems, isSuccess, isLoading } = useGetRentItemsQuery();
    // Rented items state
    const [rentedItemsState, setRentedItemsState] = useState<IUserLendedItems[]>([]);

    // Set rented items state
    useEffect(() => {
        rentedItems && setRentedItemsState(rentedItems);
    }, [rentedItems]);

    return (
        <main id="main-container-lended-items">
            <div className="rows">
                {isLoading
                    ?
                    <Loader />
                    : isSuccess && rentedItemsState?.length < 1
                        ? <NoItemsInList props={{ text: 'Lended items' }} />
                        : rentedItemsState.map((x: IUserLendedItems) =>
                            <LendedItemsRow
                                props={{
                                    email: x.email,
                                    items: x.items
                                }}
                                setLendedItems={setRentedItemsState}
                                key={x.email}
                            />
                        )
                }
            </div>
        </main>
    )
}

export default LendedItems;