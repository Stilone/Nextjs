import Menu from "../Menu/Menu";
import styles from "./Sidebar.module.css";
import { SidebarProps } from "./Sidebar.props";
import Logo from "../../../logo.svg";
import cn from "classnames";

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {
    return (

            <div {...props} className={cn(className, styles.sidebar)}>
                <Logo className={styles.logo}/>
                <div>поиск</div>
                <Menu />
            </div>  

    )
};