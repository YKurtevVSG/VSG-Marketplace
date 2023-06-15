import { IDescriptionModal } from "../../types";
import Modal from '../Global/ModalWrapper';

type DescriptionModalProps = {
    props: IDescriptionModal
}

const DescriptionModal = ({ props }: DescriptionModalProps): JSX.Element => {
    return (
        <Modal props={{ open: props.open, handleClose: props.handleClose, modalType: 'description' }}>
            <>
                <img src={props.img ? props.img : '../Images/no_image-placeholder.png'} alt="Item image" className="description-img"/>
                <div className="item-description">
                    <div className="top">
                        <div className="title-category">
                            <span className="title">{props.name}</span>
                            <span className="category">{props.categoryName}</span>
                            <span className="category">{props.locationName}</span>
                        </div>
                        <div className="price-quantity">
                            <span className="price">{props.price} BGN</span>
                            <span className="quantity">Qty: {props.quantityForSale}</span>
                        </div>
                    </div>
                    <p className='description'>{props.description}</p>
                </div>
            </>
        </Modal>
    )
}

export default DescriptionModal;