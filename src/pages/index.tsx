import ResponsiveTextArea from "@/components/ResponsiveTextArea";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [stringInput, setStringInput] = useState("");
  const [output, setOutput] = useState("");
  const [shiftDirection, setShiftDirection] = useState("left");
  const [switchPart, setSwitchPart] = useState("sound");

  function spoonerize(string: string) {
    // initialize 2 arrays containing each word in the inputted text
    const wordsArray = string
      .toLocaleLowerCase()
      .replaceAll(/\s/g, " ")
      .split(" ")
      .filter((n) => n);
    const newWordsArray = string
      .toLocaleLowerCase()
      .replaceAll(/\s/g, " ")
      .split(" ")
      .filter((n) => n);

    for (let i = 0; i < wordsArray.length; i++) {
      // loop through each word in inputted string
      let letterIndexAfterSwitchPart;
      // letterIndexAfterSwitchPart is the index of the first vowel or second letter
      if (switchPart == "sound") {
        letterIndexAfterSwitchPart = /a|e|i|o|u/g.exec(wordsArray[i])?.index;
        if (letterIndexAfterSwitchPart == undefined)
          // if the word doesnt have a vowel of "a", "e", "i", "o", or "u", then find index of first "y"
          letterIndexAfterSwitchPart = /y/g.exec(wordsArray[i])?.index;
      } else if (switchPart == "letter") {
        letterIndexAfterSwitchPart = 1;
      }
      const firstPart = wordsArray[i].substring(0, letterIndexAfterSwitchPart);

      if (shiftDirection == "left") {
        if (i != 0) {
          // if NOT on the first word
          let letterIndexAfterSwitchPartPrev;
          // the index of the first vowel or second letter of the previous word
          if (switchPart == "sound") {
            letterIndexAfterSwitchPartPrev = /a|e|i|o|u/g.exec(
              wordsArray[i - 1]
            )?.index;
            if (letterIndexAfterSwitchPartPrev == undefined)
              // if the word doesnt have a vowel of "a", "e", "i", "o", or "u", then find index of first "y"
              letterIndexAfterSwitchPartPrev = /y/g.exec(
                wordsArray[i - 1]
              )?.index;
          } else if (switchPart == "letter") {
            letterIndexAfterSwitchPartPrev = 1;
          }

          // set previous word to current word's first part + the rest of the previous word
          newWordsArray[i - 1] =
            firstPart +
            wordsArray[i - 1].substring(
              letterIndexAfterSwitchPartPrev || 0,
              wordsArray[i - 1].length
            );
        } else {
          // if on the first word
          let letterIndexAfterSwitchPartLast;
          // the index of the first vowel or second letter of the last word
          if (switchPart == "sound") {
            letterIndexAfterSwitchPartLast = /a|e|i|o|u/g.exec(
              wordsArray[newWordsArray.length - 1]
            )?.index;
            if (letterIndexAfterSwitchPartLast == undefined)
              // if the word doesnt have a vowel of "a", "e", "i", "o", or "u", then find index of first "y"
              letterIndexAfterSwitchPartLast = /y/g.exec(
                wordsArray[newWordsArray.length - 1]
              )?.index;
          } else if (switchPart == "letter") {
            letterIndexAfterSwitchPartLast = 1;
          }

          // set last word to first word's first part + the rest of the last word
          newWordsArray[newWordsArray.length - 1] =
            firstPart +
            wordsArray[newWordsArray.length - 1].substring(
              letterIndexAfterSwitchPartLast || 0,
              wordsArray[newWordsArray.length - 1].length
            );
        }
      } else if (shiftDirection == "right") {
        if (i != wordsArray.length - 1) {
          // if NOT on the last word
          let letterIndexAfterSwitchPartNext;
          // the index of the first vowel or second letter of the next word
          if (switchPart == "sound") {
            letterIndexAfterSwitchPartNext = /a|e|i|o|u/g.exec(
              wordsArray[i + 1]
            )?.index;
            if (letterIndexAfterSwitchPartNext == undefined)
              // if the word doesnt have a vowel of "a", "e", "i", "o", or "u", then find index of first "y"
              letterIndexAfterSwitchPartNext = /y/g.exec(
                wordsArray[i + 1]
              )?.index;
          } else if (switchPart == "letter") {
            letterIndexAfterSwitchPartNext = 1;
          }

          // set next word to current word's first part + the rest of the next word
          newWordsArray[i + 1] =
            firstPart +
            wordsArray[i + 1].substring(
              letterIndexAfterSwitchPartNext || 0,
              wordsArray[i + 1].length
            );
        } else {
          // if on the last word
          let letterIndexAfterSwitchPartFirst;
          // the index of the first vowel or second letter of the first word
          if (switchPart == "sound") {
            letterIndexAfterSwitchPartFirst = /a|e|i|o|u/g.exec(
              wordsArray[0]
            )?.index;
            if (letterIndexAfterSwitchPartFirst == undefined)
              // if the word doesnt have a vowel of "a", "e", "i", "o", or "u", then find index of first "y"
              letterIndexAfterSwitchPartFirst = /y/g.exec(wordsArray[0])?.index;
          } else if (switchPart == "letter") {
            letterIndexAfterSwitchPartFirst = 1;
          }

          // set first word to last word's first part + the rest of the first word
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
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Spoonerizer</title>
        <meta property="og:title" content="Spoonerizer" />
        <meta
          property="og:description"
          content="Create spoonerisms from any text."
        />
        <meta name="theme-color" content="#f97316" />
        <meta property="og:image" content="/favicon.ico" />
      </Head>

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
