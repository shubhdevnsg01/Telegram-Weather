import { useState,useEffect } from 'react';
import {GoogleLogin} from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import {gapi} from  'gapi-script'
import './Login.css'
import logo from './images/icon1.png'


const clientId='439692708294-6pg2tvo39vt3cl83epdot67a804js7lq.apps.googleusercontent.com'

const Login = () =>  {
  
    const [flag,setflag]=useState(false);
    const[name,setname]=useState();
    const history =  useNavigate ();
    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: '439692708294-6pg2tvo39vt3cl83epdot67a804js7lq.apps.googleusercontent.com',
            scope: 'email',
          });
        }
        gapi.load('client:auth2', start);
      }, []);
    
    const onSuccess =(res)=>{
        setname(res.profileObj["name"])
        console.log("Login successful",res.profileObj)
        history('/dashboard')
        setflag(true);
       console.log("dashboard")
       
        
    }
    const onFailure =(res)=>{
        console.log("Login successful",res)
    }
    return(
        <>
        <div>
        {flag ?(
            history('/dashboard')
        ):(
            <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={false}
            render={(renderProps) => (
                <button
                  className="google-signin-btn"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    className="google-signin-icon"
                    src={logo}  /* Replace with the actual path to your Google icon image */
                  />
                  <span className="google-signin-text">Sign in with Google</span>
                </button>
              )}
            />
        )

        }
        </div>
        </>
    )
}
export default Login