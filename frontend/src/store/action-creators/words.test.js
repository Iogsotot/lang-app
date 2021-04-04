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

  describe('testing FETCH_WORD_LIST', () => {
    it('FETCH_WORD_LIST test', ()=>{
      const action = {
        type: WordListActionTypes.FETCH_WORD_LIST,
      }

      expect(wordListReducer(initialState, action)).toEqual({
        ...initialState,
        loading: true,
      })
    })
  })
  describe('testing setPage', () => {

    it('setPage test', () => {
      const expectedAction = {
      type: WordListActionTypes.GET_WORD_LIST_PAGE,
      payload: { 
        number: '1',
      },
    }
      const store = mockStore({ payload: {} })
      expect(store.dispatch(actions.setPage('1'))).toEqual(expectedAction);
    })
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
      { type: WordListActionTypes.FETCH_WORD_LIST_SUCCESS,  payload: {}}
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
      { type: WordListActionTypes.FETCH_WORD_LIST_SUCCESS,  payload: {}}
    ]
    const store = mockStore({ payload: {} })

    return store.dispatch(actions.fetchRandomWords('0', '0')).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions);
    })
  })
})


describe("words reducer", () => {
  it("should return the initial state", () => {
    expect(wordListReducer(undefined, {})).toEqual({
      displayButtons: true, error: null,
         group: 0,
         loading: false,
         page: 0,
         translate: true,
         words: [],
    });
  })});


  describe("test functions", () => {
    const create = () => {
      const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn()
      }
      const next = jest.fn()
    
      const invoke = action => thunk(store)(next)(action)
    
      return { store, next, invoke }
    }
    it('passes through non-function action', () => {
      const { next, invoke } = create()
      const action = { type: 'TEST' }
      invoke(action)
      expect(next).toHaveBeenCalledWith(action)
    })
    
    it('calls the function', () => {
      const { invoke } = create()
      const fn = jest.fn()
      invoke(fn)
      expect(fn).toHaveBeenCalled()
    })
    
    it('passes dispatch and getState', () => {
      const { store, invoke } = create()
      invoke((dispatch, getState) => {
        dispatch('TEST DISPATCH')
        getState()
      })
      expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH')
      expect(store.getState).toHaveBeenCalled()
    })
  });

  