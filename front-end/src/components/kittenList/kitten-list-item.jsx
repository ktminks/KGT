/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";

const KittenListItem = ({
  kitten, handleSetActive, currentIndex, index, keySelect,
}) => {
  const currentClass = `w-100 list-group-item list-group-item-action ${index === currentIndex ? "active" : ""}`;

  return (
    <li
      className={currentClass}
      data-testid={`${kitten.name}${index}`}
      onKeyPress={(e) => keySelect(e)}
      onClick={() => handleSetActive(kitten, index)}
    >
      {kitten.name}
    </li>
  );
};

export default KittenListItem;
