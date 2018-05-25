import { RuleRecord } from '../../models';
import * as shortid from 'shortid';

const data = {
    id: shortid.generate(),
    name: 'Payment Rules',
    content: `rule AskPayment {
        when {
            r: Result;
            s: State;
            a: Action a.type == 'EXECUTE_COMMAND' from s.action;
            a: Action a.data.name == 'Add Payment' from s.action;
        }
        then {
            r.add('ASK_QUESTION',{
              question:'Enter Payment',
              tag:'MyPayment',
              parameters: {
                'type': [
                    'Cash',
                    'Credit Card',
                    'Voucher'
                  ],
                'amount': Number(s.card.balance)
              }
            });
        }
    }
    
    rule SetPayment {
        when {
            r: Result;
            s: State;
            a: Action a.type == 'ASK_QUESTION' from s.action;
            a: Action a.data.tag == 'MyPayment' from s.action;
            s: State s.state.get('amount') > 0 && s.state.get('type') !== undefined;
        }
        then {
            r.add('CREATE_CARD',{type:'Payment'});
            r.add('SET_CARD_TAG',{
              'value': s.state.get('type'),
              'amount': s.state.get('amount'),
              'target': 'Wallet.' + s.state.get('type')
            });
        }
    }`
};

export default new RuleRecord(data);