import { RuleRecord } from '../../models';

const data = {
    id: 'Sy_87lXem',
    name: 'New Card Props',
    content: `
    rule SetNewCardProps {
        when {
            r: Result;
            s: State;
            a: Action(a.type == 'CREATE_CARD' && a.data.type == 'Modifier Groups') from s.action;
        }
        then {
            r.add('ASK_QUESTION', {
                question: 'Enter Name & Items',
                tag: 'New Modifier Group',
                parameters: {
                    'Name': '',
                    'Items': {
                        values: [],
                        lines: 7
                    }
                }
            });
        }
    }
    
    rule SetName {
        when {
            r: Result;
            s: State;
            a: Action(a.type == 'ASK_QUESTION' && a.data.tag == 'New Modifier Group') from s.action;
        }
        then {
            r.add('SET_CARD_TAG', {
                name: 'Name',
                value: s.getValue('Name')
            });
            const items = s.getValues('Items').split(/\\n/);
            for (const item of items) {
                r.add('CREATE_CARD', {
                    type: 'Modifier'
                });
                r.add('SET_CARD_TAG', {
                    name: 'Name',
                    value: item
                });
                r.resetParent(s.root.id);
            }
        }
    }`
};

export default new RuleRecord(data);