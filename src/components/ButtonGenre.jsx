
import { useDispatch, useSelector } from "react-redux";
import { setActiveGenre } from "../redux/actions/filters";


const ButtonGenre = () => {

   const activeGenre = useSelector(({ filmReducer }) => filmReducer.activeGenre);
   const genreArr = useSelector(({ filmReducer }) => filmReducer.genreArr);

   const dispatch = useDispatch();

   const addButtonGenre = (arr) => {
      return arr.map(({ label, id, name }) => {
         if (name !== 'all') {
            return (
               <li
                  key={id}
                  className={`form__category-genre form__button ${activeGenre.name === name ? 'active__button' : null}`}
                  onClick={() => dispatch(setActiveGenre({ name, label }))}>
                  {label}
               </li>
            )
         }
      })
   }
   const genreItem = addButtonGenre(genreArr);

   return (
      <ul className="form__genre">
         {genreItem}
      </ul>
   )
}

export default ButtonGenre;