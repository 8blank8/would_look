import { useHttp } from '../hooks/useHttp';

const FilmService = () => {

   const _apiKey = 'e15d6bd8-6f84-4f31-802b-11148c933567';
   const _apiBase = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/'
   const request = useHttp();

   const searchFilms = async (title) => {

      let res = await request(`${_apiBase}search-by-keyword?keyword=${encodeURI(title)}&&page=1`, 'GET', null, {
         'X-API-KEY': _apiKey,
         'Content-Type': 'application/json'
      })
      return res.films.map(_transformFilms);
   }

   const _transformFilms = (film) => {

      return {
         "title": film.nameRu,
         "descriptionOfficial": film.description,
         "rating": film.rating,
         "genreOfficial": film.genres.map(item => item.genre),
         "dateRelease": film.year,
         "posterUrl": film.posterUrl
      }
   }

   return { searchFilms };
}

export default FilmService;