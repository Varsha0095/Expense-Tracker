import { useContext, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from './Profile.module.css';
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const fullnameInputRef = useRef();
    const photoInputRef = useRef();

    const profileUpdateHandler = (event) => {
        event.preventDefault();

        const enteredFullname = fullnameInputRef.current.value;
        const enteredPhotoUrl = photoInputRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ',{
            method: "POST",
            body: JSON.stringify({
                idToken: authCtx.token,
                displayName: enteredFullname,
                photoUrl: enteredPhotoUrl,
                returnSecureToken: false,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res.data);
            history.replace('/');
        })

    }
    return(
        <>
        <section className={classes.profile}>
            <NavLink to="/profile"></NavLink>
            <Row>
                <Col><h4>Winners never Quit. Quitters never Win!</h4></Col>
                <Col><h6>Your Profile is 64% completed. A complete profile has higher chances of landing a job.</h6></Col>
            </Row>
        </section>
        <form className={classes.form} onSubmit={profileUpdateHandler} >
            <Row>
           <Col><h2>Contact Details</h2></Col>
           <Col><button>Cancel</button></Col>
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
                <button>Update</button>
                </Col>
            </Row>
        </form>
        </>
    )
}

export default Profile;