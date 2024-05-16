import styles from "./Menu.module.css";
import cn from "classnames";
import { getMenu } from "../../../../api/menu";
import { FirstLevelMenuItem, PageItem } from "../../../../interfaces/menu.interface";
import CoursesIcon from "./icons/courses.svg"
import ServicesIcon from "./icons/services.svg"
import BooksIcon from "./icons/books.svg"
import ProductsIcon from "./icons/products.svg"
import { TopLevelCategory } from "../../../../interfaces/page.interface";
import Link from "next/link";

const firstLevelMenu: FirstLevelMenuItem[] = [
    {route: "courses", name: "Курсы", icon: <CoursesIcon />, id: TopLevelCategory.Courses},
    {route: "services", name: "Сервисы", icon: <ServicesIcon />, id: TopLevelCategory.Services},
    {route: "books", name: "Книги", icon: <BooksIcon />, id: TopLevelCategory.Books},
    {route: "products", name: "Продукты", icon: <ProductsIcon />, id: TopLevelCategory.Products},
]

export default async function Menu() {
    const menuRequest =  await getMenu(0);

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map(menu => (
                    <div key={menu.route}>
                        <Link href={`/${menu.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: menu.id == TopLevelCategory.Courses
                            })}>
                                {menu.icon}
                                <span>{menu.name}</span>
                            </div>
                        </Link>
                        {menu.id == TopLevelCategory.Courses && buildSecondLevel(menu)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (menu: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menuRequest.map(m => (
                    <div key={m._id.secondCategory}>
                        <div className={styles.secondLevel}>{m._id.secondCategory}</div>
                        <div className={cn(styles.secondLevelBlock, {
                            [styles.secondLevelBlockOpened]: m.isOpened
                        })}>
                            {m._id.secondCategory == "Аналитика" && buildThirdLevel(m.pages, menu.route)}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <Link key={p._id} href={`/${route}/${p.alias}`}>
                    <div className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: false
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