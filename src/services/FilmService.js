import { useHttp } from '../hooks/useHttp';

const FilmService = () => {

   const _apiKey = '1bd55337-85e5-49e8-b4c6-f2a19736b048';
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
         "posterUrl": film.posterUrl,
         "id": film.filmId
      }
   }

   return { searchFilms };
}

export default FilmService;