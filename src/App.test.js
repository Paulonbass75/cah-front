// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
// import React, { useState, useEffect } from "react";
// import Player from "./Player";
// import Dealer from "./Dealer";
// import Card from "./components/Card"; // Ensure the import path is correct

// const App = () => {
//   const [gameState, setGameState] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     // Fetch initial game state from the backend
//     fetch("/api/game-state")
//       .then((response) => response.json())
//       .then((data) => setGameState(data));
//   }, []);

//   const playCard = (playerIndex, cardIndex) => {
//     // Handle card play logic
//     const newGameState = { ...gameState };
//     const player = newGameState.players[playerIndex];
//     const playedCard = player.hand.splice(cardIndex, 1)[0];
//     newGameState.playedCards.push({ playerIndex, playedCard });
//     setGameState(newGameState);
//   };

//   const nextRound = () => {
//     // Handle logic for moving to the next round
//     fetch("/api/next-round", {
//       method: "POST",
//       body: JSON.stringify(gameState),
//     })
//       .then((response) => response.json())
//       .then((data) => setGameState(data));
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     if (!darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   };

//   if (!gameState) return <div>Loading...</div>;

//   return (
//     <div className={darkMode ? "dark" : ""}>
//       <button
//         onClick={toggleDarkMode}
//         className="p-2 bg-gray-800 text-white rounded"
//       >
//         Toggle Dark Mode
//       </button>
//       <h1 className="text-3xl font-bold">CAH Game</h1>
//       <Dealer />
//       <div className="flex flex-wrap">
//         {gameState.players.map((player, index) => (
//           <div key={index} className="m-4">
//             <h2 className="text-2xl font-bold">{player.name}</h2>
//             <div className="flex flex-wrap">
//               {player.hand.map((card, idx) => (
//                 <Card key={idx} card={card} />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;