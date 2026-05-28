import { useState, useEffect } from "react";
import { allCards, minorArcana, majorArcana } from "./cards";

function App() {
  const [currentCard, setCurrentCard] = useState(null);
  const [deck, setDeck] = useState(allCards);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!currentCard) return;

    async function fetchImage() {
      const res = await fetch(
        "https://petaloverflow.github.io/tarot-api/cards.json",
      );
      const data = await res.json();
      const match = data.find((c) => c.name === currentCard);
      setImage(match.image);
    }
    fetchImage();
  }, [currentCard]);

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
      {image && <img src={image} alt={currentCard} width={200}></img>}
      <button
        onClick={() => {
          const i = Math.floor(Math.random() * deck.length);
          setCurrentCard(deck[i]);
          setImage(null);
        }}
      >
        Draw a card
      </button>
    </div>
  );
}

export default App;
