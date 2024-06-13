import React, { useState, useEffect } from "react";
import Boxen from "./Boxen";

// Typescripta props som componenteten behöver

interface PusselbradaProps {
  antalRader: number;
  antalKolumner: number;
}

// Funktion som används för att blanda boxar i pusslet
const blandaArray = (array: (number | null)[]): (number | null)[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// function component som har 2 props
const Pusselbrada: React.FC<PusselbradaProps> = ({
  antalRader,
  antalKolumner,
}) => {
  // componentens state (boxar = tom array), (tomIndex(rutan utan nummer, tom ruta) = null)
  const [boxar, setBoxar] = useState<(number | null)[]>([]);
  const [tomIndex, setTomIndex] = useState<number | null>(null);

  // Hook som trigar funktionen initieraBoxar() så fort antalRader, antalKolumner ändras
  useEffect(() => {
    initieraBoxar();
  }, [antalRader, antalKolumner]);

  const initieraBoxar = () => {
    // Skapa en array med nummer från 1 till (antalRader * antalKolumner - 1)
    let initialBoxar: (number | null)[] = Array.from(
      { length: antalRader * antalKolumner - 1 },
      (_, i) => i + 1
    );
    // Blanda initialBoxar med funktionen blandaArray
    initialBoxar = blandaArray(initialBoxar);
    // Lägg till tom värde(null) till sista platsen av arrayn
    initialBoxar.push(null);
    // uppdatera staten med arrayen
    setBoxar(initialBoxar);
    // uppdatera staten med index nummer av den tomma boxen utan nummer
    setTomIndex(initialBoxar.length - 1);
  };

  // Funktionen när man triggas när man klickar på en box
  const hanteraBrickaKlick = (index: number) => {
    // Om man klickar på den tomma boxen, avsluta funktionen
    if (tomIndex === null) return;

    // kopia av arrayen men initiala ordningen av boxar
    const nyaBoxar = [...boxar];
    // Räkna ut rad och column av den tomma boxen
    const tomRad = Math.floor(tomIndex / antalKolumner);
    const tomKolumn = tomIndex % antalKolumner;
    // Räkna ut rad och column av boxen som är klickad
    const klickadRad = Math.floor(index / antalKolumner);
    const klickadKolumn = index % antalKolumner;

    // Om man har klickad en box i samma rad som den tomma boxen men olika column än den tomma boxen
    if (tomRad === klickadRad && tomKolumn !== klickadKolumn) {
      // Sätta regel för riktingen av hur boxen ska röra sig( 1=höger, -1=vänster)
      const riktning = tomKolumn < klickadKolumn ? 1 : -1;

      // Rörelse ska ske mot den toma boxen i raden
      for (
        let kolumn = tomKolumn;
        kolumn !== klickadKolumn;
        kolumn += riktning
      ) {
        nyaBoxar[tomRad * antalKolumner + kolumn] =
          nyaBoxar[tomRad * antalKolumner + (kolumn + riktning)];
      }
      // Sätter den den klickade boxen att bli den nya platsen för tomma boxen
      nyaBoxar[klickadRad * antalKolumner + klickadKolumn] = null;
      // uppdatera staten för den nya index för den toma boxen
      setTomIndex(index);
      // Samma som ovan men omvänt scenario
    } else if (tomKolumn === klickadKolumn && tomRad !== klickadRad) {
      const riktning = tomRad < klickadRad ? 1 : -1;
      for (let rad = tomRad; rad !== klickadRad; rad += riktning) {
        nyaBoxar[rad * antalKolumner + tomKolumn] =
          nyaBoxar[(rad + riktning) * antalKolumner + tomKolumn];
      }
      nyaBoxar[klickadRad * antalKolumner + klickadKolumn] = null;
      setTomIndex(index);
    }

    setBoxar(nyaBoxar);
  };

  // funktion som kollar ifall man har löst pussel, den körs varje gång en re-render sker. re-render sker varje gång en state ändras som(boxar, tomIndex)
  const arLost = () => {
    // looopar igenom alla boxar förutom sista
    for (let i = 0; i < boxar.length - 1; i++) {
      // kollar om alla boxar är i ordning
      if (boxar[i] !== i + 1) return false;
    }
    return true;
  };

  return (
    <div className="w-full lg:w-1/2">
      <div
        className="grid gap-1 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${antalKolumner}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${antalRader}, minmax(0, 1fr))`,
          width: "100%",
          maxWidth: "var(--grid-max-width)",
        }}
      >
        {boxar.map((box, index) => (
          <Boxen
            key={index}
            value={box}
            onClick={() => hanteraBrickaKlick(index)}
            isEmpty={box === null}
          />
        ))}
      </div>
      <button
        onClick={initieraBoxar}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Blanda
      </button>
      {arLost() && (
        <div className="mt-4 text-green-500">Grattis! Du har löst pusslet!</div>
      )}
    </div>
  );
};

export default Pusselbrada;
