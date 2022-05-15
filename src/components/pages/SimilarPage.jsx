import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilmService from '../../services/FilmService';

const SimilarPage = () => {

   const [film, setFilm] = useState(null);

   const id = useParams();

   const { getFilmId } = FilmService();

   useEffect(() => {
      getFilmId(id.id)
         .then(data => setFilm(data));
   }, []);

   const content = film && <View film={film} />

   return (
      <>
         {content}
      </>
   )
}

const View = ({ film }) => {
   const {
      posterUrl,
      title,
      descriptionOfficial,
      rating,
      genreOfficial,
      dateRelease
   } = film;
   return (
      <div className="film">
         <div className="film__block">
            <div className="film__block-left">
               <div className="film__img">
                  <img src={posterUrl} alt={title} />
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
               {/* {serial && <SeasonItem id={id} />} */}
            </div>
         </div>
         {/* <div className="film__buttons">
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
         </div> */}
         {/* <Similar id={id} /> */}
      </div >
   )
}

export default SimilarPage;