import React, { useEffect } from "react";
import KittenListItem from "./kitten-list-item";

const KittenList = ({ kittens, handleSetActive, currentIndex }) => {
  const classDef = (i, active) => `w-100 list-group-item list-group-item-action ${i === active ? "active" : ""}`;
  // const [activeIndex, setActiveIndex] = useState(currentIndex);
  // const [currentClass, setClass] = useState(classDef(0, activeIndex));

  useEffect(() => {}, [currentIndex]);

  const handleSelect = (id, index, e = null) => {
    if (e && kittens[e.key] && kittens[e.key].id !== id) {
      handleSetActive(kittens[e.key].id, e.key);
      // setActiveIndex(e.key);
      return;
    }
    // setClass(classDef(index, index));
    handleSetActive(id, index);
    // setActiveIndex(index);
  };

  return (
    <>
      {kittens && kittens.length && kittens.map((kitten, i) => (
        <KittenListItem
          key={`${kitten.name}${kitten.id}`}
          kitten={kitten}
          handleSelect={handleSelect}
          index={i}
          classDef={classDef(i, currentIndex)}
        />
      ))}
    </>
  );
};

export default KittenList;
