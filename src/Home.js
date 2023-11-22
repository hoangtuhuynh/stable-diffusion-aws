import React from "react";
import './Home.css'
import { Link } from "react-router-dom";
import exampleImg from "./banana.jpeg";
const Home = () => {
  return (
    <div>
      <header>
        <h1 style={{ fontSize: '3em' }}>Welcome to Stable Diffusion AI</h1>
      </header>

      <section>
        <h2>About our Service</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </section>

      <section>
        <h2>Services</h2>
        <ul>
          <li>Create AI Generated Image</li>
          <li>Store and categorize Generated Images</li>
          <li>Possible service, create randomly generated prompt instead of user input</li>
        </ul>
      </section>

      <section>
        <h2>Our Github</h2>
        <p>
        https://github.com/hoangtuhuynh/stable-diffusion-aws
          <br />
          
        </p>
      </section>

    <section>
        <img src={exampleImg} alt="Sample Picture"/>
    </section>
        

      <footer>
        <p>
          &copy; AWS Stable Diffusion.{" "}
          <Link to="http://localhost:3000/service">
            <button>Go to Image Creation Service</button>
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Home;
