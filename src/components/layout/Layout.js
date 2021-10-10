import { Fragment } from "react/cjs/react.production.min";
import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout = (props)=>{
    return <Fragment>
           <MainNavigation/>
           <main className={styles.main}>{props.children}</main>
         </Fragment>
}

export default Layout;