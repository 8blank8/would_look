
import { Filters, FilmsView } from '../index';

const CatalogFilms = () => {
   return (
      <div className="content">
         <Filters />
         <div className="catalog">
            <div className="catalog__items">
               <FilmsView />
            </div>
         </div>
      </div>
   )
}

export default CatalogFilms;