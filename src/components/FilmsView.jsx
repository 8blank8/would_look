import { useHttp } from '../hooks/useHttp';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterSort, setFilms } from '../redux/actions/filters';

import { Film } from './index';

const FilmsView = () => {
   const request = useHttp();

   const filterFilms = useSelector(state => state.filmReducer.filterFilms);
   const activeFilterSort = useSelector(({ filmReducer }) => filmReducer.activeFilterSort);
   const activeFilterCategory = useSelector(({ filmReducer }) => filmReducer.activeFilterCategory);
   const activeFilterGenre = useSelector(({ filmReducer }) => filmReducer.activeFilterGenre);
   const view = useSelector(({ filmReducer }) => filmReducer.view);
   const dispatch = useDispatch();

   useEffect(() => {
      request('http://localhost:3001/films-view')
         .then(data => {
            dispatch(setFilms(data));
            dispatch(setFilterSort(activeFilterSort, activeFilterCategory.name, activeFilterGenre.name, view, data));
         });
   }, [])

   const setVisibleContent = (arr) => {
      return arr.map(({ id, posterUrl, title, grade }) => {
         return <Film key={id} id={id} posterUrl={posterUrl} title={title} grade={grade} />
      });
   }

   return (
      <>
         {setVisibleContent(filterFilms)}
      </>
   )

}

export default FilmsView;