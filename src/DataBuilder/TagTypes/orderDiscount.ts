import { TagTypeRecord } from '../../models';

const data = {
    id: 'r1EEa97sG',
    name: 'Order Discount',
    tagName: 'Discount',
    showValue: false,
    defaultValue: 'Discount',
    showQuantity: false,
    showUnit: false,
    showPrice: true,
    showSource: false,
    defaultSource: 'Discount',
    showTarget: false,
    showFunction: false,
    defaultFunction: '-(p*a)/100',
    displayFormat: `<div style="display:flex;margin-right:8px">
    <div style="flex:1">
    {%=o.value%} (%{%=o.price%})
    </div> 
    <div style="font-size:1.2em;color:red">
    {%=o.balance.toFixed(2)%}
    </div>
    </div>`
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