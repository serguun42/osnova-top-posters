import { object } from 'prop-types';
import { createRef, useState } from 'react';
import { SlideDown, SlideUp } from '../util/animations';
import Avatar from '../util/html/avatar';
import { StraightRefined } from '../util/html/refined';
import Ripple from './Ripple';
import './SubsitesCard.css';

/**
 * @param {{ subsite: import("../../types").SubsiteDataSorted }} props
 */
export default function SubsitesCard({ subsite }) {
  const [isExtended, setExtended] = useState(false);
  const moreRef = createRef();

  return (
    <div className="subsite-card">
      <div className="subsite-card__header">
        <a
          href={`https://${process.env.REACT_APP_SITE_LINK}/${subsite.meta.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="subsite-card__header__icon"
          style={{ backgroundImage: Avatar(subsite.meta.avatar, true) }}
        />
        <a
          href={`https://${process.env.REACT_APP_SITE_LINK}/${subsite.meta.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="subsite-card__header__name"
        >
          {StraightRefined(subsite.meta.name)}
          <span className="material-icons">open_in_new</span>
        </a>
        <div
          className="subsite-card__header__switch default-no-select default-pointer"
          onClick={() => {
            if (isExtended) SlideUp(moreRef.current, 400);
            else SlideDown(moreRef.current, 400, { display: 'block' });

            setExtended(!isExtended);
          }}
        >
          <i className="material-icons">{isExtended ? 'unfold_less' : 'unfold_more'}</i>
          <Ripple />
        </div>
      </div>
      <div className="subsite-card__inner" ref={moreRef}>
        <div className="subsite-card__list">
          {subsite.posters.map((poster) => (
            <a
              href={`https://${process.env.REACT_APP_SITE_LINK}/u/${poster.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="subsite-card__poster"
              key={poster.id}
            >
              <div
                className="subsite-card__poster__avatar"
                style={{ backgroundImage: Avatar(poster.avatar_url, false) }}
              />
              <div className="subsite-card__poster__name">{StraightRefined(poster.name)}</div>
              <div
                className={`subsite-card__poster__karma ${
                  poster.rating > 0
                    ? 'subsite-card__poster__karma--positive'
                    : poster.rating < 0
                    ? 'subsite-card__poster__karma--negative'
                    : ''
                }`}
              >
                {poster.rating > 0 ? '+' : ''}
                {poster.rating || 0}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

SubsitesCard.propTypes = {
  subsite: object.isRequired,
};
