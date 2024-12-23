/* eslint-disable react/prop-types */
import React from "react";

// ==============================|| NAV BADGE ||============================== //

const NavBadge = ({ items }) => {
  let navBadges = false;
  if (items.badge) {
    const badgeClass = ["label", "pcoded-badge", items.badge.type];

    navBadges = (
      <span className={badgeClass.join(" ")}>{items.badge.title}</span>
    );
  }

  return <React.Fragment>{navBadges}</React.Fragment>;
};

export default NavBadge;
