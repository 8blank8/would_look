
const initialState = {
   films: [],
   filterFilms: [],
   filmPageItem: [],
   view: 'view',
   activeFilterSort: 'downrating',
   activeFilterCategory: 'movie',
   activeFilterGenre: []
}

const filmReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'SET_FILMS':
         return {
            ...state,
            films: action.payload,
            filterFilms: action.payload.filter(item => item.view === state.view)
         }
      case 'SET_FILTER_FILMS':
         return {
            ...state,
            filterFilms: action.payload
         }
      case 'SET_FILM_VIEW':
         return {
            ...state,
            view: action.payload,
            filterFilms: state.films.filter(item => item.view === action.payload)
         }
      case 'SET_FILMPAGE_ITEM':
         return {
            ...state,
            filmPageItem: state.filterFilms.filter(item => item.id === action.payload)
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

      default: return state;
   }
}

export default filmReducer;