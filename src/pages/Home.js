import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Ripple from '../components/Ripple';
import SubsitesList from '../components/SubsitesList';
import store from '../store';
import { nextTheme } from '../store/theme';
import DateForPost from '../util/date-for-post';
import './Home.css';

export default function Home() {
  /** @type {{ theme: import("../store/theme").ThemeObject }} */
  const themeState = useSelector((state) => state.theme);
  const [everFetched, setEverFetched] = useState(false);
  /** @type {[import("../../types").TopPostersData]} */
  const [topPosters, setTopPosters] = useState(null);

  const LoadData = () => {
    fetch(`/osnova-top-posters/data/${process.env.REACT_APP_SITE_SHORT}.json`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`Status code ${res.status} ${res.statusText}`))))
      .then((topPostersDataFromAPI) => setTopPosters(topPostersDataFromAPI))
      .finally(() => setEverFetched(true));
  };

  useEffect(() => {
    if (!everFetched) LoadData();
  }, [everFetched]);

  return (
    <>
      <h1 className="home__title default-title-font">{process.env.REACT_APP_SITE_LONG} Top Posters</h1>
      <h4 className="home__title default-title-font">
        Лучшие авторы на {process.env.REACT_APP_SITE_LONG} по избранным подсайтам за последние 30 дней
      </h4>

      <div className="home__action-cards-container">
        <div className="home__action-card home__action-card--accent default-no-select">
          <i className="material-icons">today</i>
          <div>Обновлено {topPosters?.time ? DateForPost(new Date(topPosters.time)) : ''}</div>
        </div>
        <div
          className="home__action-card default-pointer default-no-select"
          onClick={() => store.dispatch(nextTheme())}
        >
          <i className="material-icons">{themeState.icon}</i>
          <div>Переключить тему</div>
          <Ripple />
        </div>
      </div>

      {everFetched ? <SubsitesList topPostersData={topPosters} /> : <Loading />}
    </>
  );
}
