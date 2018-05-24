import { CardTypeRecord } from '../../models';
import orderProduct from '../TagTypes/orderProduct';
import orderDiscount from '../TagTypes/orderDiscount';

const data = {
    id: 'BJd0lPfsz',
    name: 'Orders',
    reference: 'Order',
    tagTypes: [orderProduct.id, orderDiscount.id]
};

// id: string;
// name: string;
// reference: string;
// displayFormat: string;
// commands: string[];
// tagTypes: string[];
// subCardTypes: string[];

export default new CardTypeRecord(data);
