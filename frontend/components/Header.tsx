import React from 'react'
import Link from 'next/link'
import { GiHummingbird } from 'react-icons/gi'
import { BsChevronDown } from 'react-icons/bs'

const Header = () => {
  return (
    <nav>
        <header>
            <Link href='/' className='logo-container'>
                <GiHummingbird className='logo' />
                <h1>grapher</h1>
            </Link>

            <ul>
                <li className='user'>
                    <a href="#">
                        John Doe
                        <span className="icon">
                            <BsChevronDown />
                        </span>
                    </a>

                    <div className="dropdown-list">
                        <ul>
                            <li>
                                <Link href='/profile'>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link href='/profile/settings'>
                                    Settings
                                </Link>
                            </li>
                            <li>Log Out</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </header>
    </nav>
  )
}

export default Header