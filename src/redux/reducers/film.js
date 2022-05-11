
const initialState = {
   films: [],
   filterFilms: [],
   filmPageItem: [],
   view: 'view',
   activeFilterSort: { name: 'downrating', label: 'убавлению рейтинга' },
   activeFilterCategory: { name: 'all', label: 'Все' },
   activeFilterGenre: { name: 'all', label: 'Все' },
   activeGenre: { name: 'comedy', label: 'Комедия' }
}

const filmReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'SET_FILMS':
         return {
            ...state,
            films: action.payload
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
      case 'SET_FILMPAGE_ITEM':
         return {
            ...state,
            filmPageItem: action.payload
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
      default: return state;
   }
}

export default filmReducer;