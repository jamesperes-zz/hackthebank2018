import React from "react";
import { Container } from "semantic-ui-react";
import HomeView from "./home_view";

const Home = () => {
  return (
    <div>
      <Container style={{ marginBottom: 80, maxWidth: "1100px" }}>
        <h1
          style={{
            color: "#FF664D",
            marginTop: "8%",
            marginBottom: "4%",
            fontFamily: "ODIN"
          }}
        >
          Teste
        </h1>
        <HomeView />
      </Container>
    </div>
  );
};

export default Home;
