import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { deletedFilm } from '../../redux/actions/film';
import { useHttp } from '../../hooks/useHttp';

import { SeasonItem } from '../index';
import { Similar } from '../index';

const FilmPage = () => {
   const request = useHttp();

   const filmId = useParams();

   const [film, setFilm] = useState(null);
   useEffect(() => {
      request(`http://localhost:3001/films-view/${filmId.id}`)
         .then(data => setFilm(data));
   }, []);

   const content = film && <View filmPageItem={film} />

   return (
      <div className="film">
         {content}
         <Similar id={filmId.id} />
      </div >
   )
}

const View = ({ filmPageItem }) => {
   const request = useHttp();
   const dispatch = useDispatch();

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
      view,
      serial
   } = filmPageItem;

   const { date, mounth, year } = datePublication;



   const [modalOpen, setModalOpen] = useState(false);
   const [modalContent, setModalContent] = useState('');


   const onDeletedFilm = (id) => {
      request(`http://localhost:3001/films-view/${id}`, 'DELETE')
         .then(dispatch(deletedFilm(id)));
   }

   const onAddView = (id) => {
      request(`http://localhost:3001/films-view/${id}`, 'PUT', JSON.stringify({ ...filmPageItem, view: 'view' }));
   }
   const onAddLook = (id) => {
      request(`http://localhost:3001/films-view/${id}`, 'PUT', JSON.stringify({ ...filmPageItem, view: 'look' }));
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
      <>
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
                  Добавлено: {`${date}.${mounth}.${year}`}
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
               {serial && <SeasonItem id={id} />}
            </div>
         </div>
         <div className="film__description-user">
            <div>
               Пользовательское описание:
            </div>
            {descriptioUser.length === 0 ? 'Описание отсутствует...' : descriptioUser}
         </div>
         <div className="film__buttons">
            <div
               className="film__button"
               onClick={() => {
                  setModalOpen(true);
                  view === 'look' ? setModalContent(onShowModal(`переместить ${title} в просмотренное?`, onAddView)) : setModalContent(onShowModal(`переместить ${title} в посмотреть?`, onAddLook))
               }}>
               {view === 'look' ? 'Переместить в просмотренное' : 'Переместить в посмотреть'}
            </div>
            <div
               className="film__button"
               onClick={() => {
                  setModalOpen(true);
                  setModalContent(onShowModal(`удалить ${title}?`, onDeletedFilm));
               }}>
               удалить
            </div>
         </div>
         {/* <iframe src='https://www.youtube.com/embed/E7wJTI-1dvQ'
            frameBorder='0'
            allow='autoplay; encrypted-media'
            // allowFullScreen
            title='video'
         /> */}
         {modalOpen && modalContent}
      </>
   )
}


export default FilmPage;