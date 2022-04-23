import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   setFilmView,
   setFilterSort,
   setActiveFilterSort,
   setActiveFilterCategory,
   setActiveFilterGenre
} from '../redux/actions/filters';

import { useHttp } from '../hooks/useHttp';

const Filters = () => {

   const dispatch = useDispatch();
   const request = useHttp();

   const filterView = useSelector(state => state.filmReducer.view);
   const activeFilterSort = useSelector(({ filmReducer }) => filmReducer.activeFilterSort);
   const activeFilterCategory = useSelector(({ filmReducer }) => filmReducer.activeFilterCategory);
   const activeFilterGenre = useSelector(({ filmReducer }) => filmReducer.activeFilterGenre);

   const [sortArr, setSortArr] = useState([
      { label: "увеличению рейтинга", name: "uprating" },
      { label: "убавлению рейтинга", name: "downrating" },
      { label: "увеличению оценки", name: "upgrade" },
      { label: "убавлению оценки", name: "downgrade" }
   ]);

   const [categoryArr, setCategoryArr] = useState([
      { "id": 5, "label": "Все", "name": "all" },
      { "id": 0, "label": "Сериал", "name": "series" },
      { "id": 1, "label": "Фильм", "name": "movie" },
      { "id": 2, "label": "Мультсериал", "name": "animated-series" },
      { "id": 3, "label": "Мультфильм", "name": "cartoon" },
      { "id": 4, "label": "Аниме", "name": "anime" }
   ]);

   const [genreArr, setGenreArr] = useState([
      { "id": 8, "label": "Все", "name": "all" },
      { "id": 0, "label": "Комедия", "name": "comedy" },
      { "id": 1, "label": "Ужасы", "name": "horror" },
      { "id": 2, "label": "Фантастика", "name": "fantastic" },
      { "id": 3, "label": "Семейный", "name": "family" },
      { "id": 4, "label": "Фентези", "name": "fantasy" },
      { "id": 5, "label": "Приключения", "name": "adventures" },
      { "id": 6, "label": "Триллер", "name": "triller" },
      { "id": 7, "label": "Драма", "name": "drama" }
   ]);

   const [activeSort, setActiveSort] = useState(sortArr[1].label);
   const [activeCategory, setActiveCategory] = useState(categoryArr[0].label);
   const [activeGenre, setActiveGenre] = useState(genreArr[0].label);

   const [sortTab, setSortTab] = useState(false);
   const [categoryTab, setCategoryTab] = useState(false);
   const [genreTab, setGenreTab] = useState(false);

   const addSortItem = () => {
      return sortArr.map(({ id, label, name }) => {
         return (
            <li
               key={id}
               className={'filters__sort-item filters__item'}
               onClick={() => {
                  dispatch(setActiveFilterSort(name));
                  dispatch(setFilterSort(name, activeFilterCategory, activeFilterGenre, request, filterView));
                  setActiveSort(label);
               }}
            >
               <span>{label}</span>
            </li >
         )
      });
   }

   const addCategoryItem = () => {
      return categoryArr.map(({ id, name, label }) => {
         return (
            <li
               key={id}
               className={'filters__category-item filters__item'}
               onClick={() => {
                  dispatch(setActiveFilterCategory(name));
                  dispatch(setFilterSort(activeFilterSort, name, activeFilterGenre, request, filterView));
                  setActiveCategory(label);
               }}
            >
               <span>{label}</span>
            </li >
         )
      });
   }

   const addGenreItem = () => {
      return genreArr.map(({ id, name, label }) => {
         return (
            <li
               key={id}
               className={'filters__genre-item filters__item'}
               onClick={() => {
                  dispatch(setActiveFilterGenre(name));
                  dispatch(setFilterSort(activeFilterSort, activeFilterCategory, name, request, filterView));
                  setActiveGenre(label);
               }}
            >
               <span>{label}</span>
            </li >
         )
      });
   }

   const sortItemArr = addSortItem();
   const categoryItemArr = addCategoryItem();
   const genreItemArr = addGenreItem();

   // const addSortItem = (arr, className, set, setFilter) => {
   //    const newLi = arr.map(({ label, id, name }) => {
   //       return (
   //          <li
   //             key={id}
   //             className={`${className}-item filters__item`}
   //             onClick={() => {
   //                dispatch(setFilter(name))
   //                dispatch(setFilterSort(activeFilterSort, activeFilterCategory, request, filterView));
   //                set(label);
   //             }}
   //          >
   //             <span>{label}</span>
   //          </li>
   //       )
   //    })

   //    return (
   //       <ul className={`${className}-list filters__list`}>
   //          {newLi}
   //       </ul>
   //    )
   // }

   // const visibleSort = addSortItem(sortArr, 'filters__sort', setActiveSort, setActiveFilterSort);
   // const visibleCategory = addSortItem(categoryArr, 'filters__category', setActiveCategory, setActiveFilterCategory);
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
               <ul className='filters__sort-list filters__list'>
                  {sortTab ? sortItemArr : null}
               </ul>
            </div>
            <div className="filters__category">
               <p>
                  Категория
                  <span onClick={() => setCategoryTab(!categoryTab)}>
                     {activeCategory}
                  </span>
               </p>
               <ul className='filters__category-list filters__list'>
                  {categoryTab ? categoryItemArr : null}
               </ul>
            </div>
            <div className="filters__genre">
               <p>
                  Жанр
                  <span onClick={() => setGenreTab(!genreTab)}>
                     {activeGenre}
                  </span>
               </p>
               <ul className='filters__genre-list filters__list'>
                  {genreTab ? genreItemArr : null}
               </ul>
            </div>
         </div>
      </>
   )
}

export default Filters;