import React from 'react'
import Link from 'next/link'
import { GiHummingbird } from 'react-icons/gi'
import { BsChevronDown } from 'react-icons/bs'
import { BiMessageSquareDetail } from 'react-icons/bi'

const Header = () => {
  return (
    <nav>
        <header>
            <Link href='/' className='logo-container'>
                <GiHummingbird className='logo' />
                <h1>grapher</h1>
            </Link>

            <ul>
                <li>
                    <BiMessageSquareDetail className='list-item-icon' />
                </li>
                <li className='user'>
                    <a href="#">
                        John Doe
                        <span className="icon">
                            <BsChevronDown />
                        </span>
                    </a>

                    <div className="dropdown-list">
                        <ul>
                            <li>Profile</li>
                            <li>Settings</li>
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