
export const setFilmPageItem = (film) => {
   return {
      type: 'SET_FILMPAGE_ITEM',
      payload: film
   }
}

export const deletedFilm = (id) => {
   return {
      type: 'DELETED_FILM',
      payload: id
   }
}

// export const setActiveFilmPageId = (id) => {
//    return {
//       type: 'SET_ACTIVE_FILMPAGE_ID',
//       payload: id
//    }
// }