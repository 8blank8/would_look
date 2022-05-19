import { useEffect, useState } from 'react';
import FilmService from '../services/FilmService';

const SeasonItem = ({ id }) => {
   const [season, setSeason] = useState('');
   const [activeSeason, setActiveSeason] = useState(0);
   const [activeEpisode, setActiveEpisode] = useState(0);
   const [activeDescr, setActiveDescr] = useState('');

   const { getSerialSeasons } = FilmService();

   useEffect(() => {
      getSerialSeasons(id)
         .then(data => {
            setSeason(data);
            setActiveDescr(data.items[activeSeason].episodes[activeEpisode]);
         })
   }, [id]);

   return (
      <div className="seasons">
         <div className="seasons__wrapper">
            <div className="seasons__season">
               Сезоны и серии:
               <div className="seasons__season-wrapper">
                  {season && season.items.map(({ number }) => {
                     return (
                        <div key={number} className="seasons__number" style={number - 1 === activeSeason ? { 'color': '#3E3E3E' } : { 'color': '#fff' }}>
                           <span onClick={() => {
                              setActiveSeason(number - 1);
                              setActiveEpisode(0);
                           }}>{number} сезон</span>
                        </div>
                     )
                  })}
               </div>
               <div className="seasons__series-wrapper">
                  <div className="seasons__seria">
                     {season && season.items[activeSeason].episodes.map((item, i) => {
                        return (
                           <div key={i} style={i === activeEpisode ? { 'color': '#3E3E3E' } : { 'color': '#fff' }} onClick={() => {
                              setActiveEpisode(i);
                              setActiveDescr(item);
                           }}>
                              {i + 1} серия
                           </div>
                        )
                     })}
                  </div>
               </div>
               <div className='seasons__descr-wrapper'>
                  <p>Описание серии:</p>
                  {
                     <div>
                        {activeDescr !== undefined ? activeDescr.synopsis : 'Описание отсутствует'}
                     </div>
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default SeasonItem;