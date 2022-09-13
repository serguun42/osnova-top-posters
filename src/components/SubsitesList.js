import { object } from 'prop-types';
import SubsitesCard from './SubsiteCard';
import './SubsitesList.css';

/**
 * @param {{ topPostersData: import("../../types").TopPostersData }} props
 */
export default function SubsitesList({ topPostersData }) {
  const subsites = Object.keys(topPostersData.subsites)
    .map((subsiteURL) => topPostersData.subsites[subsiteURL])
    .sort((prev, next) => (next.meta.priority || 0) - (prev.meta.priority || 0));

  return (
    <div className="subsites-list">
      {subsites.map((subsite) => (
        <SubsitesCard subsite={subsite} key={subsite.meta.id} />
      ))}
    </div>
  );
}

SubsitesList.propTypes = {
  topPostersData: object.isRequired,
};
