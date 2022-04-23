import { useEffect, useState } from "react"

const FilmListServer = ({ setApiFilm, apiFilmsArray, setTitleFilm }) => {

   const [visibleList, setVisibleList] = useState(false);

   useEffect(() => {
      if (apiFilmsArray.length >= 1) {
         setVisibleList(true);
      }
   }, [apiFilmsArray])

   const visibleContent = apiFilmsArray.map(({ title, rating, dateRelease, posterUrl }, i) => {
      if (title !== undefined && rating !== 'null' && dateRelease !== 'null') {
         return (
            <li
               onClick={() => {
                  setApiFilm(i);
                  setVisibleList(false);
                  setTitleFilm(title);
               }}
               key={i}
               className="list__item">
               <div className="list__image">
                  <img src={posterUrl} alt="" />
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