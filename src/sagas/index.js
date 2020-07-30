import { all } from 'redux-saga/effects'
import { ProgressState } from './statesagas';
import { ProgressCall } from './callsagas';
import { InitData } from './initdata';


export default function* rootSaga() {
    yield all([
        ...ProgressState(),
        ...ProgressCall(),
        ...InitData()
      ])
}
