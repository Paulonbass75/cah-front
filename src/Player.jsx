import React from "react";
import Card from "./components/Card"; // Ensure the import path is correct

const Player = ({ player, onSelectCard }) => {
  if (!player) {
    return <div>Loading...</div>;
  }

  console.log("Player's hand:", player.hand); // Debugging log

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Player: {player.name}</h2>
      <div className="flex flex-wrap">
        {player.hand.map((card, idx) => (
          <Card key={idx} card={card} onSelect={onSelectCard} /> // Use Card component to wrap each card
        ))}
      </div>
    </div>
  );
};

export default Player;
