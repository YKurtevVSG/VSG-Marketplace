import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { IProduct } from '../../types';
import InventoryTableRow from '../../components/Inventory/InventoryTableRow';
import AddItemModal from '../../components/Inventory/AddItemModal';
import Button from '../../components/Global/Button';
import { setTabTitle } from '../../utils/helperFunctions';
import { useGetProductsQuery } from '../../services/productsService';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Loader from '../../components/Global/Loader';
import NoItemsInList from '../../components/Global/NoItemsInList';

const Inventory = () => {
    setTabTitle('Inventory');
    // Fetched products and locations
    const { data: products, isLoading } = useGetProductsQuery();
    // Add modal state
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    // Inventory products state
    const [inventoryProductsState, setInventoryProductsState] = useState<IProduct[]>([]);
    // Search value state
    const [searchValue, setSearchValue] = useState<string>('');

    // Set invetory products state
    useEffect(() => {
        products && setInventoryProductsState(products);
    }, [products]);

    // Add modal open-close functionality
    const handleAddModal = () => {
        setOpenAddModal(prevState => !prevState);
    };

    const rows: GridRowsProp = inventoryProductsState.map((x: IProduct) => ({
        id: x.id,
        code: x.code,
        name: x.name,
        categoryName: x.categoryName,
        locationName: x.locationName,
        quantityForSale: x.quantityForSale,
        quantityForRent: x.quantityForRent,
        quantity: x.quantity,
        actions: x
    }));

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Code', headerClassName: 'data-grid-header', width: 150 },
        { field: 'name', headerName: 'Name', headerClassName: 'data-grid-header', width: 300 },
        { field: 'categoryName', headerName: 'Category', headerClassName: 'data-grid-header', width: 200 },
        { field: 'locationName', headerName: 'Location', headerClassName: 'data-grid-header', width: 200 },
        { field: 'quantityForSale', headerName: 'For Sale', headerClassName: 'data-grid-header', width: 150 },
        { field: 'quantityForRent', headerName: 'For Lend', headerClassName: 'data-grid-header', width: 150 },
        { field: 'quantity', headerName: 'QTY', headerClassName: 'data-grid-header', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            headerClassName: 'data-grid-header',
            width: 100,
            renderCell(params) {
                const item = params.value as IProduct;
                return <InventoryTableRow props={item} setInventoryProducts={setInventoryProductsState} />
            },
        }
    ]

    const noItems = () => {
        return (
            <NoItemsInList props={{ text: 'Inventory' }} />
        )
    }

    return (
        <>
            {/* Add item modal */}
            <AddItemModal props={{ open: openAddModal, handleClose: handleAddModal, setInventoryProducts: setInventoryProductsState }} />
            {/* Inventory */}
            <main id="main-container-inventory">
                <div id="inventory-wrapper">
                    <div className='search-add-container'>
                        {/* Search */}
                        <div className="search">
                            <form id="search-form">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        className='input-field'
                                        id="input-with-sx"
                                        label="Search"
                                        variant="standard"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </Box>
                            </form>
                        </div>
                        {/* Add button */}
                        <Button className='add-btn' buttonText='Add Item' buttonType='button' onClick={() => handleAddModal()}>
                            <AddIcon />
                        </Button>
                    </div>
                    {/* Table */}
                    {/* {isLoading
                        ?
                        <div className='loading-container'>
                            <LinearProgress color='error' className='loading-line' />
                            <span>Loading...</span>
                        </div>
                        : */}
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        className='data-table'
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10
                                }
                            }
                        }}
                        autoHeight
                        loading={isLoading}
                        slots={{
                            loadingOverlay: Loader,
                            noRowsOverlay: noItems
                        }}
                        pageSizeOptions={[10]}
                        disableColumnSelector
                        disableRowSelectionOnClick
                    />
                    {/* } */}
                </div>
            </main >
        </>
    );
}

export default Inventory;