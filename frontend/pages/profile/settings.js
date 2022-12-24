import Image from 'next/image'
import React from 'react'
import Header from '../../components/Header'

const settings = () => {
  return (
    <section className='profile-settings'>
      <Header />

      <div className="container">
        <div className="main-settings">
          <header>
            <h4>Public Profile Settings</h4>
          </header>

          <div className="settings">
            <article>
              <div className='main-info'>
                <h5>Your Username</h5>
                <p>This is your URL namespace within Grapher</p>
                <input type="text" placeholder='john_doe' value='Yakoub Houdini' />
              </div>

              <div className="info">
                <p>Please use 20 characters at maximum</p>
                <button>Save</button>
              </div>
            </article>

            <article>
              <div className='main-info'>
                <h5>Your Email</h5>
                <p>Please enter the email address you want to use to log in with Grapher</p>
                <input type="email" placeholder='john_doe@example.com' value='john_doe@gmail.com' />
              </div>

              <div className="info">
                <p>We will email you to verify the change.</p>
                <button>Save</button>
              </div>
            </article>

            <article>
              <div className='main-info'>
                <h5>Your Password</h5>
                <p>This is the password you use to log in with Grapher</p>
                
                <div className="form-control">
                  <label htmlFor="">Current Password</label>
                  <input type="password" />
                </div>

                <div className="form-control">
                  <label htmlFor="">New Password</label>
                  <input type="password" />
                </div>
              </div>

              <div className="info">
                <p>At least one lowercase, uppercase, digit and a sepcial character</p>
                <button>Save</button>
              </div>
            </article>

            <article>
              <div className='main-info picture'>
                <div className="section-info">
                  <h5>Your Picture</h5>
                  <p>Click on the picture to upload a custom one from your files.</p>
                </div>

                <div className="img-container">
                  <label htmlFor="picture_btn">
                    <Image src='/images/profile.png' height={60} width={60} alt='profile_picture' />
                    <input type="file" id='picture_btn' style={{display: 'none'}} />
                  </label>
                </div>
              </div>

              <div className="info">
                <p>It is highly recommeneded to have your actual picture.</p>
                <button>Save</button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default settings