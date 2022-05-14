
import { Header, AddFilmForm, CatalogFilms, FilmPage } from './index';
import { Route, Routes } from "react-router-dom";

import { useEffect } from 'react';
import { useHttp } from '../hooks/useHttp';

import { setGenreArr, setCategoryArr, setFilms } from '../redux/actions/filters';
import { useDispatch } from 'react-redux';

function App() {

   const dispatch = useDispatch();
   const request = useHttp();

   useEffect(() => {
      request('http://localhost:3001/categoties')
         .then(data => dispatch(setCategoryArr(data)));

      request('http://localhost:3001/genres')
         .then(data => dispatch(setGenreArr(data)));

      request('http://localhost:3001/films-view')
         .then(data => {
            dispatch(setFilms(data));
         });
   }, [])

   return (
      <div className="App">
         <Header />
         <Routes>
            <Route path='/' element={<AddFilmForm />} />
            <Route path='/catalog/view' element={<CatalogFilms />} />
            <Route path='/catalog/view/:id' element={<FilmPage />} />
         </Routes>
      </div >
   );
}

export default App;
