"use client"
import styles from "./Menu.module.css";
import cn from "classnames";
import { getMenu } from "../../../../api/menu";
import { FirstLevelMenuItem, MenuItem, PageItem } from "../../../../interfaces/menu.interface";
import { TopLevelCategory } from "../../../../interfaces/page.interface";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Importing usePathname hook
import { useEffect, useState } from "react";
import { firstLevelMenu } from "../../../../helpers/helpers";


export default function Menu() { // Changed from async function to regular function
    const [menuRequest, setMenuRequest] = useState<MenuItem[]>([]); // Using useState hook to store menu data
    const pathname = usePathname();
   
    useEffect(() => {
        const fetchMenu = async () => {
            const menuData = await getMenu(0);
            setMenuRequest(menuData);
        };

        fetchMenu();
    }, []); // Empty dependency array to fetch menu only once

    const openSecondLevel = (secondCategory: string) => {
        setMenuRequest(menuRequest.map(m => {
            if(m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened;
            }
            return m;
        }))
    }
 
    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map(menu => (
                    <div key={menu.route}>
                        <Link href={`/${menu.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: menu.id === TopLevelCategory.Courses
                            })}>
                                {menu.icon}
                                <span>{menu.name}</span>
                            </div>
                        </Link>
                        {menu.id === TopLevelCategory.Courses && buildSecondLevel(menu)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (menu: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menuRequest.map(m => {
                    if (m.pages.map(p => p.alias).includes(pathname.split("/")[2])) {
                        m.isOpened = true
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
                            <div className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: m.isOpened
                            })}>
                                {buildThirdLevel(m.pages, menu.route)}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <Link key={p._id} href={`/${route}/${p.alias}`}>
                    <div className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: `/${route}/${p.alias}` === pathname
                })}>
                    {p.category}
                    </div>
                </Link>
            ))
        )
    };

    return (
        <div className={styles.menu}>
            {buildFirstLevel()}
        </div>
    );
};
