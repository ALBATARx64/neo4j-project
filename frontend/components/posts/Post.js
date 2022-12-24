import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsThreeDotsVertical, BsHeart, BsBookmark, BsHeartFill, BsBookmarkFill } from 'react-icons/bs'

let formatter = Intl.NumberFormat('en', { notation: 'compact' });

const Post = ({image, username, date, postBody, nbrLikes, noEdit}) => {

    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)

    const [edit, setEdit] = useState(false)

    const hiddenDiv = useRef(null)
    const txt = useRef(null)
    const settingsRef = useRef(null)

    const [val, setVal] = useState('')

    const [dp, setDp] = useState(false)

    const handleFocus = () => {
        setDp(prev => !prev)
    }

    const handleEditClick = () => {
        settingsRef.current.display = 'none'

        if (!edit) {
            setTimeout(() => {
                setEdit(true)
                setTimeout(() => {
                    txt.current.focus()
                }, 2)
            }, 0)
        } else {
            setEdit(false)
        }
    }

    const handleInput = (e) => {
        let content = null

        if (edit) {
            content = e.target.value
            setVal(content)
            txt.current.style.height = `${hiddenDiv.current.getBoundingClientRect().height}px`
        }

        if (e.target.value === '') {
            txt.current.style.height = '20px'
        }
    }

  return (
    <article className='post'>
        <div className="header-container">
            <header>
                <Image src={image} alt='profile_picture' height={50} width={50} />

                <div className="post-user-info">
                    <Link href='/users/john_doe'>
                        <h3>{username}</h3>
                    </Link>
                    <span>{date}</span>
                </div>
            </header>

            {!noEdit && (
                <span className="settings" onClick={handleFocus}>
                <BsThreeDotsVertical />

                {dp && (
                    <div className='settings-dropdown' ref={settingsRef}>
                        <ul>
                            <li onClick={handleEditClick}>Edit</li>
                            <li>Delete</li> 
                        </ul>
                    </div>
                )}
            </span>
            )}
        </div>

        {!edit ? (
            <p className='post-body'>
                {postBody}
            </p>
        ) : (
            <>
                <textarea className='txtstuff' onChange={handleInput} ref={txt}>{postBody}</textarea>
                <div className="btn-container">
                    <button className='btn-cancel' onClick={() => {
                        setEdit(false)
                        setDp(false)
                    }}>Cancel</button>
                    <button>Save</button>
                </div>
                <div className="hiddendiv common" ref={hiddenDiv}>{val}</div>
            </>
        )}

        <div className="reactions">
            <div className={`heart-container ${liked && 'hearted'}`} onClick={() => setLiked(prev => !prev)}>
                <span className="icon heart">
                    {liked ? <BsHeartFill /> : <BsHeart />}
                </span>

                <p>{formatter.format(nbrLikes)}</p>
            </div>

            <span className="icon save" style={saved ? {color: '#1d9bf0'} : {}} onClick={() => setSaved(prev => !prev)}>
                {saved ? <BsBookmarkFill /> : <BsBookmark />}
            </span>
        </div>
    </article>
  )
}

export default Post