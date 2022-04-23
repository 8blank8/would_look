import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilmView, setFilterSort, setActiveFilterSort, setActiveFilterCategory, setActiveFilterGenre } from '../redux/actions/filters';

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

   const [categoryArr, setCategoryArr] = useState([{ "id": 5, "label": "Все", "name": "all" }]);
   const [genreArr, setGenreArr] = useState([{ "id": 8, "label": "Все", "name": "all" }]);

   useEffect(() => {
      request('http://localhost:3001/categoties')
         .then(data => setCategoryArr([...categoryArr, ...data]));
      request('http://localhost:3001/genres')
         .then(data => setGenreArr([...genreArr, ...data]));
   }, []);

   const [activeSort, setActiveSort] = useState(sortArr[1].label);

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
                  dispatch(setFilterSort(name, activeFilterCategory.name, activeFilterGenre.name, request, filterView));
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
                  dispatch(setActiveFilterCategory({ name, label }));
                  dispatch(setFilterSort(activeFilterSort, name, activeFilterGenre.name, request, filterView));
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
                  dispatch(setActiveFilterGenre({ name, label }));
                  dispatch(setFilterSort(activeFilterSort, activeFilterCategory.name, name, request, filterView));
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
                     {activeFilterCategory.label}
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
                     {activeFilterGenre.label}
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