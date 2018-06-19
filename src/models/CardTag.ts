import { Record } from 'immutable';
import { Parser } from 'expr-eval';

export interface ICardTag {
    id: string;
    typeId: string;
    name: string;
    category: string;
    value: string;
    quantity: number;
    unit: string;
    amount: number;
    func: string;
    source: string;
    target: string;
    cardId: string;
    ref: string;
    sourceCardId: string;
    targetCardId: string;
    validUntil: number;
}

export class CardTagRecord extends Record<ICardTag>({
    id: '',
    typeId: '',
    name: '',
    category: '',
    value: '',
    quantity: 0,
    unit: '',
    amount: 0,
    func: '',
    source: '',
    target: '',
    cardId: '',
    ref: '',
    sourceCardId: '',
    targetCardId: '',
    validUntil: 0
}) {
    get display(): string {
        const key = !this.name || this.name[0] === '_' ? '' : this.name + ': ';
        return `${key}${this.valueDisplay}`;
    }

    get valueDisplay(): string {
        const u = this.unit ? ' ' + this.unit : '';
        const q = this.quantity !== 0 ? this.quantity + u + ' ' : '';
        return this.value ? q + this.value : '';
    }
    get realQuantity(): number {
        return this.quantity !== 0 ? this.quantity : 1;
    }
    public getDebit(parentDebit: number, parentCredit: number): number {
        return this.source ? this.realQuantity * this.getRealAmount(parentDebit, parentCredit) : 0;
    }
    public getCredit(parentDebit: number, parentCredit: number): number {
        return this.target ? this.realQuantity * this.getRealAmount(parentDebit, parentCredit) : 0;
    }
    public getBalance(parentDebit: number, parentCredit: number): number {
        return this.getDebit(parentDebit, parentCredit) - this.getCredit(parentDebit, parentCredit);
    }
    public getRealAmount(parentDebit: number, parentCredit: number): number {
        if (this.func) {
            return Parser.evaluate(this.func, {
                a: this.amount, d: parentDebit, c: parentCredit,
                p: parentDebit - parentCredit
            });
        }
        return this.amount;
    }

    public getInQuantityFor(location?: string): number {
        location = location && location.toLowerCase();
        if (this.valueMatches(location)) {
            return this.target ? this.quantity : 0;
        }
        return this.isTarget(location) ? this.quantity : 0;
    }

    public getOutQuantityFor(location?: string): number {
        location = location && location.toLowerCase();
        if (this.valueMatches(location)) {
            return this.target ? 0 : this.quantity;
        }
        return this.isSource(location) ? this.quantity : 0;
    }

    public getTotalQuantityFor(location: string): number {
        return this.getInQuantityFor(location) - this.getOutQuantityFor(location);
    }

    get locationDisplay(): string {
        return this.source || this.target ? `${this.source} > ${this.target}` : '';
    }

    public acceptsFilter(lowCaseFilter: string): boolean {
        lowCaseFilter = lowCaseFilter.toLowerCase();
        return this.matchesValue(lowCaseFilter)
            || this.matchesSource(lowCaseFilter)
            || this.matchesTarget(lowCaseFilter)
            || this.unitMatches(lowCaseFilter);
    }
    private matchesTarget(filter: string) {
        if (!this.target) { return false; }
        return this.target.toLowerCase().includes(filter);
    }
    private matchesSource(filter: string) {
        if (!this.source) { return false; }
        return this.source.toLowerCase().includes(filter);
    }
    private matchesValue(filter: string) {
        if (!this.value) { return false; }
        if (this.name === 'Name') { return false; }
        if (this.name === 'Source') { return false; }
        if (this.name === 'Target') { return false; }
        return this.value.toLowerCase().includes(filter);
    }
    private isUnitFilter(filter: string) {
        return filter.includes('.') && Boolean(this.unit);
    }
    private unitMatches(filter: string): boolean {
        if (!this.unit || !filter.includes('.')) { return false; }
        const parts = filter.split('.');
        return this.value.toLowerCase().includes(parts[0]) && this.unit.toLowerCase().includes(parts[1]);
    }
    private valueMatches(filter?: string): boolean {
        if (!filter) { return false; }
        if (this.isUnitFilter(filter)) { return this.unitMatches(filter); }
        return this.value.toLowerCase().includes(filter);
    }

    private isSource(location: string | undefined) {
        return this.source && (!location || this.source.toLowerCase().includes(location));
    }

    private isTarget(location: string | undefined) {
        return this.target && (!location || this.target.toLowerCase().includes(location))
    }
}
