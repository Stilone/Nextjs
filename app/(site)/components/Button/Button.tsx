import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import ArrowIcon from "./arrow.svg";
import cn from "classnames";

export const Button = ({ appearance, children, arrow = "none", className, ...props }: ButtonProps): JSX.Element => {
    return (
        <button
        className={cn(styles.button, className, {
            [styles.primary]: appearance == "primaty",
            [styles.ghost]: appearance == "ghost",
        })}
        {...props}
        >
            {children}
            {arrow !== "none" && <span className={cn(styles.arrow, {
                [styles.down]: arrow == "down"
            })}>
                <ArrowIcon />
                </span>}
        </button>
    );
};