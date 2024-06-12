import React, { useState } from "react";
import config from "../config";

// Typescripta prop funktionen
interface SpelFormProps {
  onSubmit: (antalRader: number, antalKolumner: number) => void;
}

// Function component som har 1 funktion som prop
const SpelForm: React.FC<SpelFormProps> = ({ onSubmit }) => {
  // States, men default states från config filen
  const [antalRader, setAntalRader] = useState(config.defaultNumRows);
  const [antalKolumner, setAntalKolumner] = useState(config.defaultNumCols);

  // Funktionen som körs på submit och uppdaterar states med rad/kolumn nummer
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(antalRader, antalKolumner);
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Ditt Företag"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Konfigurera Pusselbräde
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="rader"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Antal Rader
              </label>
              <div className="mt-2">
                <input
                  id="rader"
                  name="rader"
                  type="number"
                  value={antalRader}
                  onChange={(e) => setAntalRader(Number(e.target.value))}
                  min="2"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="kolumner"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Antal Kolumner
              </label>
              <div className="mt-2">
                <input
                  id="kolumner"
                  name="kolumner"
                  type="number"
                  value={antalKolumner}
                  onChange={(e) => setAntalKolumner(Number(e.target.value))}
                  min="2"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Starta Spel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SpelForm;
