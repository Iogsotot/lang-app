import { call, put, takeEvery, takeLatest, select, delay } from 'redux-saga/effects';
import { API_BASE_URL } from '../constants';
import { FetchWordListAction, Word, WordListActionTypes } from '../models';

function getJson(uri: string) {
  return fetch(uri, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(data => data.json());
}

function* fetchWordsSaga(action: FetchWordListAction) {
  const { group, page } = yield select(store => store.wordList);
  const { sort } = action.payload;
  const fetchWordsUrl = `${API_BASE_URL}/words?sort=${sort}&group=${group - 1}&page=${page - 1}`;

  try {
    const response: Word[] = yield call(getJson, fetchWordsUrl);
    yield put({ type: WordListActionTypes.FETCH_WORD_LIST_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: WordListActionTypes.FETCH_WORDS_API_ERROR, payload: error });
  }
}

function* invalidateSessionSaga() {
  yield delay(3600 * 1000);
  yield put({ type: 'INVALIDATE_SESSION' });
}

function* rootSaga() {
  yield takeEvery('*', console.log);
  yield takeLatest('FETCH_WORDS_API', fetchWordsSaga);
  yield takeLatest('*', invalidateSessionSaga);
}

export default rootSaga;
