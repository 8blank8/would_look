import { Link } from "react-router-dom";
import { setFilmPageItem } from "../redux/actions/film";
import { useDispatch } from "react-redux";

const Film = ({ film }) => {
   const { id, posterUrl, title, grade } = film;
   const dispatch = useDispatch();
   return (
      <div className="film film_cursor" onClick={() => dispatch(setFilmPageItem(film))}>
         <Link to={`/catalog/view/${id}`}>
            <div className="film__img">
               <img src={posterUrl} alt={title} />
            </div>
            <div className="film__body">
               <div className="film__title">
                  {title}
               </div>
               <div className="film__rating">
                  Оценка: {grade}
               </div>
            </div>
         </Link>
      </div>
   )
}

export default Film;