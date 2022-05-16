import { useEffect, useState } from "react";

import { Film } from "./index";
import FilmService from "../services/FilmService";

const Similar = ({ id }) => {

   const [similarFilms, setSimilarFilms] = useState([]);

   const { getSimilarsId } = FilmService();

   useEffect(() => {
      getSimilarsId(id).then(data => setSimilarFilms(data));
   }, [id]);

   return (
      <div className="similar">
         <div className="similar__wrapper">
            {similarFilms.map(film => <Film id={film.id} film={film} similar />)}
         </div>
      </div>
   )
}

export default Similar;