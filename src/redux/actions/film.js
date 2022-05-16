

export const deletedFilm = (id) => {
   return {
      type: 'DELETED_FILM',
      payload: id
   }
}

export const setApiFilm = (film) => {
   return {
      type: 'SET_APIFILM',
      payload: film
   }
}

export const addFilm = (film) => {
   return {
      type: 'ADD_FILM',
      payload: film
   }
}
