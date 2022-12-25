import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BsCalendar3, BsChevronLeft } from 'react-icons/bs'
import Post from '../../components/posts/Post'

const index = () => {
    const router = useRouter()

  return (
    <section className='profile'>
        <div className="container">
            <div className="top-profile">
                <span className="icon" onClick={() => router.back()}>
                    <BsChevronLeft />
                </span>
                <div className="img-container">
                    <Image src='/images/profile.png' width={100} height={100} alt='profile_picture' />             
                </div>   
            </div>
            <div className="user-info">
                <h2>Yakoub Houdini</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolores cumque sunt.</p>

                <div className='followers-followees'>
                    <article>
                        <strong>3</strong>
                        <span>Following</span>
                    </article>
                    <article>
                        <strong>27</strong>
                        <span>Followers</span>
                    </article>
                </div>

                <div className="join-date">
                    <BsCalendar3 />
                    Joined June 2020
                </div>

                {/* this button should appear conditionally */}
                <div className="btn-container">
                    <button>Follow</button>
                </div>
            </div>

            <div className="posts">
                <Post image='/images/profile.png' username='Yakoub Houdini' date='Nov 19, 2020' postBody='Lorem ipsum dolor sit amet consectetur adipisicing elit. Et impedit dolore reiciendis amet hic consectetur ab nesciunt, in nostrum unde.' nbrLikes={1800} />
            
                <Post image='/images/profile.png' username='Yakoub Houdini' date='Oct 05, 2020' postBody='Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque laudantium dicta inventore aperiam ipsam quo incidunt ad nulla labore, ex excepturi hic necessitatibus doloremque consectetur harum maxime aut. Ab id unde maxime est praesentium exercitationem tempora accusamus? Quaerat, nisi rerum.' nbrLikes={19000} />
            </div>
        </div>
    </section>
  )
}

export default index