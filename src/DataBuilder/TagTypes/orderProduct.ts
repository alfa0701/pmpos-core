import { TagTypeRecord } from '../../models';

const data = {
    id: 'ByEMXv65M',
    name: 'Order Product',
    tagName: 'Product',
    cardTypeReferenceName: 'Product',
    showValue: true,
    showQuantity: true,
    defaultQuantity: 1,
    showUnit: false,
    showPrice: true,
    showSource: true,
    showTarget: false,
    showFunction: false,
    icon: '_',
    sourceCardTypeReferenceName: 'Location'
};

// id: string;
// name: string;
// tagName: string;
// cardTypeReferenceName: string;
// showValue: boolean;
// showQuantity: boolean;
// showUnit: boolean;
// showPrice: boolean;
// showSource: boolean;
// showTarget: boolean;
// showFunction: boolean;
// sourceCardTypeReferenceName: string;
// targetCardTypeReferenceName: string;
// displayFormat: string;
// icon: string;
// defaultFunction: string;
// defaultValue: string;
// defaultSource: string;
// defaultTarget: string;
// defaultQuantity: number;
// defaultUnit: string;
// defaultPrice: number;

export default new TagTypeRecord(data);