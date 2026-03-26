import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { useAsgardeo } from "@asgardeo/react";

function App() {
  const { isSignedIn, signIn, signOut, getAccessToken } = useAsgardeo();

  if (!isSignedIn) {
    return (
      <>
        <h2>Please sign in to access this app</h2>
        <button onClick={() => signIn()}>Sign In</button>
      </>
    );
  }

  return (
    <div>
        <Header />
        <Body />
        <hr/>
        <Footer />
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

export default App;