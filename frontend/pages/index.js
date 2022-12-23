import { useState, useEffect, useRef } from 'react'
import { GiHummingbird } from 'react-icons/gi'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const [validLogin, setValidLogin] = useState(false)
  
  const [agree, setAgree] = useState(false)
  const [valid, setValid] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  useEffect(() => {
    if (username && email && password && confirmPassword && (password === confirmPassword) && agree) {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email) && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)) {
        setValid(true)
      }
    } else if (!isLogin) {
      setValid(false)

      if (email && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
        emailRef.current.style.border = '1px solid #ff000069' // red
      } else if (email && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
        emailRef.current.style.border = '1px solid #0080007b' // green
      } else {
        emailRef.current.style.border = '1px solid #6262635e' // default
      }

      if (password && !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)) {
        passwordRef.current.style.border = '1px solid #ff000069'
      } else if (password && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)) {
        passwordRef.current.style.border = '1px solid #0080007b'
      } else {
        passwordRef.current.style.border = '1px solid #6262635e'
      }
      
      if (confirmPassword && (confirmPassword !== password)) {
        confirmPasswordRef.current.style.border = '1px solid #ff000069'
      } else if (confirmPassword && (confirmPassword === password)) {
        confirmPasswordRef.current.style.border = '1px solid #0080007b'
      } else {
        confirmPasswordRef.current.style.border = '1px solid #6262635e'
      }
    } else if (isLogin) {
      emailRef.current.style.border = '1px solid #6262635e'
      passwordRef.current.style.border = '1px solid #6262635e'
    }
  }, [username, email, password, confirmPassword, agree])

  useEffect(() => {
    if (email && password) {
      setValidLogin(true)
    } else {
      setValidLogin(false)
    }
  }, [email, password])

  return (
    <section className="main-page">
      <div className="sider-container">
        <div className="sider">
          <div className="content">
            <h1>Where we are all connected</h1>
            <h3>We are all just a bunch of nodes in a big graph with relationships!</h3>
            <span className="icon">
              <GiHummingbird />        
            </span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <footer className="footer">
          Made by <u>hex-dumps</u> development team
        </footer>
        <div className="container">
          <form>
           <div className="form-container">
            <div className="title">
              <h2>{isLogin ? 'Authenticate Account' : 'Create a new account'}</h2>
              <p className='para'>Enjoy the world of intelligent posts recommendation and get to know new ideas that might fall into your circle</p>
            </div>
            {!isLogin && (
                <div className="form-control">
                  <label htmlFor="">username</label>
                  <input type="text" placeholder='john_doe' onChange={(e) => setUsername(e.target.value)} />
              </div>
              )
              }
            <div className="form-control">
                <label htmlFor="">email</label>
                <input type="email" pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$" placeholder='john_doe@example.com' onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
              </div>
              <div className="form-control">
                <label htmlFor="">password</label>
                <input type="password" placeholder='at least one lowercase, uppercase, digit and special char' onChange={(e) => setPassword(e.target.value)} ref={passwordRef} />
              </div>
              {!isLogin && (
                <div className="form-control">
                  <label htmlFor="">confirm password</label>
                  <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} ref={confirmPasswordRef} />
              </div>
              )
              }
              {!isLogin && (
                <div className="form-control check">
                  <input type="checkbox" id="regulations" onChange={(e) => setAgree(e.target.checked)} />
                  <label htmlFor="regulations">I agree to the list of regulations</label>
              </div>
              )
              }
              {isLogin && (
                <span className='link'>Don&apos;t have an account? <strong onClick={() => setIsLogin(false)}>Register</strong></span>
              )}
              {!isLogin && (
                <span className='link'>Already have an account? <strong onClick={() => setIsLogin(true)}>Log In</strong></span>
              )}
              {isLogin && (
                <div className="form-control">
                <button style={!validLogin ? {userSelect: 'none', pointerEvents: 'none', opacity: '0.6'} : {}}>Sign In</button>
              </div>
              )}
              {!isLogin && (
                <div className="form-control">
                <button style={!(agree && valid) ? {userSelect: 'none', pointerEvents: 'none', opacity: '0.6'} : {}}>Sign Up</button>
              </div>
              )}
           </div>
          </form>
        </div>
      </div>
    </section>
  )
}
