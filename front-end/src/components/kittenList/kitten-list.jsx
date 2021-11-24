import React from "react";
import KittenListItem from "./kitten-list-item";

const KittenList = ({ kittens, handleSetActive, currentIndex }) => (
  <>
    {kittens && kittens.length && kittens.map((kitten, i) => (
      <KittenListItem
        key={`${kitten.name}${kitten.id}`}
        kitten={kitten}
        handleSetActive={handleSetActive}
        currentIndex={currentIndex}
        index={i}
        keySelect={(e) => handleSetActive(kittens[e.key], e.key)}
      />
    ))}
  </>
);

export default KittenList;
