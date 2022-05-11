import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilmView, setFilterSort, setActiveFilterSort, setActiveFilterCategory, setActiveFilterGenre } from '../redux/actions/filters';
import { v4 as uuidv4 } from 'uuid';

const Filters = () => {

   const dispatch = useDispatch();

   const films = useSelector(({ filmReducer }) => filmReducer.films);
   const filterView = useSelector(state => state.filmReducer.view);
   const activeFilterSort = useSelector(({ filmReducer }) => filmReducer.activeFilterSort);
   const activeFilterCategory = useSelector(({ filmReducer }) => filmReducer.activeFilterCategory);
   const activeFilterGenre = useSelector(({ filmReducer }) => filmReducer.activeFilterGenre);
   const genreArr = useSelector(({ filmReducer }) => filmReducer.genreArr);
   const categoryArr = useSelector(({ filmReducer }) => filmReducer.categoryArr);

   const [sortArr, setSortArr] = useState([
      { label: "увеличению рейтинга", name: "uprating" },
      { label: "убавлению рейтинга", name: "downrating" },
      { label: "увеличению оценки", name: "upgrade" },
      { label: "убавлению оценки", name: "downgrade" }
   ]);


   useEffect(() => {
      document.body.addEventListener('click', onCloseFilterItem);
   }, []);


   const [sortTab, setSortTab] = useState(false);
   const [categoryTab, setCategoryTab] = useState(false);
   const [genreTab, setGenreTab] = useState(false);

   const addSortItem = () => {
      return sortArr.map(({ label, name }) => {
         return (
            <FilterItem
               activeFilterSort={name}
               activeFilterCategory={activeFilterCategory.name}
               activeFilterGenre={activeFilterGenre.name}
               setActiveFilter={setActiveFilterSort}
               name={name}
               label={label}
               setTab={setSortTab}
               filterView={filterView}
               films={films} />
         )
      });
   }

   const addCategoryItem = () => {
      return categoryArr.map(({ name, label }) => {
         return (
            <FilterItem
               activeFilterSort={activeFilterSort.name}
               activeFilterCategory={name}
               activeFilterGenre={activeFilterGenre.name}
               setActiveFilter={setActiveFilterCategory}
               name={name}
               label={label}
               setTab={setCategoryTab}
               filterView={filterView}
               films={films} />
         )
      });
   }

   const addGenreItem = () => {
      return genreArr.map(({ name, label }) => {
         return (
            <FilterItem
               activeFilterSort={activeFilterSort.name}
               activeFilterCategory={activeFilterCategory.name}
               activeFilterGenre={name}
               setActiveFilter={setActiveFilterGenre}
               name={name}
               label={label}
               setTab={setGenreTab}
               filterView={filterView}
               films={films} />
         )
      });
   }

   const refSort = useRef();
   const refCategory = useRef();
   const refGenre = useRef();

   const onCloseFilterItem = (e) => {
      if (!e.path.includes(refSort.current)) {
         setSortTab(false);
      }
      if (!e.path.includes(refCategory.current)) {
         setCategoryTab(false);
      }
      if (!e.path.includes(refGenre.current)) {
         setGenreTab(false);
      }
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
                  dispatch(setFilterSort(activeFilterSort.name, activeFilterCategory.name, activeFilterGenre.name, 'view', films));
               }}>
               Просмотрено
            </div>
            <div
               className={`tabs__tab ${filterView === 'look' ? 'tab__active' : null}`}
               onClick={() => {
                  dispatch(setFilmView('look'));
                  dispatch(setFilterSort(activeFilterSort.name, activeFilterCategory.name, activeFilterGenre.name, 'look', films));
               }}>
               Посмотреть
            </div>
         </div>
         <div className="filters">
            <div className="filters__sort" >
               <div ref={refSort}>
                  <p>
                     Сортировать по
                     <span className='filtab' onClick={() => setSortTab(!sortTab)}>
                        {activeFilterSort.label}
                     </span>
                  </p>
                  <ul className='filters__sort-list filters__list'>
                     {sortTab ? sortItemArr : null}
                  </ul>
               </div>
            </div>
            <div className="filters__category">
               <div ref={refCategory}>
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
            </div>
            <div className="filters__genre">
               <div ref={refGenre}>
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
         </div>
      </>
   )
}

const FilterItem = ({ activeFilterSort, activeFilterCategory, activeFilterGenre, setActiveFilter, name, label, setTab, filterView, films }) => {

   const dispatch = useDispatch();

   return (
      <li
         key={uuidv4()}
         className={'filters__item'}
         onClick={() => {
            dispatch(setActiveFilter({ name, label }));
            dispatch(setFilterSort(activeFilterSort, activeFilterCategory, activeFilterGenre, filterView, films));
            setTab(false);
         }}
      >
         {label}
      </li >
   )
}

export default Filters;