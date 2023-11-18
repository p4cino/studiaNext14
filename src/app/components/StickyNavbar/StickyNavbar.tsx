'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Button, IconButton, MobileNav, Navbar, Typography } from '@material-tailwind/react';

import LoginModal from '@/components/LoginModal/LoginModal';

type MenuItem = {
  name: string;
  href: string;
  children?: MenuItem;
}[];

const MenuLinksItems: MenuItem = [
  {
    name: 'Strona główna',
    href: '/',
  },
  {
    name: 'Dodaj produkt',
    href: '/dodajProdukt',
  },
  {
    name: 'Edycja produktu',
    href: '/edycjaProduktu',
  },
  {
    name: 'Usun Produkt',
    href: '/usunProdukt',
  },
];

const MenuButtonList: MenuItem = [
  {
    name: 'Logowanie',
    href: '/logowanie',
  },
  {
    name: 'Dołacz',
    href: '/rejestracja',
  },
];

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [popupVisible, setPopupVisible] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {MenuLinksItems.map((item) => (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
          key={item.href}
        >
          <a href={item.href} className="flex items-center">
            {item.name}
          </a>
        </Typography>
      ))}
    </ul>
  );

  return (
    <>
      <LoginModal />
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
            <Image src="/next.svg" alt={''} width={100} height={20} /> Material Tailwind
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {MenuButtonList.map((item) => (
                <Button variant="text" size="sm" className="hidden lg:inline-block" key={item.href}>
                  <span>{item.name}</span>
                </Button>
              ))}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {MenuButtonList.map((item) => (
              <Link href={item.href}>
                <Button fullWidth variant="text" size="sm" className="" key={item.href}>
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </MobileNav>
      </Navbar>
    </>
  );
}
