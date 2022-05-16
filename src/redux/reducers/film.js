
const initialState = {
   films: [],
   filterFilms: [],
   apiFilm: {},
   view: 'view',
   activeFilterSort: { name: 'downrating', label: 'убавлению рейтинга' },
   activeFilterCategory: { name: 'all', label: 'Все' },
   activeFilterGenre: { name: 'all', label: 'Все' },
   activeGenre: { name: 'comedy', label: 'Комедия' },
   genreArr: [],
   categoryArr: [],
}

const filmReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'SET_FILMS':
         return {
            ...state,
            films: action.payload
         }
      case 'ADD_FILM':
         return {
            ...state,
            films: [...state.films, action.payload]
         }
      case 'SET_FILTER_FILMS':
         return {
            ...state,
            filterFilms: action.payload
         }
      case 'SET_FILM_VIEW':
         return {
            ...state,
            view: action.payload
         }
      case 'SET_ACTIVE_FILTER_SORT':
         return {
            ...state,
            activeFilterSort: action.payload
         }
      case 'SET_ACTIVE_FILTER_CATEGORY':
         return {
            ...state,
            activeFilterCategory: action.payload
         }
      case 'SET_ACTIVE_FILTER_GENRE':
         return {
            ...state,
            activeFilterGenre: action.payload
         }
      case 'DELETED_FILM':
         return {
            ...state,
            films: state.films.filter(item => item.id !== action.payload)
         }
      case 'SET_ACTIVE_GENRE':
         return {
            ...state,
            activeGenre: action.payload
         }
      case 'SET_GENRE_ARR':
         return {
            ...state,
            genreArr: action.payload
         }
      case 'SET_CATEGORY_ARR':
         return {
            ...state,
            categoryArr: action.payload
         }
      case 'SET_APIFILM':
         return {
            ...state,
            apiFilm: action.payload
         }
      default: return state;
   }
}

export default filmReducer;