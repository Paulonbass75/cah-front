import React, { useState, useEffect } from "react";
import Player from "./Player";
import Dealer from "./Dealer";
import Card from "./components/Card"; // Ensure the import path is correct

const App = () => {
  const [gameState, setGameState] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    // Check if game state is already in sessionStorage
    const storedGameState = sessionStorage.getItem("gameState");
    if (storedGameState) {
      setGameState(JSON.parse(storedGameState));
    } else {
      // Fetch initial game state from the backend
      fetch("http://127.0.0.1:5000/api/game-state")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched game state:", data); // Log the fetched data
          // Ensure the gameState includes a dealer object
          const updatedData = {
            ...data,
            dealer: data.dealer || { name: "Dealer" }, // Add a default dealer if not provided
          };
          setGameState(updatedData);
          // Store game state in sessionStorage
          sessionStorage.setItem("gameState", JSON.stringify(updatedData));
        })
        .catch((error) => {
          console.error("Error fetching game state:", error);
        });
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleJoinSession = () => {
    if (gameState.players.length >= 6) {
      alert("The session is full. Maximum 6 players allowed.");
      return;
    }

    // Populate the new player's hand with cards from the white_cards array
    const newPlayerHand = gameState.white_cards.slice(0, 7).map((card) => ({
      title: card,
      content: "", // Adjust this as needed based on your data structure
    }));

    const newPlayer = {
      name: playerName,
      hand: newPlayerHand,
      points: 0, // Initialize points for the new player
    };

    const updatedGameState = {
      ...gameState,
      players: [...gameState.players, newPlayer],
      white_cards: gameState.white_cards.slice(7), // Remove the dealt cards from the white_cards array
    };

    setGameState(updatedGameState);
    sessionStorage.setItem("gameState", JSON.stringify(updatedGameState));
    setPlayerName(""); // Clear the input field
    setCurrentPlayer(newPlayer); // Set the current player
  };

  const handleSelectCard = (card) => {
    console.log("Selected card:", card); // Handle card selection
    setSelectedCard(card);

    // Make API call to play the card
    fetch("http://127.0.0.1:5000/api/play-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: currentPlayer.name,
        card: card.title,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Card played:", data); // Log the response data

        // Remove the selected card from the player's hand
        const updatedHand = currentPlayer.hand.filter(
          (c) => c.title !== card.title
        );

        // Add a new random card from the white_cards array
        const newCard =
          gameState.white_cards[
            Math.floor(Math.random() * gameState.white_cards.length)
          ];
        updatedHand.push({ title: newCard, content: "" });

        // Update the player's hand and the game state
        const updatedPlayer = { ...currentPlayer, hand: updatedHand };
        const updatedPlayers = gameState.players.map((p) =>
          p.name === currentPlayer.name ? updatedPlayer : p
        );

        const updatedGameState = {
          ...gameState,
          players: updatedPlayers,
          white_cards: gameState.white_cards.filter((c) => c !== newCard), // Remove the new card from the white_cards array
        };

        setGameState(updatedGameState);
        setCurrentPlayer(updatedPlayer);
        sessionStorage.setItem("gameState", JSON.stringify(updatedGameState));

        // Add the selected card to the selectedCards array
        setSelectedCards([
          ...selectedCards,
          { player: currentPlayer.name, card },
        ]);
      })
      .catch((error) => {
        console.error("Error playing card:", error);
      });
  };

  const handlePickWinner = (winningCard) => {
    console.log("Winning card:", winningCard); // Handle picking a winner

    // Make API call to pick the winner
    fetch("http://127.0.0.1:5000/api/pick-winner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card: winningCard.title,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Winner picked:", data); // Log the response data

        // Update the game state with the new data
        setGameState(data);
        sessionStorage.setItem("gameState", JSON.stringify(data));
        setSelectedCards([]); // Clear the selected cards
      })
      .catch((error) => {
        console.error("Error picking winner:", error);
      });
  };

  if (!gameState) return <div>Loading...</div>;

  console.log("Current game state:", gameState); // Debugging log

  return (
    <div className={darkMode ? "dark" : ""}>
      <button
        onClick={toggleDarkMode}
        className="p-2 bg-gray-800 text-white rounded"
      >
        Toggle Dark Mode
      </button>
      <h1 className="text-3xl font-bold">CAH Game</h1>
      <Dealer
        dealer={gameState.players[gameState.dealer_index]}
        blackCard={gameState.black_card}
        onPickWinner={handlePickWinner}
      />
      {selectedCard && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Selected Card:</h2>
          <Card card={selectedCard} />
        </div>
      )}
      {currentPlayer && (
        <Player player={currentPlayer} onSelectCard={handleSelectCard} /> // Pass the current player to the Player component
      )}
      <div className="mt-4">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          className="p-2 border rounded"
        />
        <button
          onClick={handleJoinSession}
          className="p-2 bg-blue-500 text-white rounded ml-2"
        >
          Join Session
        </button>
      </div>
    </div>
  );
};

export default App;
