import React from "react";
import './Home.css'
import { Link } from "react-router-dom";
import exampleImg from "./exampleF.jpg";
const Home = () => {
  return (
    <div>
      <header className = "homeHeader">
        <h1 className="homeH1">
          Welcome to <br></br>Stable Diffusion AI
          </h1>
      </header>

      

      <section className="homeServices">
        <h2 className="homeH2">Services</h2>
        <ul>
          <li>Create AI Generated Image</li>
          <li>Store and categorize Generated Images</li>
    
        </ul>
      </section>

    <section name = "picSection">
        <img src={exampleImg} alt="Sample"/>
    </section>
    {/* ap  */}

      <footer className="homeFooter">
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
