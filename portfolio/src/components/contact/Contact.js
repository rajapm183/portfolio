import React, { useState } from "react";
import { Element } from "react-scroll";
import "./Contact.css";
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import CallIcon from "@mui/icons-material/Call";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link } from "react-scroll";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [conformMessage, setConformmessage] = useState("");
  const [loading, setLoding] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoding(true);
      let data = {
        Name: name,
        Email: email,
        Message: message,
      };
      console.log(data);
      let val = await axios.post(
        "https://sheet.best/api/sheets/000c7e4f-3979-4a5a-82cb-3c048d9ce11d",
        data
      );
      setLoding(false);
      if (val.status === 200) {
        setConformmessage("Send Successfull");
        setMessage("");
        setEmail("");
        setName("");
        setTimeout(() => {
          setConformmessage("");
        }, 4000);
      } else {
        setConformmessage("Send Failled");
      }
    } catch (error) {}
  };
  return (
    <Element id="contact">
      <div className="contact">
        <img
          src="./asset/footer-wave-dark.svg"
          alt="footer-wave-dark"
          className="contact-img"
        />
        <div>
          <div className="row  contact-main">
            <div className="col-sm-12 col-md-6 contact-left-container">
              <h1>Connect with me</h1>
              <div>
                <div className="contact-icon">
                  {/* <p className='contact-icon' onClick={() =>window.open("https://wa.me/+919566940955", "_blank")}> <WhatsAppIcon fontSize='medium' /> +91 9566940955</p> */}
                  <p 
                    onClick={() =>
                      window.open("https://github.com/rajapm183", "_blank")
                    }
                  >
                    <GitHubIcon fontSize="medium" /> Github
                  </p>
                  <p
                    onClick={() =>
                      window.open(
                        "https://linkedin.com/in/raja-raman-850b29227",
                        "_blank"
                      )
                    }
                  >
                    <LinkedInIcon fontSize="medium" /> LinkedIn
                  </p>
                  <p
                    onClick={() => window.open("tel://+918667011736", "_blank")}
                  >
                    <CallIcon fontSize="medium" /> +91 8667011736
                  </p>
                  <p className="ss"
                    onClick={() =>
                      window.open("mailto:rajapm183@gmail.com", "_blank")
                    }
                  >
                    <MailIcon fontSize="medium" /> rajapm183@gmail.com
                  </p>
                </div>
                <div>
                  <img
                    src="./asset/balloon.svg"
                    className="balloon"
                    alt="balloon"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <h1>Say Hi</h1>
              <form onSubmit={handleSubmit} className="contact-form">
                <input
                  type="text"
                  name="Name"
                  id="name"
                  placeholder="Name *"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <br />
                <input
                  type="email"
                  name="Email"
                  id="email"
                  placeholder="Email *"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <br />
                <textarea
                  name="Message"
                  id="message"
                  cols="30"
                  rows="5"
                  placeholder="Message *"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  required
                ></textarea>
                <br />
                <div>
                  <button type="submit">
                    {loading ? (
                      <img
                        src="./asset/load.svg"
                        alt="load"
                        style={{
                          color: "green",
                          width: "1rem",
                          maxHeight: "26px",
                          minWidth: "64px",
                          background:"none"
                        }}
                      />
                    ) : (
                      <>
                        Send <SendIcon />
                      </>
                    )}
                  </button>
                  {conformMessage.length > 0 && conformMessage ? (
                    <span>{conformMessage}</span>
                  ) : (
                    <span className="text-danger">{conformMessage}</span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="arrow">
        <Link to="home" spy={true} smooth={true} offset={-100} duration={250}>
          <ArrowUpwardIcon className="arrows" />
        </Link>
      </div>
    </Element>
  );
}

export default Contact;
