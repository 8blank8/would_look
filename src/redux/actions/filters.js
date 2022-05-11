
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

export const setFilterSort = (filterSort, filterCategory, filterGenre, view, data) => (dispatch) => {

   let films = data.filter(item => item.view === view);

   films = data.filter(item => item.view === view);
   switch (filterSort) {
      case 'downrating':
         films.sort((a, b) => (+a.rating > +b.rating) ? -1 : 1);
         break;
      case 'uprating':
         films.sort((a, b) => (+a.rating < +b.rating) ? -1 : 1);
         break;
      case 'upgrade':
         films.sort((a, b) => (+a.grade < +b.grade) ? -1 : 1);
         break;
      case 'downgrade':
         films.sort((a, b) => (+a.grade > +b.grade) ? -1 : 1);
         break;
      default: return films;
   }

   films = films.filter(item => {
      if (item.category === filterCategory) {
         return item;
      } else if (filterCategory === 'all') {
         return item;
      }
   });

   films = films.filter(item => {
      if (item.genreUser.name === filterGenre) {
         return item;
      } else if (filterGenre === 'all') {
         return item;
      }
   })

   dispatch(setFilterFilms(films));

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

export const setActiveGenre = (genre) => {
   return {
      type: 'SET_ACTIVE_GENRE',
      payload: genre
   }
}

export const setGenreArr = (arr) => {
   return {
      type: 'SET_GENRE_ARR',
      payload: arr
   }
}

export const setCategoryArr = (arr) => {
   return {
      type: 'SET_CATEGORY_ARR',
      payload: arr
   }
}