import { useState, useEffect } from "react";
import { useHttp } from '../hooks/useHttp';

const ButtonGenre = () => {

   const [genreActive, setGenreActive] = useState([{ name: 'comedy', label: 'Комедия' }]);
   const [genreArr, setGenreArr] = useState([]);

   const request = useHttp();

   useEffect(() => {
      request('http://localhost:3001/genres')
         .then(data => setGenreArr(data));
   }, [])

   const addButtonGenre = (arr) => {
      return arr.map(({ label, id, name }) => {
         return (
            <li
               key={id}
               className={`form__category-genre form__button ${genreActive.name === name ? 'active__button' : null}`}
               onClick={() => setGenreActive({ name, label })}>
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