import { useHttp } from '../hooks/useHttp';

const FilmService = () => {

   const _apiKey = '1bd55337-85e5-49e8-b4c6-f2a19736b048';
   const _apiBase = 'https://kinopoiskapiunofficial.tech/api/';
   const request = useHttp();

   const searchFilms = async (title) => {
      let res = await request(`${_apiBase}v2.1/films/search-by-keyword?keyword=${encodeURI(title)}&&page=1`, 'GET', null, {
         'X-API-KEY': _apiKey,
         'Content-Type': 'application/json'
      })
      return res.films.map(_transformSearchFilms);
   }

   const getFilmId = async (id) => {
      let res = await request(`${_apiBase}v2.2/films/${id}`, 'GET', null, {
         'X-API-KEY': _apiKey,
         'Content-Type': 'application/json'
      });
      return _transformFilm(res);
   }

   const _transformSearchFilms = (film) => {
      return {
         "title": film.nameRu,
         "rating": film.rating,
         "dateRelease": film.year,
         "posterUrl": film.posterUrl,
         "id": film.filmId
      }
   }

   const _transformFilm = (film) => {
      return {
         "title": film.nameRu,
         "descriptionOfficial": film.description,
         "rating": film.ratingKinopoisk,
         "genreOfficial": film.genres.map(item => item.genre),
         "dateRelease": film.year,
         "posterUrl": film.posterUrl,
         "id": film.kinopoiskId,
         "serial": film.serial
      }
   }

   return { searchFilms, getFilmId };
}

export default FilmService;