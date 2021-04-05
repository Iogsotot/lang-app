import { WordListActionTypes } from '../../models/word';
import { wordListReducer, initialState } from "../reducers/words";
import configureMockStore from 'redux-mock-store'
import thunk from "redux-thunk";
import fetchMock from 'fetch-mock';
import * as actions from '../action-creators/words';
import expect from 'expect';

fetchMock.config.fallbackToNetwork = true;
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('testing thunk functions', () => {

  it('setPage test', () => {

    const expectedAction = [{
      type: WordListActionTypes.GET_WORD_LIST_PAGE,
      payload: '1',
    }]
    const store = mockStore({ initialState })
    store.dispatch(actions.setPage('1'));
    expect(store.getActions()).toEqual(expectedAction)
  });
  it('setGroup test', () => {

    const expectedAction = [{
      type: WordListActionTypes.GET_WORD_LIST_GROUP,
      payload: '2',
    }]
    const store = mockStore({ initialState })
    store.dispatch(actions.setGroup('2'));
    expect(store.getActions()).toEqual(expectedAction)
  });
  it('showTranslate test', () => {

    const expectedAction = [{
      type: WordListActionTypes.SHOW_WORD_TRANSLATE,
      payload: 'true',
    }]
    const store = mockStore({ initialState })
    store.dispatch(actions.showTranslate('true'));
    expect(store.getActions()).toEqual(expectedAction)
  });
  it('showButtons test', () => {

    const expectedAction = [{
      type: WordListActionTypes.SHOW_WORD_BUTTONS,
      payload: 'true',
    }]
    const store = mockStore({ initialState })
    store.dispatch(actions.showButtons('true'));
    expect(store.getActions()).toEqual(expectedAction)
  });
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_WORDS_SUCCESS when fetching words has been done', () => {
    fetchMock.getOnce(`/words`, {
      payload: {},
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: WordListActionTypes.FETCH_WORD_LIST },
      { type: WordListActionTypes.FETCH_WORD_LIST_SUCCESS, payload: {} }
    ]
    const store = mockStore({ payload: {} })

    return store.dispatch(actions.fetchWords('0', '0')).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions);
    })
  })
  it('creates FETCH_WORDS_SUCCESS when fetching words has been done', () => {
    fetchMock.getOnce(`/words/all`, {
      payload: {},
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: WordListActionTypes.FETCH_WORD_LIST },
      { type: WordListActionTypes.FETCH_WORD_LIST_SUCCESS, payload: {} }
    ]
    const store = mockStore({ payload: {} })

    return store.dispatch(actions.fetchRandomWords('0', '0')).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions);
    })
  })
});

describe(">>>R E D U C E R --- Test wordListReducer", () => {
  it("should return the initial state", () => {
    expect(wordListReducer(undefined, {})).toEqual({
      displayButtons: true, error: null,
      group: 0,
      loading: false,
      page: 0,
      translate: true,
      words: [],
    });
  })
});
it('+++ reducer for GET_WORD_LIST_PAGE', () => {
  let state = { payload: 1 }
  state = wordListReducer(state, { type: "GET_WORD_LIST_PAGE", payload: 1 })
  expect(state).toMatchObject({ payload: 1 })
});
it('+++ reducer for GET_WORD_LIST_GROUP', () => {
  let state = { payload: 2 }
  state = wordListReducer(state, { type: "GET_WORD_LIST_GROUP", payload: 2 })
  expect(state).toMatchObject({ payload: 2 })
});