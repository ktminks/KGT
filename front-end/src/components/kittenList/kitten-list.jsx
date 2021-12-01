import React, { useState, useEffect } from "react";
import KittenListItem from "./kitten-list-item";

const KittenList = ({ kittens, handleSetActive, currentIndex }) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const itemLabel = (i, active) => (i === active ? "active" : kittens[i].name);
  const classDef = (i, active) => `w-100 list-group-item list-group-item-action ${i === active ? "active" : ""}`;

  useEffect(() => setActiveIndex(currentIndex), [currentIndex]);

  const handleSelect = async (id, index, key) => {
    if (key && kittens[key] && kittens[key].id !== id) {
      await handleSetActive(kittens[key].id, key);
      setActiveIndex(key);
    } else {
    // setClass(classDef(index, index));
      await handleSetActive(id, index);
      setActiveIndex(index);
    }
  };

  return (
    <>
      {kittens && kittens.length && kittens.map((kitten, i) => (
        <KittenListItem
          key={`${kitten.name}${kitten.id}`}
          kitten={kitten}
          handleSelect={handleSelect}
          index={i}
          activeIndex={activeIndex}
          classDef={classDef(i, activeIndex)}
          label={itemLabel(i, activeIndex)}
        />
      ))}
    </>
  );
};

export default KittenList;
