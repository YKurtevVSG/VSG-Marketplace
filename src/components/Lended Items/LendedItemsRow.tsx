import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography, Fade } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ILendedItem, IUser, IUserLendedItems } from "../../types";
import UserLendedItemRow from "./UserLendedItemRow";
import { Dispatch, SetStateAction, useState } from "react";
import { useGetUsersQuery } from "../../services/usersService";

type LendedItemProps = {
    props: IUserLendedItems,
    setLendedItems: Dispatch<SetStateAction<IUserLendedItems[]>>
}

const LendedItemsRow = ({ props }: LendedItemProps) => {
    const [userItemsState, setUserItems] = useState(props.items);

    const { data: users } = useGetUsersQuery();

    const username = users?.find((x: IUser) => x.email.toLowerCase() === props.email.toLowerCase())?.name;
    const userPhoto = users?.find((x: IUser) => x.email.toLowerCase() === props.email.toLowerCase())?.avatar;

    return (
        <Fade in={true} timeout={500}>
            <Accordion className="lended-item-accordion">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Avatar className="avatar" src={userPhoto} />
                    <Typography>{username}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="table-header-lended-items">
                        <div className="table-first-group">
                            <div className="col col-1">Code</div>
                            <div className="col col-2">Name</div>
                            <div className="col col-3">QTY</div>
                        </div>
                        <div className="table-second-group">
                            <div className="col col-4">Lend Date</div>
                            <div className="col col-5">Return Date</div>
                            <div className="col col-6">Status</div>
                        </div>
                    </div>
                    {userItemsState.map((x: ILendedItem) =>
                        <UserLendedItemRow
                            props={{
                                id: x.id,
                                quantity: x.quantity,
                                orderDate: x.orderDate,
                                email: x.email,
                                endDate: x.endDate,
                                code: x.code,
                                name: x.name
                            }}
                            setLendedItems={setUserItems}
                            key={x.id}
                        />
                    )}
                </AccordionDetails>
            </Accordion>
        </Fade>
    )
}

export default LendedItemsRow;