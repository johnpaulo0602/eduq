'use client';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import { useEffect, useState } from 'react';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard';
import IconSettings from '../icon/icon-settings';
import IconMenuTodo from '@/components/icon/menu/icon-menu-todo';
import IconMenuElements from '@/components/icon/menu/icon-menu-elements';
import IconMenuCharts from '@/components/icon/menu/icon-menu-charts';
import IconMenuUsers from '@/components/icon/menu/icon-menu-users';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import { usePathname } from 'next/navigation';
import AnimateHeight from 'react-animate-height';

const menuItems = [
    { href: "/", icon: IconMenuDashboard, label: "Home" },
    { href: "/apps/mailbox", icon: IconMenuElements, label: "Questões" },
    { href: "/apps/todolist", icon: IconMenuTodo, label: "Provas" },
    { href: "/apps/notes", icon: IconMenuCharts, label: "Relatórios" },
    { href: "/apps/scrumboard", icon: IconMenuUsers, label: "Usuários" },
    { href: "/apps/contacts", icon: IconSettings, label: "Configurações" },
    {
        href: "#", icon: IconMenuDashboard, label: "Dashboard", submenu: [
            { href: "/sales", label: "Vendas" },
            { href: "/analytics", label: "Análises" },
            { href: "/finance", label: "Finanças" },
            { href: "/crypto", label: "Cripto" },
        ]
    },
];

const Sidebar = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const [currentMenu, setCurrentMenu] = useState<string | null>(null);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [pathname, themeConfig.sidebar, dispatch]);

    const isActive = (href: string) => pathname === href;

    const toggleMenu = (menuLabel: string) => {
        if (currentMenu === menuLabel) {
            setCurrentMenu(null);
        } else {
            setCurrentMenu(menuLabel);
        }
    };

    return (
        <div className={semidark ? 'dark' : ''}>
            
            <nav className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
                <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-black">
                    <Link href="/" className="main-logo flex shrink-0 items-center">
                        <img className="ml-[5px] w-24" src="/assets/images/logo.svg" alt="logo" />
                    </Link>

                    <button
                        type="button"
                        className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                        onClick={() => dispatch(toggleSidebar())}
                    >
                        <IconCaretsDown className="m-auto rotate-90" />
                    </button>
                </div>
                <div className="h-full bg-white dark:bg-black">
                    <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                        {menuItems.map(({ href, icon: Icon, label, submenu }) => (
                            <li key={href} className={`nav-item ${submenu ? 'menu' : ''}`}>
                                <button type="button" className={`group ${isActive(href) ? 'active' : ''}`} onClick={() => submenu && toggleMenu(label)}>
                                    <div className="flex items-center">
                                        <Icon className="shrink-0 group-hover:!text-primary" />
                                        <span className={`text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark`}>{label}</span>
                                    </div>
                                    {submenu && (
                                        <div className={`${currentMenu !== label ? '-rotate-90 rtl:rotate-90' : ''}`}>
                                            <IconCaretsDown />
                                        </div>
                                    )}
                                </button>
                                {submenu && (
                                    <AnimateHeight duration={300} height={currentMenu === label ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            {submenu.map(subItem => (
                                                <li key={subItem.href}>
                                                    <Link href={subItem.href}>{subItem.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </AnimateHeight>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;