import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { CssVarsProvider } from "@mui/joy/styles";
import { Button, TextField } from "@mui/joy";

function App() {
  const [count, setCount] = useState(0);

  return (
    <CssVarsProvider>
      <TextField placeholder="Enter private key" />
    </CssVarsProvider>
  );
}

export default App;
