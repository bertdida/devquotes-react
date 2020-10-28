import * as quotes from './quotes';
import * as likes from './likes';
import * as auth from './auth';
import * as quoteStatuses from './quote-statuses';

export default { ...quotes, ...likes, ...auth, ...quoteStatuses };
