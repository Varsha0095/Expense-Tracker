import { useContext, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./Profile.module.css";
import AuthContext from "../../store/auth-context";

const Profile = () => {
  const authCtx = useContext(AuthContext);

  const fullnameInputRef = useRef();
  const photoInputRef = useRef();

  const profileUpdateHandler = (event) => {
    event.preventDefault();

    const enteredFullname = fullnameInputRef.current.value;
    const enteredPhotoUrl = photoInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: enteredFullname,
          photoUrl: enteredPhotoUrl,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Updation Failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        alert("Profile Updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <section className={classes.profile}>
        <NavLink to="/profile"></NavLink>
        <Row>
          <Col>
            <h4>Winners never Quit. Quitters never Win!</h4>
          </Col>
          <Col>
            <h6>
              Your Profile is 64% completed. A complete profile has higher
              chances of landing a job.
            </h6>
          </Col>
        </Row>
      </section>
      <form className={classes.form}>
        <Row>
          <Col>
            <h2>Contact Details</h2>
          </Col>
          <Col>
            <button>Cancel</button>
          </Col>
        </Row>
        <Row>
          <Col className={classes.control}>
            <label htmlFor="name">Full Name:</label>
            <input id="name" type="text" ref={fullnameInputRef} />
          </Col>
          <Col className={classes.control}>
            <label htmlFor="photo">Profile Photo URL</label>
            <input id="photo" type="text" ref={photoInputRef} />
          </Col>
        </Row>
        <Row>
          <Col className={classes.control}>
            <button onClick={profileUpdateHandler}>Update</button>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default Profile;

// fetch(
//     'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ',
//     {
//         method: "POST",
//         body: JSON.stringify({
//             idToken: authCtx.token,
//         }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }).then((response) => {
//         if(response.ok){
//             return response.json();
//         }else{
//             return response.json().then((data) => {
//                 let errorMessage = 'fetching failed!'
//                 throw new Error(errorMessage);
//             })
//         }
//     }).then((data) => {
//         console.log(data);
//     }).catch((err) => {
//         alert(err.message);
//     })
