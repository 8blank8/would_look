import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { deletedFilm } from '../redux/actions/film';
import { useHttp } from '../hooks/useHttp';


const FilmPage = () => {
   const filmPageItem = useSelector(state => state.filmReducer.filmPageItem);
   const {
      id,
      title,
      descriptionOfficial,
      posterUrl,
      genreOfficial,
      rating,
      dateRelease,
      grade,
      genreUser,
      datePublication,
      descriptioUser,
      view
   } = filmPageItem[0];

   const request = useHttp();
   const dispatch = useDispatch();

   const [modalOpen, setModalOpen] = useState(false);
   const [modalContent, setModalContent] = useState('');

   const onDeletedFilm = (id) => {
      request(`http://localhost:3001/films-view/${id}`, 'DELETE')
         .then(dispatch(deletedFilm(id)));
   }

   const onAddView = (id) => {
      request(`http://localhost:3001/films-view/${id}`, 'PUT', JSON.stringify({ ...filmPageItem[0], view: 'view' }));
   }

   const onShowModal = (text, func) => {
      return (
         <div className="modal">
            <div className="modal__wrapper">
               <div className="modal__text">
                  {`Вы действительно хотите ${text} `}
               </div>
               <div className="modal__buttons">
                  <NavLink to='/catalog/view'>
                     <div
                        className="modal__button"
                        onClick={() => {
                           setModalOpen(false);
                           func(id)
                        }}>
                        Да
                     </div>
                  </NavLink>
                  <div
                     className="modal__button"
                     onClick={() => setModalOpen(false)}>
                     Нет
                  </div>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="film">
         <div className="film__block">
            <div className="film__block-left">
               <div className="film__img">
                  <img src={posterUrl} alt={title} />
               </div>
               <div className="film__grade">
                  Оценка: {grade}
               </div>
               <div className="film__genre-user">
                  Пользовательский жанр: {genreUser.label}
               </div>
               <div className="film__publicate">
                  Добавлено: {datePublication}
               </div>
            </div>
            <div className="film__block-right">
               <div className="film__title">
                  {title}
               </div>
               <div className="film__description-off">
                  Описание:
                  <br />
                  <br />
                  {descriptionOfficial.length === 0 ? 'Описание отсутствует...' : descriptionOfficial}
               </div>
               <div className="film__genre-off">
                  Жанр: {genreOfficial.join(', ')}
               </div>
               <div className="film__rating">
                  Официальный рейтинг: {rating}
               </div>
               <div className="film__date">
                  Год выпуска: {dateRelease}
               </div>
            </div>
         </div>
         <div className="film__description-user">
            <div>
               Пользовательское описание:
            </div>
            {descriptioUser.length === 0 ? 'Описание отсутствует...' : descriptioUser}
         </div>
         <div className="film__buttons">
            {view === 'look' ? <div
               className="film__button"
               onClick={() => {
                  setModalOpen(true);
                  setModalContent(onShowModal(`переместить ${title} в просмотренное?`, onAddView))
               }}>
               Переместить в просмотренное
            </div> : <div></div>}
            <div
               className="film__button"
               onClick={() => {
                  setModalOpen(true);
                  setModalContent(onShowModal(`удалить ${title}?`, onDeletedFilm));
               }}>
               удалить
            </div>
         </div>
         {modalOpen && modalContent}
      </div >
   )
}


export default FilmPage;