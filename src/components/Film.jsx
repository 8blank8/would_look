import { Link } from "react-router-dom";

const Film = ({ film, similar }) => {
   const { id, posterUrl, title, grade } = film;

   const handlerScrollUp = () => {
      document.documentElement.scrollTop = 0;
   }

   return (
      <div className="film film_cursor" onClick={similar && handlerScrollUp}>
         <Link to={!similar ? `/catalog/view/${id}` : `/similar/${id}`}>
            <div className="film__img">
               <img src={posterUrl} alt={title} />
            </div>
            <div className="film__body">
               <div className="film__title">
                  {title}
               </div>
               {!similar && <div className="film__rating">
                  Оценка: {grade}
               </div>}
            </div>
         </Link>
      </div>
   )
}

export default Film;