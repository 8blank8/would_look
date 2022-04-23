import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   setFilmView,
   setFilterSort,
   setActiveFilterSort,
   setActiveFilterCategory
} from '../redux/actions/filters';

import { useHttp } from '../hooks/useHttp';

const Filters = () => {

   const dispatch = useDispatch();
   const request = useHttp();

   const filterFilms = useSelector(({ filmReducer }) => filmReducer.filterFilms);
   const filterView = useSelector(state => state.filmReducer.view);
   const activeFilterSort = useSelector(({ filmReducer }) => filmReducer.activeFilterSort);
   const activeFilterCategory = useSelector(({ filmReducer }) => filmReducer.activeFilterCategory);

   const [sortArr, setSortArr] = useState([
      { label: "увеличению рейтинга", name: "uprating" },
      { label: "убавлению рейтинга", name: "downrating" },
      { label: "увеличению оценки", name: "upgrade" },
      { label: "убавлению оценки", name: "downgrade" }
   ]);

   const [categoryArr, setCategoryArr] = useState([
      { "id": 0, "label": "Сериал", "name": "series" },
      { "id": 1, "label": "Фильм", "name": "movie" },
      { "id": 2, "label": "Мультсериал", "name": "animated-series" },
      { "id": 3, "label": "Мультфильм", "name": "cartoon" },
      { "id": 4, "label": "Аниме", "name": "anime" }
   ]);

   const [activeSort, setActiveSort] = useState(sortArr[1].label);
   const [activeCategory, setActiveCategory] = useState(categoryArr[1].label);
   // const [activeGenre, setActiveGenre] = useState('');

   const [sortTab, setSortTab] = useState(false);
   const [categoryTab, setCategoryTab] = useState(false);
   const [genreTab, setGenreTab] = useState(false);


   const addSortItem = (arr, className, set, setFilter) => {
      const newLi = arr.map(({ label, id, name }) => {
         return (
            <li
               key={id}
               className={`${className}-item filters__item`}
               onClick={() => {
                  dispatch(setFilter(name))
                  dispatch(setFilterSort(activeFilterSort, activeFilterCategory, request, filterView));
                  set(label);
               }}
            >
               <span>{label}</span>
            </li>
         )
      })

      return (
         <ul className={`${className}-list filters__list`}>
            {newLi}
         </ul>
      )
   }

   const visibleSort = addSortItem(sortArr, 'filters__sort', setActiveSort, setActiveFilterSort);
   const visibleCategory = addSortItem(categoryArr, 'filters__category', setActiveCategory, setActiveFilterCategory);
   // const visibleGenreOfficial = addSortItem(filterGenre, 'filters__genre', setActiveFilterGenre, setActiveGenre);
   return (
      <>
         <div className="tabs">
            <div
               className={`tabs__tab ${filterView === 'view' ? 'tab__active' : null}`}
               onClick={() => {
                  dispatch(setFilmView('view'));
               }}>
               Просмотрено
            </div>
            <div
               className={`tabs__tab ${filterView === 'look' ? 'tab__active' : null}`}
               onClick={() => {
                  dispatch(setFilmView('look'));
               }}>
               Посмотреть
            </div>
         </div>
         <div className="filters">
            <div className="filters__sort">
               <p>
                  Сортировать по
                  <span onClick={() => setSortTab(!sortTab)}>
                     {activeSort}
                  </span>
               </p>
               {sortTab ? visibleSort : null}
            </div>
            <div className="filters__category">
               <p>
                  Категория
                  <span onClick={() => setCategoryTab(!categoryTab)}>
                     {activeCategory}
                  </span>
               </p>
               {categoryTab ? visibleCategory : null}
            </div>
            <div className="filters__genre">
               <p>
                  Жанр
                  <span onClick={() => setGenreTab(!genreTab)}>
                     {/* {activeGenre} */}
                  </span>
               </p>
               {genreTab ? <div className="filters__block">
                  <div className='filters__genre-list filters__list'>
                     {/* {visibleGenreOfficial} */}
                  </div>
               </div> : null}
            </div>
         </div>
      </>
   )
}

export default Filters;