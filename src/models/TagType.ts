import { Record } from 'immutable';
import { CardTagRecord } from './CardTag';
import { conformToMask } from 'vanilla-text-mask';

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
    mask: string;
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
    mask: '',
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
    private internalRealMask;

    public get realMask() {
        if (this.internalRealMask === undefined) {
            this.internalRealMask = this.createMaskFrom(this.mask);
        }
        return this.internalRealMask;
    }

    public isTagSelection(): boolean {
        if (!this.id || !this.cardTypeReferenceName || !this.showValue || this.showCategory
            || this.showQuantity || this.showUnit || this.showAmount || this.showValidUntil
            || this.showSource || this.showTarget || this.showFunction) {
            return false;
        }
        return true;
    }

    public getValueDisplay(tag: CardTagRecord) {
        const result = tag.getValueDisplay();
        if (this.realMask) {
            const conformedResult = conformToMask(result, this.realMask, { guide: false });
            return conformedResult.conformedValue;
        }
        return result;
    }

    public createMaskFrom(mask: string) {
        if (!mask) { return null; }
        const parts = mask.split(' ');
        const result = parts.map(x => {
            if (x.length > 1) {
                return new RegExp(x);
            }
            if (x === '_') { return ' '; }
            return x;
        });
        return result;
    }
}