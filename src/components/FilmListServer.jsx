import { useEffect, useState } from "react"
import FilmService from "../services/FilmService";

import { useDispatch } from "react-redux";
import { setApiFilm } from "../redux/actions/film";

const FilmListServer = ({ apiFilmsArray }) => {

   const dispatch = useDispatch();

   const [visibleList, setVisibleList] = useState(false);

   const { getFilmId } = FilmService();

   useEffect(() => {
      if (apiFilmsArray.length >= 1) {
         setVisibleList(true);
      }
   }, [apiFilmsArray])

   const visibleContent = apiFilmsArray.map(({ title, rating, dateRelease, posterUrl, id }, i) => {
      if (i <= 4 && title !== undefined && rating !== 'null' && dateRelease !== 'null') {
         return (
            <li
               onClick={() => {
                  getFilmId(id).then(data => dispatch(setApiFilm(data)));
                  setVisibleList(false);
               }}
               key={id}
               className="list__item">
               <div className="list__image">
                  <img src={posterUrl} alt={title} />
               </div>
               <div className="list__wrapper">
                  <div className="list__title">
                     {title}
                  </div>
                  <div className="list__body">
                     <div className="list__rating">
                        Официальный рейтинг: {rating}
                     </div>
                     <div className="list__realese">
                        Год выпуска: {dateRelease}
                     </div>
                  </div>
               </div>
            </li>
         )
      }
   })

   return (
      <ul className="list">
         {visibleList ? visibleContent : null}
      </ul>
   )
}

export default FilmListServer;