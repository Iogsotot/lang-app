import { fetchWords, setPage, showButtons, showTranslate } from "./words";
import { WordListActionTypes } from '../../models/word';
import { wordListReducer, initialState } from "../reducers/words";
import configureMockStore from 'redux-mock-store'
import thunk from "redux-thunk";
import * as actions from '../action-creators/words'
require('jest-fetch-mock').enableMocks();

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

  describe('testing api', () => {
    
    beforeEach(() => {
      fetch.resetMocks()
    })
   
    it('creates NEWS_GET_SUCCESS when fetching words has been done', () => {
      fetchMock.fetchWords('/words', {
         body: { todos: ['do something'] },
         headers: { 'content-type': 'application/json' } 
        })
        const expectedActions = [
          { type: WordListActionTypes.FETCH_WORD_LIST_ERROR },
          { type: WordListActionTypes.FETCH_WORD_LIST_SUCCESS, body: { todos: ['do something'] } }
        ]
        const store = mockStore({ todos: [] })
    
        return store.dispatch(actions.fetchTodos()).then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions)
        })
      // fetch.mockResponseOnce(JSON.stringify({ data: 'ball' }));

      // await fetchWords('1','2').then(res => {
      //       expect(res.data).toEqual('ball')
      // })

      // expect(fetch.mock.calls[0][0]).toEqual(`https://rslang-2020q3.herokuapp.com/words`, {
      //   headers: { 'content-type': 'application/json' }, 
      //   body: { data: [1, 2, 3], status: 'ok' }, 
      // });
    })
  })

  describe('testing showTranslate', () => {

    it('showTranslate test', () => {
      const expectedAction = {
      type: WordListActionTypes.SHOW_WORD_TRANSLATE,
      payload: { 
        show: true,
      },
    }
      const actual = showTranslate({ show: true});
      expect(actual).toEqual(expectedAction);
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
      const actual = setPage({ number: '1'});
      expect(actual).toEqual(expectedAction);
    })
  })

  describe('testing showButtons', () => {

    it('showButtons test', () => {
      const expectedAction = {
      type: WordListActionTypes.SHOW_WORD_BUTTONS,
      payload: { 
        show: 'true',
      },
    }
      const actual = showButtons();
      expect(actual).toEqual(expectedAction);
    })
  })
  
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