import { useSelector } from 'react-redux';

const FilmPage = () => {
   const filmPageItem = useSelector(state => state.filmReducer.filmPageItem);
   const {
      title,
      descriptionOfficial,
      posterUrl,
      genreOfficial,
      rating,
      dateRelease,
      grade,
      genreUser,
      datePublication,
      descriptioUser
   } = filmPageItem[0];

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
                  Пользовательский жанр: {genreUser}
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
                  {descriptionOfficial}
               </div>
               <div className="film__genre-off">
                  Жанр: {genreOfficial}
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
            {descriptioUser}
         </div>
         <div className="film__buttons">
            <div className="film__button">
               Переместить в просмотренное
            </div>
            <div className="film__button">
               удалить
            </div>
         </div>
      </div >
   )
}


export default FilmPage;