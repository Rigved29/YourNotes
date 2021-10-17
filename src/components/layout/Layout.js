import { Fragment } from "react/cjs/react.production.min";
import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
const Layout = (props)=>{
    return <Fragment>
           <MainNavigation/>
           <main className={styles.main}>{props.children}</main>
           <Footer className={styles.footer}/>
         </Fragment>
}

export default Layout;