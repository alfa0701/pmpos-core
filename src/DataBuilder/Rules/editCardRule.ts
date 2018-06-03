import { RuleRecord } from '../../models';
import * as shortid from 'shortid';

const data = {
    id: shortid.generate(),
    name: 'Edit Card Rule',
    content: `rule EditCard {
        when {
            r: Result;
            s: State;
            a: Action(a.type == 'EXECUTE_COMMAND' && a.data.name == 'Edit Card') from s.action;
        }
        then {
            r.add('EDIT_CARD', {
                card: s.card
            });
        }
    }
    
    rule updateCard {
        when {
            r: Result;
            s: State;
            a: Action(a.type == 'EDIT_CARD') from s.action;
        }
        then {
            for (const [key, values] of a.data.deletedValues) {
                if (key === 'Portions') continue;
                for (const value of values) {
                    r.add('SET_CARD_TAG', {
                        value: '',
                        name: value.tagName
                    });
                }
            }
    
            for (const [key, values] of a.data.newValues) {
                if (key === 'Portions') {
                    const value = values[0];
                    const tag = s.card.allTags.find(x => x.name === 'Product');
                    r.add('SET_CARD_TAG', {
                        name: tag.name,
                        value: tag.value,
                        category: tag.category,
                        ref: value.ref,
                        unit: value.value,
                        amount: value.amount,
                        quantity: tag.quantity
                    });
                } else {
                    for (const value of values) {
                        r.add('SET_CARD_TAG', {
                            value: value.value,
                            category: key,
                            ref: value.ref,
                            amount: value.amount,
                            quantity: value.quantity > 1 ? value.quantity : 0
                        });
                    }
                }
            }
        }
    }`
};

export default new RuleRecord(data);