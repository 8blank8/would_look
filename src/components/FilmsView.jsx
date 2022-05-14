import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterSort } from '../redux/actions/filters';

import { Film } from './index';

const FilmsView = () => {

   const films = useSelector(({ filmReducer }) => filmReducer.films);
   const filterFilms = useSelector(state => state.filmReducer.filterFilms);
   const activeFilterSort = useSelector(({ filmReducer }) => filmReducer.activeFilterSort);
   const activeFilterCategory = useSelector(({ filmReducer }) => filmReducer.activeFilterCategory);
   const activeFilterGenre = useSelector(({ filmReducer }) => filmReducer.activeFilterGenre);
   const view = useSelector(({ filmReducer }) => filmReducer.view);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setFilterSort(activeFilterSort.name, activeFilterCategory.name, activeFilterGenre.name, view, films));
   }, [])

   const setVisibleContent = (arr) => {
      return arr.map(({ ...film }) => {
         return <Film key={film.id} film={film} />
      });
   }

   return (
      <>
         {filterFilms.length !== 0 ? setVisibleContent(filterFilms) : <div style={{ 'paddingTop': '20px' }}>Вы пока ничего такого не добавили</div>}
      </>
   )

}

export default FilmsView;