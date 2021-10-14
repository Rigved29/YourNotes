import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";

const Naviagtion = ()=>{
  return(
     <header className={styles.header}>
         <div className={styles.logo}>
         Your Notes
         </div>
        
         <nav className={styles.nav}>
             <ul>
                 <li><NavLink to="/quotes" activeClassName={styles.active}>All Notes</NavLink></li>
                 <li><NavLink to="/new-quote" activeClassName={styles.active}>Add a New Note</NavLink></li>
             </ul>
         </nav>
     </header>
  )
}

export default Naviagtion