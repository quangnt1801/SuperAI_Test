import { AUTHENTICATION_STATE } from './type';
import { watchUpdateAuthentication } from './ConfigurationSaga';

export interface ROOT_STATE {
    authentication: AUTHENTICATION_STATE
}

export default function* rootSaga() {
    yield [
        watchUpdateAuthentication,
    ]
}