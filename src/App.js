import { useState, useEffect } from "react";
import "./App.css";
import getInvestors from "./FirebaseFunctions";
import Container from "./Components/StyledContainer";

function App() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const investors = await getInvestors();
      console.log(investors);
      setData(investors);
    };
    getData();
  }, []);
  return (
    <div className="App">
      <Container color={"blue"}>
        <h3>Hello World</h3>
      </Container>
    </div>
  );
}

export default App;
