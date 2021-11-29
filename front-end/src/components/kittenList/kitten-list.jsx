import React from "react";
import KittenListItem from "./kitten-list-item";

const KittenList = ({ kittens, handleSetActive, currentIndex }) => {
  const [activeIndex, setActiveIndex] = React.useState(currentIndex);
  const onSelect = (id, index, e = null) => {
    if (e && kittens[e.key] && kittens[e.key].id !== id) {
      handleSetActive(kittens[e.key].id, e.key);
      setActiveIndex(e.key);
      return;
    }
    handleSetActive(id, index);
    setActiveIndex(index);
  };

  return (
    <>
      {kittens && kittens.length && kittens.map((kitten, i) => (
        <KittenListItem
          key={`${kitten.name}${kitten.id}`}
          kitten={kitten}
          onSelect={onSelect}
          currentIndex={activeIndex}
          index={i}
        />
      ))}
    </>
  );
};

export default KittenList;
