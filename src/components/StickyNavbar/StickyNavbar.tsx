'use client';
import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import LoginModal from '@/components/LoginModal/LoginModal';

import {
  Badge,
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from '../../providers/ThemeProvider';

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

  const toggleLoginPopup = () => setPopupVisible(!popupVisible);

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
          <Link href={item.href} key={item.href} className="flex items-center" passHref>
            <span>{item.name}</span>
          </Link>
        </Typography>
      ))}
    </ul>
  );

  const { data: session, status } = useSession();
  console.log(useSession());

  return (
    <>
      <LoginModal popupStateHandler={toggleLoginPopup} popupOpenState={popupVisible} />
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900 container mx-auto px-4">
          <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
            <Image src="/next.svg" alt={''} width={100} height={20} /> Wojciech Puzio
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {!session && (
                <Button
                  fullWidth
                  variant="text"
                  size="sm"
                  onClick={() => signIn()}
                  className="hidden md:block"
                >
                  <span>Logowanie</span>
                </Button>
              )}
              {session && (
                <Button
                  fullWidth
                  variant="text"
                  size="sm"
                  onClick={() => signOut()}
                  className="hidden md:block"
                >
                  <span>Wyloguj {session?.user?.name}</span>
                </Button>
              )}
              <Badge color="blue" content={1}>
                <IconButton>
                  <ShoppingCartIcon className="h-4 w-4" />
                </IconButton>
              </Badge>
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
                  color="black"
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
                  color="black"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex content-center items-center">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Logowanie</span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </>
  );
}
