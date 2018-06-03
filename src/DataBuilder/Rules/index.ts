import { Map as IMap } from 'immutable';
import { RuleRecord } from '../../models';

export default (): IMap<string, RuleRecord> => {
    let rules: IMap<string, RuleRecord> = IMap<string, RuleRecord>();
    [
        'defaultRules',
        'paymentRules',
        'tableSelectionRules',
        'addProductRules',
        'editCardRule',
        'testRule'
    ].map(r => require('./' + r).default).forEach(rule => { rules = rules.set(rule.id, rule); });
    return rules;
};