import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BsChevronRight } from 'react-icons/bs'
import Header from '../../components/Header'

const interestsArr = [
    {
        title: 'Architecture',
        image: 'https://www.demainlaville.com/content/uploads/2017/10/06.jpg'
    },
    {
        title: 'Cars & Vehicules',
        image: 'https://hips.hearstapps.com/es.h-cdn.co/cades/contenidos/55641/brabus-700-widestar-1.jpg'
    },
    {
        title: 'Food & Cooking',
        image: 'https://palmaryfood.com/wp-content/uploads/2021/04/Kool-break.jpg'
    },
    {
        title: 'Books & Reading',
        image: 'https://m.media-amazon.com/images/I/61M1eEsuSML.jpg'
    },
    {
        title: 'Traveling & Tourism',
        image: 'https://i.la-croix.com/600x400/category/tag/Canada/Canada_475042_1671145200000.jpg'
    },
    {
        title: 'Cyber Security',
        image: 'https://cdn-wordpress-info.futurelearn.com/wp-content/uploads/introduction-to-cybersecurity.jpg.optimal.jpg'
    },
    {
        title: 'Programming',
        image: 'https://miro.medium.com/max/1400/0*XIZQUL5vABqU-iH4'
    },
    {
        title: 'AI & Machine Learning',
        image: 'https://www.zadnit.net/wp-content/uploads/2022/12/chatgpt-%D9%85%D8%A7-%D9%87%D9%88.jpg'
    },
    {
        title: 'Hardware & Iot',
        image: 'https://www.notebookcheck.biz/fileadmin/Notebooks/News/_nc3/Raspberry_Pi_4_Model_B.jpg'
    },
    {
        title: 'International Politics',
        image: 'https://ca-times.brightspotcdn.com/dims4/default/8f78103/2147483647/strip/true/crop/6000x3999+0+1/resize/2000x1333!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F09%2Fe4%2Fb721aad14ce69f0b633518dd758d%2F920443-fg-0303-ukrainecrisis-mwy-7035.jpg'
    },
    {
        title: 'Movies & Cinema',
        image: 'https://img.etimg.com/thumb/msid-78397270,width-1200,height-900,imgsize-908272,overlay-etpanache/photo.jpg'
    },
    {
        title: 'Animals & Pets',
        image: 'https://static01.nyt.com/images/2022/11/29/science/00tb-cats1/00tb-cats1-mediumSquareAt3X.jpg'
    },
    {
        title: 'Sports & Athletics',
        image: 'https://ibsasport.org/wp-content/uploads/2020/12/swimming-2.jpg'
    },
    {
        title: 'Quantum Physics',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_22/2451826/180601-atomi-mn-1540.jpg'
    },
    {
        title: 'Rocket Science',
        image: 'https://media.sudouest.fr/11097238/1000x500/15715412.jpg?v=1653728200'
    },
    {
        title: 'Gaming & Consoles',
        image: 'https://cdn.mos.cms.futurecdn.net/rJ6wgSVrEVGzE7Zr5RfSBg.jpg'
    },
    {
        title: 'Malwares & Trojans',
        image: 'https://www.titanhq.fr/wp-content/uploads/2019/11/tendances-malwares-surveiller-2020-1080x675.jpeg'
    },
    {
        title: 'Graphic Design',
        image: 'https://images.ctfassets.net/lzny33ho1g45/3esMPEXfTe4AjvG0eB4MoT/5dde2497927a7da42a0e0daa0f3012c8/best-social-media-graphic-design-apps-00-hero.png?w=1520&fm=jpg&q=30&fit=thumb&h=760'
    },
    {
        title: 'Gardening & Earth',
        image: 'https://f.site-cdn.net/ec4eed27c5/1200-800-social.jpg'
    },
    {
        title: 'Chess',
        image: 'https://images.ctfassets.net/3s5io6mnxfqz/wfAz3zUBbrcf1eSMLZi8u/c03ac28c778813bd72373644ee8b8b02/AdobeStock_364059453.jpeg'
    },
    {
        title: 'Crime Investigating',
        image: 'https://cdn.shopify.com/app-store/listing_images/50b8b1b7c0cf99277eb03f7eca2fab57/icon/CNHHsqv0lu8CEAE=.png'
    },
    {
        title: 'Hunting & Phishing',
        image: 'https://www.mayoclinichealthsystem.org/-/media/national-files/images/hometown-health/2020/hunter-silhouette-on-sunset.jpg?h=370&w=660&la=en&hash=50789CF1B025D2390D591DDFDBFF5CDE'
    },
]

const interests = () => {
    const [interests, setInterests] = useState([])
    const [tmpArr, setTmpArr] = useState([])

  return (
    <section className='interests'>
        <footer className="footer">Made by <u>hex-dump</u> development team</footer>
        <Header />
        <div className="container">
            <div className="main-content">
            <h1>Pick up your interests</h1>
            <p>Your feed will grow bigger by the interests you choose from here and it will improve with time depending on your reactions and the people you choose to follow</p>

            <div className="main-interests-list">
                {interestsArr.map((interest, index) => {
                    return (
                        <article className={`interest ${interests.includes(interest.title) && 'selected'}`} key={index} onClick={() => {
                            if (!interests.includes(interest.title)) {
                                setInterests([...interests, interest.title])
                            } else {
                                interests.map(item => {
                                    if (item !== interest.title) {
                                        tmpArr.push(item)
                                    }
                                })

                                setInterests(tmpArr)

                                setTmpArr([])
                            }
                        }}>
                            <Image src={interest.image} alt={interest.title} width={50} height={40} />
                            <span>{interest.title}</span>
                        </article>
                    )
                })}
            </div>

            <div className="btn-container">
                <button style={interests.length === 0 ? {userSelect: 'none', pointerEvents: 'none', opacity: '0.5'} : {}}>
                    Finish({interests.length})
                    <span className="icon">
                        <BsChevronRight />
                    </span>
                </button>
            </div>
            </div>
        </div>
    </section>
  )
}

export default interests