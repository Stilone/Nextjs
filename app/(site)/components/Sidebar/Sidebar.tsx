import Menu from "../Menu/Menu";
import styles from "./Sideba.module.css";
import { SidebarProps } from "./Sidebar.props";
import cn from "classnames";

export const Sidebar = ({...props}: SidebarProps): JSX.Element => {
    return (

            <div {...props}>
                <Menu />
            </div>  

    )
};