import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilmService from '../../services/FilmService';

import { SeasonItem } from '../index';
import { Similar } from '../index';

const SimilarPage = () => {

   const [film, setFilm] = useState(null);

   const id = useParams();

   const { getFilmId } = FilmService();

   useEffect(() => {
      getFilmId(id.id)
         .then(data => setFilm(data));
   }, [id.id]);

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
      dateRelease,
      id,
      serial
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
               {serial && <SeasonItem id={id} />}
            </div>
         </div>
         <div className="film__buttons">
            <div></div>
            <div className="film__button">
               Добавить фильм
            </div>
         </div>
         Похожие фильмы:
         <Similar id={id} />
      </div >
   )
}

export default SimilarPage;