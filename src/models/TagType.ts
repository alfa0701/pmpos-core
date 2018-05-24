import { Record } from 'immutable';

export interface ITagType {
    id: string;
    name: string;
    tagName: string;
    cardTypeReferenceName: string;
    showValue: boolean;
    showQuantity: boolean;
    showUnit: boolean;
    showPrice: boolean;
    showSource: boolean;
    showTarget: boolean;
    showFunction: boolean;
    sourceCardTypeReferenceName: string;
    targetCardTypeReferenceName: string;
    displayFormat: string;
    icon: string;
    defaultFunction: string;
    defaultValue: string;
    defaultSource: string;
    defaultTarget: string;
    defaultQuantity: number;
    defaultUnit: string;
    defaultPrice: number;
}

export class TagTypeRecord extends Record<ITagType>({
    id: '',
    name: '',
    tagName: '',
    cardTypeReferenceName: '',
    showValue: true,
    showQuantity: true,
    showUnit: true,
    showPrice: true,
    showSource: true,
    showTarget: true,
    showFunction: false,
    sourceCardTypeReferenceName: '',
    targetCardTypeReferenceName: '',
    displayFormat: '',
    icon: '',
    defaultFunction: '',
    defaultValue: '',
    defaultSource: '',
    defaultTarget: '',
    defaultQuantity: 0,
    defaultUnit: '',
    defaultPrice: 0
}) {
    public isTagSelection(): boolean {
        if (!this.id || !this.cardTypeReferenceName || !this.showValue
            || this.showQuantity || this.showUnit || this.showPrice
            || this.showSource || this.showTarget || this.showFunction) {
            return false;
        }
        return true;
    }
}