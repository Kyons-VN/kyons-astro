import { activeMenu, isMenuOpen, setActive, toggleMenu } from '@app/app';
import { useStore } from '@nanostores/preact';
import { useState } from 'preact/hooks';
import './menu.scss';
const APP_URL = import.meta.env.APP_URL ?? 'https://student.kyons.vn';

type Props = {
  l: any;
};

export default function Menu({ l }: Props) {
  const $activeMenu = useStore(activeMenu);
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuLabel = l.menu;
  const language = l.lang;

  const defaultClass =
    'absolute z-10 flex flex-col gap-2 py-[6px] px-4 rounded-lg shadow-2 bg-white text-black w-full w-screen lg:w-full left-[calc(50%_-_50vw)] lg:left-0 top-12';

  function setActiveMenu(index: number) {
    setActive(index, true);
  }

  function setLanguage(lang: string) {
    if (lang != language) {
      if (lang == 'VI') {
        window.location.href = window.location.origin;
      } else {
        window.location.href = window.location.origin + '/en/';
      }
    } else {
      setIsHover(false);
    }
  }

  function toggle() {
    toggleMenu();
    setIsOpen(!isOpen);
  }

  for (const elm of window.document.getElementsByClassName('close-menu')) {
    if (elm.hasAttribute('data-close-menu')) break;
    elm.setAttribute('data-close-menu', 'true');
    elm.addEventListener('click', () => {
      console.log('close-menu');

      toggle();
    });
  }

  return (
    <nav id='menu' className={`menu ${!isOpen ? 'hide' : 'show'}`}>
      <div className='flex flex-row items-center justify-between w-full lg:w-auto'>
        <a href='#home'>
          <img
            class='w-[100px] cursor-pointer'
            src='/images/logo.svg'
            alt='Logo'
            onClick={() => {
              setActiveMenu(0);
            }}
          />
        </a>
        <button class='lg:hidden text-[24px]' onClick={toggle}>
          <i className={isMenuOpen.get() ? 'icon-Close' : 'icon-MenuHamburger'}></i>
        </button>
      </div>
      <span class='hidden lg:flex flex-1'></span>
      <div class='flex gap-10 items-center'>
        <ul className={isMenuOpen.get() ? 'menu-items show' : 'menu-items hide'}>
          <li className={$activeMenu == 1 ? 'active' : ''}>
            <a
              class='close-menu'
              href='#features'
              onClick={() => {
                setActiveMenu(1);
              }}
            >
              {menuLabel.features}
            </a>
          </li>
          <li className={$activeMenu == 2 ? 'active' : ''}>
            <a
              class='close-menu'
              href='#students'
              onClick={() => {
                setActiveMenu(2);
              }}
            >
              {menuLabel.forStudents}
            </a>
          </li>
          <li className={$activeMenu == 3 ? 'active' : ''}>
            <a
              class='close-menu'
              href='#schools'
              onClick={() => {
                setActiveMenu(3);
              }}
            >
              {menuLabel.forSchools}
            </a>
          </li>
          <li className={$activeMenu == 4 ? 'active' : ''}>
            <a
              class='close-menu'
              href='#contact'
              onClick={() => {
                setActiveMenu(4);
              }}
            >
              {menuLabel.contact}
            </a>
          </li>
          <li class='flex justify-center relative'>
            <div
              class='flex flex-row relative h-10 p-6 items-center justify-between text-sm w-24 cursor-pointer'
              onClick={() => setIsHover(!isHover)}
              tabIndex={0}
            >
              <span class='font-bold text-[16px]'>{language}</span>
              <i className={isHover ? 'icon-ArrowUp' : 'icon-ArrowDown'}></i>
              <div
                className={isHover ? `${defaultClass} hidden md:flex` : `${defaultClass} hidden`}
                // style='bottom: calc(-100% - 30px);'
                onClick={() => setIsHover(false)}
              >
                <a className={language == 'VI' ? 'text-orange' : ''} onClick={() => setLanguage('VI')}>
                  VI
                </a>
                <hr class='text-blueGrey-300' />
                <a className={language == 'EN' ? 'text-orange' : ''} onClick={() => setLanguage('EN')}>
                  EN
                </a>
              </div>
            </div>
            <div
              className={isHover ? `${defaultClass} flex md:hidden` : `${defaultClass} hidden`}
              // style='bottom: calc(-100% - 30px);'
              onClick={() => setIsHover(false)}
            >
              <div
                className={language == 'VI' ? 'text-orange cursor-pointer' : 'cursor-pointer'}
                onClick={() => setLanguage('VI')}
              >
                VI
              </div>
              <hr class='text-blueGrey-300' />
              <div
                className={language == 'EN' ? 'text-orange cursor-pointer' : 'cursor-pointer'}
                onClick={() => setLanguage('EN')}
              >
                EN
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
