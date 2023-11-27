import React from "react";
import './Home.css'
import { Link } from "react-router-dom";
import exampleImg from "./example.jpg";
const Home = () => {
  return (
    <div>
      <header>
        <h1 style={{ fontSize: '3em', textIndent: '-350px', marginLeft: '100px'}}>
          Welcome to <br></br>Stable Diffusion AI
          </h1>
      </header>

      

      <section>
        <h2>Services</h2>
        <ul>
          <li>Create AI Generated Image</li>
          <li>Store and categorize Generated Images</li>
          <li>Possible service, create randomly generated prompt instead of user input</li>
        </ul>
      </section>

    <section name = "picSection">
        <img src={exampleImg} alt="Sample Picture"/>
    </section>
        

      <footer>
        <p>
          &copy; AWS Stable Diffusion.{" "}
          <Link to="https://github.com/hoangtuhuynh/stable-diffusion-aws">
            <button>Check our GitHub</button>
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Home;
