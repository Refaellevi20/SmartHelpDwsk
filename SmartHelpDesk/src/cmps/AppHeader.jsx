import { useSelector } from 'react-redux'
import { NavMenu } from './NavMenu.jsx'
import levixLogo from '../assets/imgs/levix.png'
import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { FaCreditCard, FaShoppingCart } from 'react-icons/fa'

export function AppHeader({ onQuickBuy, onSelectImages }) {
  const user = useSelector((state) => state.userModule.user)
  const [isScrolled, setIsScrolled] = useState(false)

  const headerRef = useRef(null)

  return (
    <header ref={headerRef} className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content main-layout">
        <div className="logo-container" style={{ 
          display: 'flex',
          alignItems: 'center',
          padding: '10px 0',
          paddingLeft: '1rem',
          backgroundColor: 'white',
        }}>
          <img 
            src={levixLogo} 
            alt="Ctera Logo" 
            className="company-logo"
            onClick={() => window.location.href = '/'}
            style={{
              backgroundColor: 'white', 
              cursor: 'pointer',
              borderRadius: '25px',
              height: '62px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>

         
          <div className="user-info" style={{ cursor: 'pointer' }}>
            <NavMenu />
          </div>
        
      </div>
    </header>
  )
} 
 
