import React, { useState, useRef, useEffect } from 'react';
import './Header.css'

import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import { StyleClass } from 'primereact/styleclass';

const Header = ({ title, icon }) =>{

    const btnRef1 = useRef(null);
    const [visibleSideBar, setVisibleSideBar] = useState(false);
    const [visibleLanguageMenu, setVisibleLanguageMenu] = useState(false);
    const languageMenuRef = useRef(null);

    const languageMenuItems = [
        { label: 'EN-US [English]', flag: '/images/flag-us.png' },
        { label: 'PT-BR [Português]',  flag: '/images/flag-br.png'  },
    ];

    const toggleLanguageMenu = () => {
        setVisibleLanguageMenu(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
            setVisibleLanguageMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <Sidebar
                className="sidebar-content"
                visible={visibleSideBar}
                onHide={() => setVisibleSideBar(false)}
                content={({ closeIconRef, hide }) => (
                    <div className="min-h-screen flex relative lg:static surface-ground">
                        <div id="app-sidebar-2" className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style={{ width: '280px' }}>
                            <div className="flex flex-column h-full">
                                <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                                    <span className="inline-flex align-items-center gap-2">
                                        <img src="/images/logo.png" alt="Logo"  height="35" className="mr-3"/>
                                        <span className="font-semibold text-2xl text-primary">Maxin'UP</span>
                                    </span>
                                    <span>
                                        <Button type="button" ref={closeIconRef} onClick={(e) => hide(e)} icon="pi pi-times" rounded outlined className="h-2rem w-2rem"></Button>
                                    </span>
                                </div>
                                <div className="overflow-y-auto">
                                    <ul className="list-none p-3 m-0">
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-chart-bar mr-2"></i>
                                                <span className="font-medium">Dashboard</span>
                                            </a>
                                        </li>
                                        <li>
                                            <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                <a ref={btnRef1} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                    <i className="pi pi-hammer mr-2"></i>
                                                    <span className="font-medium">Auctions</span>
                                                    <i className="pi pi-chevron-down ml-auto mr-1"></i>
                                                </a>
                                            </StyleClass>
                                            <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-shop mr-2"></i>
                                                        <span className="font-medium">Explore</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-clipboard mr-2"></i>
                                                        <span className="font-medium">Report</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-wallet mr-2"></i>
                                                        <span className="font-medium">My Bids</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-calendar mr-2"></i>
                                                <span className="font-medium">Calendar</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-bell mr-2"></i>
                                                <span className="font-medium">Notifications</span>
                                                <span className="inline-flex align-items-center justify-content-center ml-auto bg-indigo-400 text-0 border-circle" style={{ minWidth: '1.5rem', height: '1.5rem' }}>
                                                    4
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                <i className="pi pi-cog mr-2"></i>
                                                <span className="font-medium">Settings</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-auto">
                                    <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                                    <a href="/profile" v-ripple className="no-underline m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                                        <span className="ml-1 font-bold">rSanches</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            ></Sidebar>

            <div className="container-topbar flex align-items-center">
                <i className="pi pi-bars ml-3 mr-1 icon-topbar-left" style={{ fontSize: '1.3rem' }} onClick={() => setVisibleSideBar(true)}></i>

                <img src="/images/logo.png" alt="Logo"  height="35" className="ml-2 mr-3"/>
                <span className="font-semibold text-2xl text-primary title-topbar">M'UP</span>

                <i className={`${icon} ml-5 page-icon`} style={{ fontSize: '1.1rem' }}></i>
                <span className="font-semibold text-lg ml-2 page-topbar">{title}</span>

                <div className="icon-topbar-right-position">
                    <div className="flex align-items-center relative" ref={languageMenuRef}>
                        <i className="pi pi-globe mr-5 icon-topbar-right" style={{ fontSize: '1.3rem' }} onClick={toggleLanguageMenu}></i>
                        {visibleLanguageMenu && (
                            
                            <div className="language-menu mr-4">
                                {languageMenuItems.map((item, index) => (
                                    <div key={index} className="language-menu-item -mr-8">
                                        <img src={`${item.flag}`} height="20" alt="" className="mr-3"/>
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}; export default Header;
