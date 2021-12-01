/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";

const KittenListItem = ({
  kitten, handleSelect, classDef, index,
}) => (
  <li
    className={classDef}
    aria-label={`${kitten.name}`}
    onKeyDown={(e) => handleSelect(kitten.id, index, e)}
    onClick={() => handleSelect(kitten.id, index)}
  >
    {kitten.name}
  </li>
);
export default KittenListItem;
