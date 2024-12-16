import React from "react";
import BlackCard from "./components/BlackCard"; // Ensure the import path is correct

const Dealer = ({ dealer, blackCard, onPickWinner }) => {
  console.log("Dealer props:", { dealer, blackCard }); // Debugging log

  const selectedCards = []; // Define selectedCards array

  if (!dealer || !blackCard) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dealer: {dealer.name}</h2>
      <div className="flex flex-wrap">
        <BlackCard card={{ title: blackCard, content: "" }} />{" "}
        {/* Use BlackCard component to display the black card */}
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4">Pick a Winner:</h2>
        {selectedCards.map((selected, idx) => (
          <button
            key={idx}
            onClick={() => onPickWinner(selected.card)}
            className="p-2 bg-green-500 text-white rounded m-2"
          >
            {selected.card.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dealer;
