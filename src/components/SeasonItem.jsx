import { useEffect, useState } from 'react';
import FilmService from '../services/FilmService';

const SeasonItem = ({ id }) => {
   const [season, setSeason] = useState('');

   const { getSerialSeasons } = FilmService();

   useEffect(() => {
      getSerialSeasons(id).then(data => setSeason(data));
   }, []);

   return (
      <div className="seasons">
         <div className="seasons__wrapper">
            <div className="seasons__season">
               Всего {season.total} сезонов
               {season && season.items.map(({ number, episodes }) => {
                  return (
                     <>
                        <div className="seasons__number">
                           {number} сезон
                        </div>
                        <div className="seasons__series">
                           {episodes.map(({ nameRu, synopsis }, i) => {
                              return (
                                 <>
                                    <div className="seasons__ser">
                                       {i + 1}
                                       <div className="seasons__hover">
                                          <div className="seasons__hover-wrapper">
                                             <div className="seasons__hover-title">
                                                {nameRu}
                                             </div>
                                             <div className="seasons__hover-descr">
                                                {synopsis}
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </>
                              )
                           })}
                        </div>
                     </>
                  )
               })}
            </div>
         </div>
      </div>
   )
}

export default SeasonItem;