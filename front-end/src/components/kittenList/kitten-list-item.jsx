/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";

const KittenListItem = ({
  kitten, onSelect, currentIndex, index,
}) => {
  const currentClass = `w-100 list-group-item list-group-item-action ${index === currentIndex ? "active" : ""}`;

  return (
    <li
      className={currentClass}
      data-testid={`${kitten.name}${index}`}
      onKeyDown={(e) => onSelect(kitten.id, index, e)}
      onClick={() => onSelect(kitten.id, index)}
    >
      {kitten.name}
    </li>
  );
};

export default KittenListItem;
