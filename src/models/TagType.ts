import { Record } from 'immutable';

export interface ITagType {
    id: string;
    name: string;
    tagName: string;
    cardTypeReferenceName: string;
    showCategory: boolean;
    showValue: boolean;
    showQuantity: boolean;
    showUnit: boolean;
    showAmount: boolean;
    showSource: boolean;
    showTarget: boolean;
    showFunction: boolean;
    showValidUntil: boolean;
    sourceCardTypeReferenceName: string;
    targetCardTypeReferenceName: string;
    displayFormat: string;
    icon: string;
    defaultFunction: string;
    defaultCategory: string;
    defaultValue: string;
    defaultSource: string;
    defaultTarget: string;
    defaultQuantity: number;
    defaultUnit: string;
    defaultAmount: number;
    defaultValidUntil: string;
}

export class TagTypeRecord extends Record<ITagType>({
    id: '',
    name: '',
    tagName: '',
    cardTypeReferenceName: '',
    showCategory: true,
    showValue: true,
    showQuantity: true,
    showUnit: true,
    showAmount: true,
    showSource: true,
    showTarget: true,
    showFunction: false,
    showValidUntil: false,
    sourceCardTypeReferenceName: '',
    targetCardTypeReferenceName: '',
    displayFormat: '',
    icon: '',
    defaultFunction: '',
    defaultCategory: '',
    defaultValue: '',
    defaultSource: '',
    defaultTarget: '',
    defaultQuantity: 0,
    defaultUnit: '',
    defaultAmount: 0,
    defaultValidUntil: ''
}) {
    public isTagSelection(): boolean {
        if (!this.id || !this.cardTypeReferenceName || !this.showValue || this.showCategory
            || this.showQuantity || this.showUnit || this.showAmount || this.showValidUntil
            || this.showSource || this.showTarget || this.showFunction) {
            return false;
        }
        return true;
    }
}