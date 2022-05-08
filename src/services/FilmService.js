import { useHttp } from '../hooks/useHttp';

const FilmService = () => {

   const _apiKey = 'e15d6bd8-6f84-4f31-802b-11148c933567';
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

   const getSerialSeasons = async (id) => {
      let res = await request(`${_apiBase}v2.2/films/${id}/seasons`, 'GET', null, {
         'X-API-KEY': _apiKey,
         'Content-Type': 'application/json'
      });
      return _transformSeasons(res);
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

   const _transformSeasons = (serial) => {
      return {
         total: serial.total,
         items: serial.items.map(({ number, episodes }) => {
            return {
               number,
               episodes: episodes.map(({ nameRu, synopsis, releaseDate }) => {
                  return {
                     nameRu,
                     synopsis,
                     releaseDate
                  }
               })
            }
         })
      }
   }

   return { searchFilms, getFilmId, getSerialSeasons };
}

export default FilmService;