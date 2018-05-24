import { Map as IMap } from 'immutable';
import { CardTypeRecord } from '../../models';

export default (): IMap<string, CardTypeRecord> => {
    let cardTypes: IMap<string, CardTypeRecord> = IMap<string, CardTypeRecord>();
    [
        'customers',
        'locations',
        'orders',
        'products',
        'tables',
        'tickets'
    ].map(r => require('./' + r).default).forEach(ct => cardTypes = cardTypes.set(ct.id, ct));
    return cardTypes;
};