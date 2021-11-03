import React, { useState } from 'react'
import './login.css'
import validateInfo from './validate';
import validationInfo from './validation';
import image from './signup.png';
import { useHistory } from 'react-router';
import { axioss } from '../api/api';
// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
// import TwitterLogin from 'react-twitter-auth';

function Login() {
    const history = useHistory();
    const [click, setclick] = useState(false);/*change state for signup or signin*/
    const [Name, setName] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [passshow, setpassshow] = useState(false)
    const [conpassshow, setconpassshow] = useState(false)
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [error, seterror] = useState([])
    const [err, seterr] = useState([])
    const [status, setstatus] = useState(false)
    const [success, setsuccess] = useState("")
    function eyepasstoggle() {
        setpassshow(!passshow);
    }
    function eyeconpasstoggle() {
        setconpassshow(!conpassshow);
    }
    // for password paste
    const passfield = document.getElementById('passfield');
    // passfield.onpaste= e =>e.preventDefault();
    if (passfield != null)
        passfield.addEventListener('paste', e => e.preventDefault());


    // for login 
    const submitlogin = (e) => {
        e.preventDefault();
        const data = validationInfo(email, password);
        console.log(data);
        seterr(data);
        if (Object.keys(data).length === 0) {
            const newuser = { email: email, password: password }
            axioss({ method: 'post', url: '/login', data: newuser }).then((res) => {
                let token = res.data.token;
                localStorage.setItem('Token', "Bearer " + token);
                // console.log(res);
                history.push('/Home');
            }).catch((err) => {
                console.log("SAS", err);
                setsuccess("Invalid Email or Password!");
                setstatus(true)
                setTimeout(() => {
                    setsuccess("")
                    setstatus(false)
                }, 800);
            })
            setemail("");
            setpassword("");
        }
    }

    // // for new user

    const register = (e) => {
        e.preventDefault();
        const data = validateInfo(email, Name, password, confirmpassword, phone);
        seterror(data);
        if (Object.keys(data).length === 0) {
            const newentry = { email: email, password: password, name: Name, confirm_password: confirmpassword, mobile: phone }
            axioss({ method: 'post', url: '/signup', data: newentry }).then((res) => {
                // let token = res.data.token;
                localStorage.setItem("Savedphone", phone);
                setclick(false);
                console.log(res);
            }).catch((err) => {
                console.log(err);
                setsuccess("USER NOT SUCCESSFULLY REGISTER");
                setstatus(true)
                setTimeout(() => {
                    setsuccess("")
                    setstatus(false)
                }, 500);
            })
            setpassword("");
            setconfirmpassword("");
            setName("");
            setemail("");
            setphone("")
        }
    }

    // function for change signup and signin page
    const handleclick = () => {
        setclick(!click);
    }
    const handlesignin = () => {
        setclick(false)
    }

    // GoogleLogin
    // const googleSuccess = async (res) => {
    //         console.log(res);
    // };

    // const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

    return (
        <div className='login'>
            <div id={status ? "status" : ""}>{success}</div>
            <div className={click ? '-container' : '-container onclick'}>
                {/* left-part section  */}
                <div className="left">
                    {/* left-part signup section  */}
                    <div className="left-signup">
                        <h1>WELCOME TO</h1>
                        <h1>CODE AND BOTS</h1>
                        <div className="image">
                            <img src={image} alt="" />
                        </div>
                        <h3>LET'S GET STARTED</h3>
                    </div>
                    {/* left-part signup section  */}
                    {/* left-part signin section  */}
                    <div className="left-signin">
                        <div className="image">
                            <div>
                                <h1 className='left-heading'>WELCOME BACK</h1>
                            </div>
                            <img src="https://www.pngitem.com/pimgs/m/127-1272138_best-web-app-development-company-in-uk-india.png" alt="" />
                        </div>
                    </div>
                    {/* left-part signin section  */}
                </div>
                {/* left-part section  */}
                {/* right-part section  */}
                <div className="right">
                    {/* right-part signup section  */}
                    <div className="right-signup">
                        <h1>CREATED AN ACCOUNT</h1>
                        <div className="form-panel">
                            <form action="" className='form' onSubmit={register}>
                                <div>{error.name ?
                                    <input type="text" placeholder='Student Name' value={Name} style={{ borderBottomColor: "red" }} onChange={(e) => setName(e.target.value)} /> :
                                    <input type="text" placeholder='Student Name' value={Name} onChange={(e) => setName(e.target.value)} />}
                                    {error.name && <p style={{ color: "red", textAlign: 'initial', fontSize: '12px', fontWeight: 'bold' }}>{error.name}</p>}
                                </div>
                                <div>{error.email ?
                                    <input type="text" placeholder='Email Address' value={email} style={{ borderBottomColor: "red" }} onChange={(e) => setemail(e.target.value)} /> :
                                    <input type="text" placeholder='Email Address' value={email} onChange={(e) => setemail(e.target.value)} />}
                                    {error.email && <p style={{ color: "red", textAlign: 'initial', fontSize: '12px', fontWeight: 'bold' }}>{error.email}</p>}
                                </div>
                                <div>{error.phone ?
                                    <input type="text" placeholder='Phone no.' value={phone} maxLength="10" style={{ borderBottomColor: "red" }} onChange={(e) => setphone(e.target.value)} /> :
                                    <input type="text" placeholder='Phone no.' value={phone} maxLength="10" onChange={(e) => setphone(e.target.value)} />}
                                    {error.phone && <p style={{ color: "red", textAlign: 'initial', fontSize: '12px', fontWeight: 'bold' }}>{error.phone}</p>}
                                </div>

                                <div>
                                    {error.password ?
                                        <div style={{ display: 'flex' }}>
                                            <input type={passshow ? "" : "password"} placeholder="Password" value={password} style={{ borderBottomColor: "red" }} onChange={(e) => setpassword(e.target.value)} />
                                            {passshow ? <i class="far fa-eye-slash eyestyle" onClick={eyepasstoggle} style={{ borderBottomColor: "red" }}></i> : <i class="far fa-eye eyestyle" onClick={eyepasstoggle} style={{ borderBottomColor: "red" }}></i>}
                                        </div> :
                                        <div style={{ display: 'flex' }}>
                                            <input type={passshow ? "" : "password"} placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                                            {passshow ? <i class="far fa-eye-slash eyestyle" onClick={eyepasstoggle} ></i> : <i class="far fa-eye eyestyle" onClick={eyepasstoggle}></i>}
                                        </div>}
                                    {error.password && <p style={{ color: "red", textAlign: 'initial', fontSize: '12px', fontWeight: 'bold' }}>{error.password}</p>}
                                </div>
                                <div>
                                    {error.confirmpassword ?
                                        <div style={{ display: 'flex' }}>
                                            <input type={conpassshow ? "" : "password"} id='passfield' placeholder="Confirm Password" style={{ borderBottomColor: "red" }} value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} />
                                            {conpassshow ? <i class="far fa-eye-slash eyestyle" style={{ borderBottomColor: "red" }} onClick={eyeconpasstoggle}></i> : <i class="far fa-eye eyestyle" style={{ borderBottomColor: "red" }} onClick={eyeconpasstoggle} ></i>}
                                        </div> :
                                        <div style={{ display: 'flex' }}>
                                            <input type={conpassshow ? "" : "password"} id='passfield' placeholder="Confirm Password" onPaste='return false;' onDrop='return false;' value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} />
                                            {conpassshow ? <i class="far fa-eye-slash eyestyle" onClick={eyeconpasstoggle}></i> : <i class="far fa-eye eyestyle" onClick={eyeconpasstoggle} ></i>}
                                        </div>}
                                    {/* <input type="" placeholder="Confirm Password" value={confirmpassword}  onChange={(e) => setconfirmpassword(e.target.value)} /> */}
                                    {error.confirmpassword && <p style={{ color: "red", textAlign: 'initial', fontSize: '12px', fontWeight: 'bold' }}>{error.confirmpassword}</p>}
                                </div>

                                <button className="btn" type='submit'>SIGN UP</button>
                                <h4><span>OR</span></h4>
                                <div className="icons">
                                    <div className='icon'>
                                        <i className="fab fa-google"></i>
                                    </div>
                                    <div className='icon'>
                                        <i className="fab fa-facebook-f"></i>
                                    </div>
                                    <div className='icon'>
                                        <i className="fab fa-twitter"></i>
                                    </div>
                                </div>
                                {/* <div className="icons">
                                    <GoogleLogin
                                        clientId="186206579833-11c1rjf1ks532p45otfuq6l569ukcrhj.apps.googleusercontent.com"
                                        render={(renderProps) => (
                                            <div className='icon'color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled}  variant="contained">
                                                <i className="fab fa-google"></i>
                                            </div>
                                        )}
                                        // buttonText="" 
                                        onSuccess={googleSuccess}
                                        onFailure={googleError}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                    {/* <FacebookLogin
                                        appId="1088597931155576"
                                        autoLoad={true}
                                        fields="name,email,picture"
                                        // callback={responseFacebook}
                                        render={renderProps => (<div className='icon'>
                                            <i className="fab fa-facebook-f"></i>
                                        </div>
                                        )}
                                    /> */}
                                {/* <div className='icon'>
                                        <i className="fab fa-facebook-f"></i>
                                    </div>
                                    
                                    <TwitterLogin
                                        loginUrl="http://localhost:4000/api/v1/auth/twitter"
                                        // onFailure={onFailed}
                                        // onSuccess={onSuccess}
                                        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
                                        // customHeaders={customHeader}
                                        className='twitter'
                                    >
                                        <div className='icon'>
                                            <i className="fab fa-twitter"></i>
                                        </div>
                                    </TwitterLogin>
                                </div> */}
                                <p className="already-acc" onClick={handlesignin}>already have a account?</p>
                                <h3 onClick={handleclick}>SIGN IN</h3>
                            </form>
                        </div>
                    </div>
                    {/* right-part signup section  */}
                    {/* right-part signin section  */}
                    <div className="right-signin">
                        <h1>LOGIN YOUR ACCOUNT</h1>
                        <div className="form-panel">
                            <form action="" className='form' onSubmit={submitlogin}>
                                {/* <input type="text" placeholder='Email Address' value={email} onChange={(e) => setemail(e.target.value)}/> */}
                                <div>
                                    {err.email ?
                                        <input type="text" placeholder='Email Address' value={email} style={{ borderBottomColor: "red" }} onChange={(e) => setemail(e.target.value)} /> :
                                        <input type="text" placeholder='Email Address' value={email} onChange={(e) => setemail(e.target.value)} />}
                                    {err.email && <p style={{ color: "red", textAlign: 'initial', fontSize: '12px', fontWeight: 'bold' }}>{err.email}</p>}
                                </div>
                                <div>
                                    {err.password ?
                                        <input type="password" placeholder="Password" value={password} style={{ borderBottomColor: "red" }} onChange={(e) => setpassword(e.target.value)} /> :
                                        <input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                                    }
                                    {err.password && <p style={{ color: "red", textAlign: 'initial', fontSize: '12px', fontWeight: 'bold' }}>{err.password}</p>}
                                </div>
                                {/* <input type="password" placeholder="Password"  value={password} onChange={(e) => setpassword(e.target.value)}/> */}
                                <h5 >FORGET PASSWORD?</h5>
                                <button className="btn" type='submit'>SIGN IN</button>
                                <h4><span>OR</span></h4>
                                <div className="icons">
                                    <div className='icon'>
                                        <i className="fab fa-google"></i>
                                    </div>
                                    <div className='icon'>
                                        <i className="fab fa-facebook-f"></i>
                                    </div>
                                    <div className='icon'>
                                        <i className="fab fa-twitter"></i>
                                    </div>
                                </div>
                                <p className="already-acc">already have a account?</p>
                                <h3 onClick={handleclick}>SIGN UP</h3>
                            </form>
                        </div>
                    </div>
                    {/* right-part signin section  */}
                </div>
                {/* right-part section  */}

            </div>
        </div>
    )
}

export default Login