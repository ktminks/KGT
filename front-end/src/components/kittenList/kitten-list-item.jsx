/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";

const KittenListItem = ({
  kitten, handleSelect, index, classDef,
}) => {
  const handleClick = async (id, i, e) => {
    // e.preventDefault();
    if (e.key) await handleSelect(id, i, e.key);
    else await handleSelect(id, i, null);
  };

  return (
    <li
      className={classDef}
      aria-label={`${kitten.name}`}
      onKeyDown={(e) => handleClick(kitten.id, index, e)}
      onClick={async (e) => { (await handleClick(kitten.id, index, e)); }}
    >
      {kitten.name}
    </li>
  );
};
export default KittenListItem;
