import { useState, useEffect } from "react";
import { useHttp } from '../hooks/useHttp';
import { v4 as uuidv4 } from 'uuid';

import { FilmListServer } from './index';
import FilmService from "../services/FilmService";

const AddFilmForm = () => {

   const [titleFilm, setTitleFilm] = useState('');
   const [optionDescr, setOptionDesc] = useState('');
   const [gradeActive, setGradeActive] = useState(1);
   const [categoryActive, setCategoryActive] = useState('movie');
   const [genreActive, setGenreActive] = useState({ name: 'comedy', label: 'Комедия' });
   const [apiFilm, setApiFilm] = useState();
   const [apiFilmsArr, setApiFilmsArr] = useState([]);
   const [changeTitle, setChengeTitle] = useState('');

   const request = useHttp();
   const { searchFilms } = FilmService();

   const [categoryArr, setCategoryArr] = useState([]);
   const [genreArr, setGenreArr] = useState([]);

   const [openModal, setOpenModal] = useState(false);
   const [modalContent, setModalContent] = useState('');

   useEffect(() => {
      request('http://localhost:3001/categoties')
         .then(data => setCategoryArr(data));

      request('http://localhost:3001/genres')
         .then(data => setGenreArr(data));
   }, [])

   useEffect(() => {
      setApiFilmsArray(titleFilm);
   }, [changeTitle])

   //category

   const addButtonCategory = (arr) => {
      return arr.map(({ label, name, id }, i) => {
         return (
            <li
               key={id}
               value={name}
               className={`form__category-item form__button ${categoryActive === name ? 'active__button' : null}`}
               onClick={() => setCategoryActive(name)}>
               {label}
            </li>
         )
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

   // genre

   const addButtonGenre = (arr) => {
      return arr.map(({ label, id, name }) => {
         return (
            <li
               key={id}
               value={name}
               className={`form__category-genre form__button ${genreActive.name === name ? 'active__button' : null}`}
               onClick={() => setGenreActive({ name, label })}>
               {label}
            </li>
         )
      })
   }
   const genreItem = addButtonGenre(genreArr);

   //clearForm

   const clearForm = (e) => {
      e.preventDefault()

      setTitleFilm('');
      setOptionDesc('');
      setGradeActive(1);
      setCategoryActive('movie');
      setGenreActive({ name: 'comedy', label: 'Комедия' });
      setApiFilmsArr([]);
   }

   //addDataServer 

   const addDataServer = (e, view) => {
      e.preventDefault();

      const film = apiFilmsArr[apiFilm];
      const date = new Date();
      const addZeroDate = (date) => {
         return date < 10 ? '0' + date : date;
      }

      const data = {
         "id": uuidv4(),
         "title": film.title,
         "descriptioUser": optionDescr,
         "descriptionOfficial": film.descriptionOfficial,
         "grade": gradeActive,
         "rating": film.rating,
         "genreOfficial": film.genreOfficial,
         "genreUser": genreActive,
         "category": categoryActive,
         "datePublication": {
            date: addZeroDate(date.getDate()),
            mounth: addZeroDate(date.getMonth() + 1),
            year: addZeroDate(date.getFullYear()),
            minute: addZeroDate(date.getMinutes()),
            hour: addZeroDate(date.getHours()),
            second: addZeroDate(date.getSeconds())
         },
         "dateRelease": film.dateRelease,
         "posterUrl": film.posterUrl,
         "view": view
      }

      request(`http://localhost:3001/films-view`, 'POST', JSON.stringify(data))
         .then(data => console.log(data))
         .then(clearForm(e))
         .then(onShowModal(film.posterUrl, film.title, view));
   }

   //setApiFimlsArr

   const setApiFilmsArray = (text) => {
      searchFilms(text).then(data => setApiFilmsArr(data));
   }

   //modalForm

   const onShowModal = (img, title, category) => {
      setModalContent(
         <div className="modalform">
            <div className="modalform__wrapper">
               <div className="modalform__img">
                  <img src={img} alt={title} />
               </div>
               <div className="modalform__body">
                  <div className="modalform__close" onClick={() => setOpenModal(false)}>
                     <span></span>
                     <span></span>
                  </div>
                  <div className="modalform__tile">
                     {title}
                  </div>
                  <div className="modalform__description">
                     добавлено в {category === 'view' ? 'просмотренно' : 'посмотреть'}
                  </div>
               </div>
            </div>
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
               <ul className="form__genre">
                  {genreItem}
               </ul>
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