import * as React from 'react'
import { Link } from 'gatsby'
import { 
  container,
  mainNav,
  mainNavItem,
  navLink
} from "./layout.module.css";

const Layout = ({ pageTitle, children }) => {
  return (
    <body>
      <header className={container}>
        <h1>Indika Kodagoda</h1>
      </header>
      <nav className={container}>
        <ul className={mainNav}>
          <li className={mainNavItem}><Link to="/" className={navLink}>Home</Link></li>
          <li className={mainNavItem}><Link to="/about" className={navLink}>About</Link></li>
          <li className={mainNavItem}><Link to="/contact" className={navLink}>Contact</Link></li>
        </ul>
      </nav>
      <main className={container}>
        {children}
      </main>
    </body>
  )
}

export default Layout