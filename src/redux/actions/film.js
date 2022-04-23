
export const setFilmPageItem = (id) => {
   return {
      type: 'SET_FILMPAGE_ITEM',
      payload: id
   }
}

export const deletedFilm = (id) => {
   return {
      type: 'DELETED_FILM',
      payload: id
   }
}
