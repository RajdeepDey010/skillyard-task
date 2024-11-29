import React, { useEffect, useState } from 'react'

function App() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [filteredVoices, setFilteredVoices] = useState([]);
  const [gender, setGender] = useState('Male');

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      console.log("In usEffct: ", gender)
      setVoices(availableVoices);
      filterVoices(availableVoices, gender);
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, [gender]);

  const filterVoices = (voiceList, selectedGender) => {
    const filtered = voiceList.filter((voice) => {
      return (
        selectedGender === 'Male'
          ? /male|david|google uk english/i.test(voice.name)
          : /female|zira|siri|google uk english/i.test(voice.name)
      );
    });
    console.log("in filterVoices: ", filtered);
    setFilteredVoices(filtered);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSpeak = () => {
    if (text.trim() === '') {
      alert('Please enter some text!');
      return;
    }
    if (!filteredVoices.length) {
      alert('No voice available for the selected option.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = filteredVoices[0];
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h1>text to speech</h1>
      <textarea
        rows="5"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
      ></textarea>

      <div>
        <label>Select Gender: </label>
        <select
          value={gender}
          onChange={handleGenderChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <button
        onClick={handleSpeak}
      >
        Speak
      </button>
    </div>
  )
}

export default App