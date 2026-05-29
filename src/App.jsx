import { useState, useEffect, useRef } from "react";
import { allCards, minorArcana, majorArcana } from "./cards";
import "./App.css";

function App() {
  const [currentCard, setCurrentCard] = useState(null);
  const [deck, setDeck] = useState(allCards);
  const [image, setImage] = useState(null);
  const [cardData, setCardData] = useState([]);
  const prevCardRef = useRef(null);
  const cardRef = useRef(null);

  // fetch the whole deck once on mount — empty [] means "run once"
  useEffect(() => {
    async function fetchDeck() {
      const res = await fetch(
        "https://petaloverflow.github.io/tarot-api/cards.json"
      );
      const data = await res.json();
      setCardData(data);
    }
    fetchDeck();
  }, []);

  // look up locally whenever the drawn card changes — no network call
  useEffect(() => {
    if (!currentCard || cardData.length === 0) return;
    const match = cardData.find((c) => c.name === currentCard);
    setImage(match?.image ?? null);
  }, [currentCard, cardData]);

  function drawCard() {
    prevCardRef.current = currentCard;
    const i = Math.floor(Math.random() * deck.length);
    setCurrentCard(deck[i]);

    const card = cardRef.current;
    if (!card) return;

    if (card.classList.contains("flipped")) {
      // already showing a card — flip back to back, then flip to new card
      card.classList.remove("flipped");
      setTimeout(() => card.classList.add("flipped"), 300);
    } else {
      // first draw — just flip forward
      card.classList.add("flipped");
    }
  }

  return (
    <div className="app">
      <h1>Our Tarot App</h1>

      <div className="deck-buttons">
        <button
          className={deck === allCards ? "active" : ""}
          onClick={() => setDeck(allCards)}
        >
          All
        </button>
        <button
          className={deck === majorArcana ? "active" : ""}
          onClick={() => setDeck(majorArcana)}
        >
          Major
        </button>
        <button
          className={deck === minorArcana ? "active" : ""}
          onClick={() => setDeck(minorArcana)}
        >
          Minor
        </button>
      </div>

      <div className="card-container">
        <div className="card" ref={cardRef}>
          <div className="card-back">
            <img
              src="https://petaloverflow.github.io/tarot-api/cards/back.jpg"
              alt="card back"
            />
          </div>
          <div className="card-front">
            {image && <img src={image} alt={currentCard} />}
          </div>
        </div>
      </div>

      <p className="card-name">{currentCard}</p>
      {prevCardRef.current && (
        <p className="prev-card">previously: {prevCardRef.current}</p>
      )}

      <button className="draw-button" onClick={drawCard}>
        Draw a card
      </button>
    </div>
  );
}

export default App;
