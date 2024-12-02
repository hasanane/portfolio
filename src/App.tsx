import { useState } from "react";
import "./index.css";
function App() {
  return (
    <div className="flex flex-col h-auto bg-blue-100">
      <First />
      <Second />
    </div>
  );
}
function First() {
  return (
    <div className="h-svh relative bg-red-100 flex flex-col">
      <div className="h-3/5 flex">
        <div className=" w-full flex z-0">
          <div className="w-1/2 flex justify-center items-center bg-red-200">
            electronic
          </div>
          <div className="w-1/2 flex justify-center items-center bg-green-200">
            programing
          </div>
        </div>
      </div>
      <div className="h-2/5 flex">
        <div className="bg-orange-500 w-1/4 h-full flex justify-center items-center">
          About
        </div>
        <div className="bg-yellow-500 w-1/4 h-full flex justify-center items-center">
          skill & Tools
        </div>
        <div className="bg-lime-500 w-1/4 h-full flex justify-center items-center">
          Projects
        </div>
        <div className="bg-pink-500 w-1/4 h-full flex justify-center items-center">
          Contact
        </div>
      </div>
    </div>
  );
}
function Second() {
  return (
    <div className="flex flex-col">
      {/* top setion */}
      <div className="flex">
        <div className="flex h-auto w-full">
          {/* left bar */}
          <div className="w-1/4 bg-green-100 flex flex-col items-center">
            <div className="w-4/5 mt-8 flex justify-center bg-yellow-300 h-8">
              About
            </div>
            <div className="w-4/5 mt-8 flex justify-center bg-yellow-300 h-8">
              skill & Tools
            </div>
            <div className="w-4/5 mt-8 flex justify-center bg-yellow-300 h-8">
              Projects
            </div>
            <div className="w-4/5 mt-8 flex justify-center bg-yellow-300 h-8">
              Contact
            </div>
            <div className="w-4/5 mt-20 flex justify-center bg-red-300 h-8">
              Social
            </div>
          </div>
          {/* right bar */}
          <div className="w-3/4 bg-red-100">
            {/* about setion */}
            <BasicInformation />
            {/* skills setion */}
            <div>
              <div className="flex flex-col h-s80">
                <div className="h-2/5 flex">
                  <div className="h-full w-1/4 bg-red-200 flex justify-center items-center">
                    Photo
                  </div>
                  <div className="h-full w-3/4 bg-red-400 flex justify-center items-center">
                    Info
                  </div>
                </div>
                <div className="h-2/5 bg-green-200 flex">
                  <div className="h-full w-3/4 bg-red-400 flex justify-center items-center">
                    Info
                  </div>
                  <div className="h-full w-1/4 bg-red-200 flex justify-center items-center">
                    Photo
                  </div>
                </div>
                <div className="h-1/5 bg-pink-300 justify-center items-center flex">
                  Info about selected word
                </div>
              </div>
            </div>
            {/* projects setion */}
            <div className="h-s130 flex flex-col items-center">
              <div className="w-1/2 h-1/2 flex flex-col">
                <div className="h-1/2 flex justify-center items-center bg-green-200">
                  Photo
                </div>
                <div className="h-1/4 flex justify-center items-center bg-red-300">
                  Name
                </div>
                <div className="h-1/4 flex justify-center items-center bg-orange-300">
                  Link
                </div>
              </div>
              <div className=" w-full h-1/4 flex justify-center items-center bg-green-400">
                Info
              </div>
              <div className="w-full h-1/4 flex justify-center items-center bg-red-500">
                Info about selected word
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* down setion (contact) */}
      <div className="h-s70 flex">
        {/* left setion */}
        <div className="w-1/4 flex justify-center items-center bg-red-100">
          social
        </div>
        {/* right setion  */}
        <div className="w-3/4 flex flex-col items-center">
          {/* text  */}
          <div className="h-1/4 flex items-center justify-center w-4/5 bg-green-200">
            Text
          </div>
          {/* contact  */}
          <div className="w-full h-3/4 flex">
            {/* message */}
            <div className="w-4/5 flex flex-col">
              <div className="h-1/3 flex items-center justify-center bg-yellow-200">
                Name
              </div>
              <div className="h-1/3 flex items-center justify-center bg-amber-200">
                Email
              </div>
              <div className="h-1/3 flex items-center justify-center bg-blue-200">
                Message
              </div>
            </div>
            {/* send button  */}
            <div className="w-1/5 flex items-center justify-center bg-red-300">
              Send button
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BasicInformation() {
  return (
    <div className="flex flex-col h-s80">
      <div className="h-2/5 flex">
        <div className="h-full w-1/4 bg-red-200 flex justify-center items-center">
          Photo
        </div>
        <div className="h-full w-3/4 bg-red-400 flex justify-center items-center">
          Name
        </div>
      </div>
      <p className="h-2/5 bg-green-200">
        I study in{" "}
        <span
          onClick={() => {
            console.log("hi");
            setWord("Azad university");
          }}
          className="bg-red-100"
        >
          Azad university
        </span>{" "}
        in{" "}
        <span
          onClick={() => {
            console.log("hi");
            setWord("Tehran");
          }}
          >
          Tehran
        </span>
      </p>
      <BioExplaination />
    </div>
  );
}
function BioExplaination() {
  const [word, setWord] = useState("");
 const wordMap = {
   Tehran: "Tehran is a city",
   "Azad university": "Azad university is Big",
 };
return (
    <div className="h-1/3">
      <div className="h-full bg-pink-300 justify-center items-center flex">
        {wordMap[word]}
      </div>
    </div>
  );
}
export default App;
