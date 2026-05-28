import { useState } from "react";
import { allCards, minorArcana, majorArcana } from "./cards";

function App() {
  const [currentCard, setCurrentCard] = useState(null);
  const [deck, setDeck] = useState(allCards);

  return (
    <div>
      <h1>Our Tarot App</h1>
      <button
        onClick={() => setDeck(allCards)}
        style={{ opacity: deck === allCards ? 1 : 0.4 }}
      >
        All
      </button>
      <button
        onClick={() => setDeck(majorArcana)}
        style={{ opacity: deck === majorArcana ? 1 : 0.4 }}
      >
        Major
      </button>
      <button
        onClick={() => setDeck(minorArcana)}
        style={{ opacity: deck === minorArcana ? 1 : 0.4 }}
      >
        Minor
      </button>

      <div>{currentCard}</div>
      <button
        onClick={() => {
          const i = Math.floor(Math.random() * deck.length);
          setCurrentCard(deck[i]);
        }}
      >
        Draw a card
      </button>
    </div>
  );
}

export default App;
