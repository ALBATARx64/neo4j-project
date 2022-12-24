import React from 'react'
import Image from 'next/image'
import Sidebar from '../../components/Sidebar'
import Post from '../../components/posts/Post'

const index = () => {
  return (
    <section className='feed'>
      <div className="container">
          <Sidebar />          

          <div className="main-feed" style={{padding: '2rem 0'}}>
            <Post image='/images/profile.png' username='Yakoub Houdini' date='Nov 19, 2020' postBody='Lorem ipsum dolor sit amet consectetur adipisicing elit. Et impedit dolore reiciendis amet hic consectetur ab nesciunt, in nostrum unde.' nbrLikes={1800} noEdit />
            <Post image='/images/profile.png' username='Yakoub Houdini' date='Nov 19, 2020' postBody='Lorem ipsum dolor sit amet consectetur adipisicing elit. Et impedit dolore reiciendis amet hic consectetur ab nesciunt, in nostrum unde.' nbrLikes={1800} noEdit />
            <Post image='/images/profile.png' username='Yakoub Houdini' date='Nov 19, 2020' postBody='Lorem ipsum dolor sit amet consectetur adipisicing elit. Et impedit dolore reiciendis amet hic consectetur ab nesciunt, in nostrum unde.' nbrLikes={1800} noEdit />
          </div>

          <div className="new-post">
            <header>
              <div className="img-container">
                <Image src='/images/profile.png' width={50} height={50} alt='profile_picture' />
              </div>
              <h4>Yakoub Hoduini</h4>
            </header>

            <textarea placeholder='What is on yout mind Yakoub?'></textarea>
          
            <div className="btn-container">
              <button>
                Publish
              </button>
            </div>
          </div>
      </div>
    </section>
  )
}

export default index