import { useState, useEffect } from "react";
import { useHttp } from '../../hooks/useHttp';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilmPageItem } from "../../redux/actions/film";
import { setActiveGenre } from "../../redux/actions/filters";

import { FilmListServer, ButtonGenre } from '../index';
import FilmService from "../../services/FilmService";

const AddFilmForm = () => {

   const [titleFilm, setTitleFilm] = useState('');
   const [optionDescr, setOptionDesc] = useState('');
   const [gradeActive, setGradeActive] = useState(1);
   const [categoryActive, setCategoryActive] = useState('movie');
   const [apiFilm, setApiFilm] = useState();
   const [apiFilmsArr, setApiFilmsArr] = useState([]);
   const [changeTitle, setChengeTitle] = useState('');

   const activeGenre = useSelector(({ filmReducer }) => filmReducer.activeGenre);
   const categoryArr = useSelector(({ filmReducer }) => filmReducer.categoryArr);

   const request = useHttp();
   const dispatch = useDispatch();
   const { searchFilms } = FilmService();

   const [openModal, setOpenModal] = useState(false);
   const [modalContent, setModalContent] = useState('');


   useEffect(() => {
      setApiFilmsArray(titleFilm);
   }, [changeTitle])



   //category

   const addButtonCategory = (arr) => {
      return arr.map(({ label, name, id }, i) => {
         if (name !== 'all') {
            return (
               <li
                  key={id}
                  value={name}
                  className={`form__category-item form__button ${categoryActive === name ? 'active__button' : null}`}
                  onClick={() => setCategoryActive(name)}>
                  {label}
               </li>
            )
         }
      })
   }
   const categoryItem = addButtonCategory(categoryArr);

   //grade
   const addGradeItem = (num) => {
      const gradeArr = [];

      for (let i = 1; i <= num; i++) {
         gradeArr.push(
            <li
               key={i}
               className={`form__grade-item ${gradeActive === i ? 'active__grade' : null}`}
               onClick={() => setGradeActive(i)}>
               {i}
            </li>
         )
      }
      return gradeArr;
   }
   const gradeItem = addGradeItem(10);

   //clearForm

   const clearForm = (e) => {
      e.preventDefault()

      setTitleFilm('');
      setOptionDesc('');
      setGradeActive(1);
      setCategoryActive('movie');
      dispatch(setActiveGenre({ name: 'comedy', label: 'Комедия' }));
      setApiFilmsArr([]);
   }

   //addDataServer 

   const addDataServer = (e, view) => {
      e.preventDefault();

      const date = new Date();
      const addZeroDate = (date) => {
         return date < 10 ? '0' + date : date;
      }
      const data = {
         "id": apiFilm.id,
         "title": apiFilm.title,
         "descriptioUser": optionDescr,
         "descriptionOfficial": apiFilm.descriptionOfficial,
         "grade": gradeActive,
         "rating": apiFilm.rating,
         "genreOfficial": apiFilm.genreOfficial,
         "genreUser": activeGenre,
         "category": categoryActive,
         "datePublication": {
            date: addZeroDate(date.getDate()),
            mounth: addZeroDate(date.getMonth() + 1),
            year: addZeroDate(date.getFullYear()),
            minute: addZeroDate(date.getMinutes()),
            hour: addZeroDate(date.getHours()),
            second: addZeroDate(date.getSeconds())
         },
         "dateRelease": apiFilm.dateRelease,
         "posterUrl": apiFilm.posterUrl,
         "view": view,
         "serial": apiFilm.serial
      }
      request(`http://localhost:3001/films-view`, 'GET')
         .then(items => {
            let yesFilm = false;
            items.map(item => {
               if (item.id === data.id) {
                  yesFilm = true;
                  dispatch(setFilmPageItem(item));
                  onShowModal(item, 'уже было добавленно');
               }
            })
            if (!yesFilm) {
               request(`http://localhost:3001/films-view`, 'POST', JSON.stringify(data))
                  .then(clearForm(e))
                  .then(dispatch(setFilmPageItem(data)))
                  .then(onShowModal(data, 'добавленно'));
            }
         })
   }

   //setApiFimlsArr

   const setApiFilmsArray = (text) => {
      searchFilms(text).then(data => setApiFilmsArr(data));
   }

   //modalForm

   const onShowModal = (data, text) => {
      setModalContent(
         <div className="modalform">
            <div className="modalform__close" onClick={() => setOpenModal(false)}>
               <span></span>
               <span></span>
            </div>
            <Link to={`/catalog/view/${data.id}`} className="modalform__wrapper">
               <div className="modalform__img">
                  <img src={data.posterUrl} alt={data.title} />
               </div>
               <div className="modalform__body">
                  <div className="modalform__tile">
                     {data.title}
                  </div>
                  <div className="modalform__description">
                     {text} в {data.view === 'view' ? 'просмотренно' : 'посмотреть'}
                  </div>
               </div>
            </Link>
         </div>
      );
      setOpenModal(true);

      setTimeout(() => {
         setModalContent('');
         setOpenModal(false);
      }, 4000);
   }


   return (
      <>
         <form className='form'>
            <div className="form__block">
               <div className="form__input-title">
                  <input
                     type="text"
                     placeholder='Название'
                     className="form__input"
                     value={titleFilm}
                     onChange={(e) => {
                        setTitleFilm(e.target.value);
                        setChengeTitle(e.target.value);
                     }} />
                  <FilmListServer setApiFilm={setApiFilm} apiFilmsArray={apiFilmsArr} setTitleFilm={setTitleFilm} />
               </div>
               <textarea
                  className="form__textarea"
                  placeholder="Описание"
                  value={optionDescr}
                  onChange={(e) => setOptionDesc(e.target.value)}></textarea>
               <div className="grade">Оценка</div>
               <ul className="form__grade">
                  {gradeItem}
               </ul>
            </div>
            <div className="form__block">
               <div className="category">Категория</div>
               <ul className="form__category">
                  {categoryItem}
               </ul>
               <div className="genre">Жанр</div>
               <ButtonGenre />
               <button
                  className="form__reset"
                  onClick={clearForm}>
                  ОЧИСТИТЬ
               </button>
            </div>
            <div className="form__buttons">
               <button
                  onClick={(e) => addDataServer(e, "look")}
                  className="form__look form__button-end">
                  ПОСМОТРЕТЬ
               </button>
               <button
                  onClick={(e) => addDataServer(e, "view")}
                  className="form__view form__button-end">
                  ПРОСМОТРЕНО
               </button>
            </div>
         </form>
         {openModal && modalContent}
      </>
   )
}

export default AddFilmForm;