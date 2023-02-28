const banks = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];


const banksTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const soundsName = {
heaterKit: "Heater Kit",
smoothPianoKit: "Smooth Piano Kit"
};
const soundsGroup = {
heaterKit: banks,
smoothPianoKit: banksTwo
}

function MyComponent() {
  const [recording, setRecording] = React.useState("");
  const [volume, setVolume] = React.useState(0.5);
  

  const BankControl = ({changeBank}) => (
    <div className="control">
      <button style={changeColor === true ? {backgroundColor: 'blue', color: 'white', marginTop: 10, padding: 10 } : {backgroundColor: 'green', color: 'white', marginTop: 10, padding: 10 }} onClick={changeBank}>Change bank</button>
      </div>
  )
    
  const [soundType, setSoundType] = React.useState("heaterKit");
  
  const [sounds, setSounds] = React.useState(soundsGroup[soundType])
  const [changeColor, setChangeColor] = React.useState(false)
  

  const changeBank = () => {
      if (soundType === "heaterKit") {
        setSoundType("smoothPianoKit")
        setSounds(soundsGroup.smoothPianoKit)
        
      } else {
        setSoundType("heaterKit")
        setSounds(soundsGroup.heaterKit)
        
      }
      setChangeColor(!changeColor)
  
  }

  
return (
<div id="drum-machine" className="bg-secondary min-vh-100 text-white">
  <div id="display" className="text-center">
    {sounds.map(item => (
    <Pad key={item.id} item={item} volume={volume} sounds={sounds} setRecording={setRecording}/>  
    ))}
<br />
<h3>Volume</h3>
   <input type="range" step="0.01" onChange={(event) => setVolume(event.target.value)} value={volume} max="1" min="0" className="w-25"/>
   <h3>{recording}</h3>
      <BankControl  changeBank={changeBank}/>

   </div>
</div>

)
}
function Pad({item, volume, setRecording, sounds}) {

const [active, setActive] = React.useState(false)


React.useEffect(() => {
  document.addEventListener("keydown", handleKeyPress)
  return ()  => {
    document.removeEventListener("keydown", handleKeyPress)
  }
},[]);

const handleKeyPress = (event) => {
if (event.keyCode === item.keyCode) {
  toggleSound();
}
}

 const toggleSound = () => {
    const audioFile = document.getElementById(item.keyTrigger);
    setActive(true); 
    setTimeout(() => setActive(false), 300)
    audioFile.currentTime = 0; 
    audioFile.volume = volume;
    audioFile.play();
    setRecording(() => item.id + " ");
  }

 



  return (
    <div onClick={toggleSound} id="keyTrigger" className ={`drum-pad btn btn-primary  p-4 m-3 ${active && "btn-danger"}`
    }>
      <audio id={item.keyTrigger} className="clip" src={item.url}></audio>
      {item.keyTrigger}
    
      </div>
    
  )
  

  
}


ReactDOM.render(<MyComponent />, document.getElementById('app'))