import ResponsiveTextArea from "@/components/ResponsiveTextArea";
import { useState } from "react";

export default function Home() {
  const [stringInput, setStringInput] = useState("");
  const [output, setOutput] = useState("");
  const [shiftDirection, setShiftDirection] = useState("left");
  const [switchPart, setSwitchPart] = useState("sound");

  function spoonerize(string: string) {
    // initialize 2 arrays containing each word in the inputted text
    let wordsArray = string
      .toLocaleLowerCase()
      .replaceAll(/\s/g, " ")
      .split(" ")
      .filter((n) => n);
    let newWordsArray = string
      .toLocaleLowerCase()
      .replaceAll(/\s/g, " ")
      .split(" ")
      .filter((n) => n);

    for (let i = 0; i < wordsArray.length; i++) {
      let letterIndexAfterSwitchPart;
      if (switchPart == "sound")
        letterIndexAfterSwitchPart = /a|e|i|o|u/g.exec(wordsArray[i])?.index;
      if (switchPart == "letter") letterIndexAfterSwitchPart = 1;
      let firstPart = wordsArray[i].substring(0, letterIndexAfterSwitchPart);

      if (shiftDirection == "left") {
        if (i != 0) {
          let letterIndexAfterSwitchPartNext;
          if (switchPart == "sound")
            letterIndexAfterSwitchPartNext = /a|e|i|o|u/g.exec(
              wordsArray[i - 1]
            )?.index;
          if (switchPart == "letter") letterIndexAfterSwitchPartNext = 1;

          newWordsArray[i - 1] =
            firstPart +
            wordsArray[i - 1].substring(
              letterIndexAfterSwitchPartNext || 0,
              wordsArray[i - 1].length
            );
        } else {
          let letterIndexAfterSwitchPartFirst;
          if (switchPart == "sound")
            letterIndexAfterSwitchPartFirst = /a|e|i|o|u/g.exec(
              wordsArray[newWordsArray.length - 1]
            )?.index;
          if (switchPart == "letter") letterIndexAfterSwitchPartFirst = 1;

          newWordsArray[newWordsArray.length - 1] =
            firstPart +
            wordsArray[newWordsArray.length - 1].substring(
              letterIndexAfterSwitchPartFirst || 0,
              wordsArray[newWordsArray.length - 1].length
            );
        }
      } else if (shiftDirection == "right") {
        if (i != wordsArray.length - 1) {
          let letterIndexAfterSwitchPartNext;
          if (switchPart == "sound")
            letterIndexAfterSwitchPartNext = /a|e|i|o|u/g.exec(
              wordsArray[i + 1]
            )?.index;
          if (switchPart == "letter") letterIndexAfterSwitchPartNext = 1;

          newWordsArray[i + 1] =
            firstPart +
            wordsArray[i + 1].substring(
              letterIndexAfterSwitchPartNext || 0,
              wordsArray[i + 1].length
            );
        } else {
          let letterIndexAfterSwitchPartFirst;
          if (switchPart == "sound")
            letterIndexAfterSwitchPartFirst = /a|e|i|o|u/g.exec(
              wordsArray[0]
            )?.index;
          if (switchPart == "letter") letterIndexAfterSwitchPartFirst = 1;

          newWordsArray[0] =
            firstPart +
            wordsArray[0].substring(
              letterIndexAfterSwitchPartFirst || 0,
              wordsArray[0].length
            );
        }
      }
    }
    return newWordsArray.join(" ");
  }

  return (
    <div className="mx-auto max-w-2xl px-6 md:px-12 py-16 md:py-20">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Spoonerizer</title>
        <link rel="icon" type="image/png" href="" />

        <meta property="og:title" content="Spoonerizer" />
        <meta
          property="og:description"
          content="Create spoonerisms from any text."
        />
        <meta name="theme-color" content="#83b5d3" />
        <meta property="og:image" content="" />
      </head>

      <div className="w-full">
        <h1 className="text-center font-bold text-3xl mx-auto mb-10">
          Spoonerizer
        </h1>
        <ResponsiveTextArea
          className="input w-full"
          onInput={(e) => setStringInput(e.currentTarget.value)}
          value={stringInput}
          placeholder="Enter text to spoonerize..."
          maxLength={1000000}
          required
        />
        <div className="md:flex gap-3 md:w-min mx-auto mt-2">
          <select
            onChange={(e) => setShiftDirection(e.currentTarget.value)}
            value={shiftDirection}
            className="input selectArrows text-sm w-full md:w-min mt-2 md:m-0"
          >
            <optgroup label="Select a shift direction">
              <option value="left">Shift left</option>
              <option value="right">Shift right</option>
            </optgroup>
          </select>
          <select
            onChange={(e) => setSwitchPart(e.currentTarget.value)}
            value={switchPart}
            className="input selectArrows text-sm w-full md:w-min mt-2 md:m-0"
          >
            <optgroup label="Select a part to switch">
              <option value="sound">Switch first sound</option>
              <option value="letter">Switch first letter</option>
            </optgroup>
          </select>
          <button
            className="text-gray-100 font-medium rounded-md bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition px-3 py-2 mt-2 md:m-0"
            onClick={() => {
              setOutput(spoonerize(stringInput));
            }}
          >
            Spoonerize!
          </button>
        </div>
        <h1 className="block text-center text-4xl mx-auto mt-10">{output}</h1>
      </div>
    </div>
  );
}
