import "./App.css";

function App() {
  const reward = 10;
  const participants = ["lsjfdlakfs", "asfjlasjdfl", "alsfjlsjd"];
  return (
    <div className="App">
      <div>
        <button className="button">Connect Wallet</button>
      </div>
      <div>
        <div className="title">Jack Pot ! {reward} LION 🪙</div>
        <div className="sub-title">
          Congraturations! You are the winner! claim {reward} LION!
        </div>
      </div>

      <button>Enter</button>

      <div>
        <div>Participants</div>
        {participants.map((participant) => {
          return <div>{participant}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
