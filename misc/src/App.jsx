import { useState } from "react";

const App = () => {
  let [count, setCount] = useState(0);
  const handleDecrement = () => {
    setCount((prev)=>prev-1);
  };
  const handleIncrement = () => {
    setTimeout(()=>{
      setCount((prev)=>prev+1);
    },2000)
  };
  return (
    <div>
      <button onClick={handleDecrement}>Decrease</button>
      {count}
      <button onClick={handleIncrement}>Increase</button>
    </div>
  );
};
export default App;
