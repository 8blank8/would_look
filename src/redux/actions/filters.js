
export const setFilmView = (view) => {
   return {
      type: 'SET_FILM_VIEW',
      payload: view
   }
}
export const setFilms = (films) => {
   return {
      type: 'SET_FILMS',
      payload: films
   }
}

export const setFilterSort = (filterSort, filterCategory, request, view) => (dispatch) => {

   request('http://localhost:3001/films-view')
      .then(data => {
         dispatch(setFilms(data));
         let films = data.filter(item => item.view === view);
         switch (filterSort) {
            case 'downrating':
               films.sort((a, b) => (+a.rating > +b.rating) ? -1 : 1);
               break;
            case 'uprating':
               dispatch(setFilterFilms(JSON.parse(JSON.stringify(films)).sort((a, b) => (+a.rating < +b.rating) ? -1 : 1)));
               break;
            case 'upgrade':
               dispatch(setFilterFilms(JSON.parse(JSON.stringify(films)).sort((a, b) => (+a.grade < +b.grade) ? -1 : 1)));
               break;
            case 'downgrade':
               dispatch(setFilterFilms(JSON.parse(JSON.stringify(films)).sort((a, b) => (+a.grade > +b.grade) ? -1 : 1)));
               break;
            default: return films;
         }

         films = films.filter(item => item.category === filterCategory);

         console.log(filterSort, filterCategory)

         dispatch(setFilterFilms(films));
      });


}

const setFilterFilms = (films) => {
   return {
      type: 'SET_FILTER_FILMS',
      payload: films
   }
}

export const setActiveFilterSort = (filter) => {
   return {
      type: 'SET_ACTIVE_FILTER_SORT',
      payload: filter
   }
}

export const setActiveFilterCategory = (filter) => {
   return {
      type: 'SET_ACTIVE_FILTER_CATEGORY',
      payload: filter
   }
}

export const setActiveFilterGenre = (filter) => {
   return {
      type: 'SET_ACTIVE_FILTER_GENRE',
      payload: filter
   }
}