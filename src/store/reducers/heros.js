import {
  SET_HERO,
  ADD_HERO,
  DELETE_HERO,
  LOGGED_IN,
  SEARCH_HEROES,
} from "../actions/hero";

const initialState = {
  searchHeroes: [],
  homeHeroes: [],
  goodHeros: 0,
  badHeros: 0,
  isLogged: false,
  response: [],
};

export default function heros(state = initialState, action) {
  switch (action.type) {
    case SET_HERO:
      return {
        ...state,
        searchHeroes: state.searchHeroes.concat(action.payload),
      };
    case ADD_HERO:
      let returnState;

      if (action.alignment === "good") {
        returnState = {
          ...state,
          searchHeroes: state.searchHeroes.filter(
            (hero) => hero.id !== action.payload.id
          ),
          homeHeroes: state.homeHeroes.concat(action.payload).sort((a, b) => {
            return a.powerStatsTotal > b.powerStatsTotal ? -1 : 1;
          }),
          goodHeros: state.goodHeros + 1,
        };
      } else {
        returnState = {
          ...state,
          searchHeroes: state.searchHeroes.filter(
            (hero) => hero.id !== action.payload.id
          ),
          homeHeroes: state.homeHeroes.concat(action.payload).sort((a, b) => {
            return a.powerStatsTotal > b.powerStatsTotal ? -1 : 1;
          }),
          badHeros: state.badHeros + 1,
        };
      }
      return returnState;

    case DELETE_HERO:
      let returnResultState;

      if (action.alignment === "good") {
        returnResultState = {
          ...state,
          homeHeroes: state.homeHeroes.filter(
            (hero) => hero.id !== action.payload.id
          ),
          searchHeroes: state.searchHeroes.concat(action.payload),
          goodHeros: state.goodHeros - 1,
        };
      } else {
        returnResultState = {
          ...state,
          homeHeroes: state.homeHeroes.filter(
            (hero) => hero.id !== action.payload.id
          ),
          searchHeroes: state.searchHeroes.concat(action.payload),
          badHeros: state.badHeros - 1,
        };
      }
      return returnResultState;

    case LOGGED_IN:
      return {
        ...state,
        isLogged: action.payload,
      };
    case SEARCH_HEROES:
      return {
        ...state,
        searchHeroes: action.payload,
      };

    default:
      return state;
  }
}
