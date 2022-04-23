
import { Header, AddFilmForm, CatalogFilms, FilmPage } from './index';
import { Route, Routes } from "react-router-dom";


function App() {

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
