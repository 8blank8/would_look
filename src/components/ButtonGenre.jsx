import { useState, useEffect } from "react";

import { useHttp } from '../hooks/useHttp';
import { useDispatch, useSelector } from "react-redux";
import { setActiveGenre } from "../redux/actions/filters";


const ButtonGenre = () => {

   const activeGenre = useSelector(({ filmReducer }) => filmReducer.activeGenre);
   const [genreArr, setGenreArr] = useState([]);

   const request = useHttp();
   const dispatch = useDispatch();

   useEffect(() => {
      request('http://localhost:3001/genres')
         .then(data => setGenreArr(data));
   }, [])

   const addButtonGenre = (arr) => {
      return arr.map(({ label, id, name }) => {
         return (
            <li
               key={id}
               className={`form__category-genre form__button ${activeGenre.name === name ? 'active__button' : null}`}
               onClick={() => dispatch(setActiveGenre({ name, label }))}>
               {label}
            </li>
         )
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