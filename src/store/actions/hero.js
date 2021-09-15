export const SET_HERO = "SET_HERO";
export const ADD_HERO = "ADD_HERO";
export const DELETE_HERO = "DELETE_HERO";
export const LOGGED_IN = "LOGGED_IN";
export const SEARCH_HEROES = "SEARCH_HEROES";

export function setHeros(data) {
  return {
    type: SET_HERO,
    payload: data,
  };
}

export function addHeros(selectedHeroe, alignmentHeros) {
  return {
    type: ADD_HERO,
    payload: selectedHeroe,
    alignment: alignmentHeros,
  };
}

export function deleteHeros(selectedHeroe, alignmentHeros) {
  return {
    type: DELETE_HERO,
    payload: selectedHeroe,
    alignment: alignmentHeros,
  };
}

export function loggedIn(isLogged) {
  return {
    type: LOGGED_IN,
    payload: isLogged,
  };
}

export function searchHeroes(response) {
  return {
    type: SEARCH_HEROES,
    payload: response,
  };
}
