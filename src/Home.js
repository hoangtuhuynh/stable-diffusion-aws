import React from "react";
import './css_mark/Home.css'
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

      
      {/* Might just not need to list services */}
      {/* <section className="homeServices">
        <h2 className="homeH2">Services</h2>
        <ul>
          <li>Create AI Generated Image</li>
          <li>Store and categorize Generated Images</li>
    
        </ul>
      </section> */}

    <section name = "picSection">
        <img src={exampleImg} alt="Sample"/>
    </section>
    {/* ap  */}

    {/* optional second button to go to service, need to fix link  */}
    {/* <section name = "serviceButton">
      <Link to="http://localhost:3000/service">
            <button class="button-64" role="button"><span class="text">Image Creation Service</span></button>

      </Link>
    </section> */}

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
