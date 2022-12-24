import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GiHummingbird } from 'react-icons/gi'
import { HiHome } from 'react-icons/hi'
import { BsBookmarkFill } from 'react-icons/bs'
import { IoExit } from 'react-icons/io5'
import { FaUserAstronaut } from 'react-icons/fa'
import { RiSettingsFill } from 'react-icons/ri'

const Sidebar = () => {
    const router = useRouter()
    const pathname = router.pathname

  return (
    <div className="sidebar">
            <Link href='/' className='logo-container'>
                <GiHummingbird className='icon' />
                <h1>grapher</h1>
            </Link>

            <ul>
              <li style={pathname.replace('/', '') === 'feed' ? {color: '#1d9bf0'} : {}}>
                <Link href='/feed'>
                  <HiHome className='icon' />
                  Home
                </Link>
              </li>
              <li style={pathname.replace('/', '') === 'bookmarks' ? {color: '#1d9bf0'} : {}}>
                <Link href='/bookmarks'>
                  <BsBookmarkFill className='icon' />
                  Bookmarks
                </Link>
              </li>
              <li style={pathname.replace('/', '') === 'profile' ? {color: '#1d9bf0'} : {}}>
                <Link href='/profile'>
                  <FaUserAstronaut className='icon' />
                  Profile
                </Link>
              </li>
              <li style={pathname.replace('/', '') === 'profile/settings' ? {color: '#1d9bf0'} : {}}>
                <Link href='/profile/settings'>
                  <RiSettingsFill className='icon' />
                  Settings
                </Link>
              </li>
              <li>
                <IoExit className='icon' />
                Log Out
              </li>
            </ul>
          </div>
  )
}

export default Sidebar