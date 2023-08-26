import { activeMenu, isMenuOpen, setActive, toggleMenu } from '@app/app';
import { useStore } from '@nanostores/preact';
import { useState } from 'preact/hooks';
import './menu.scss';

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
    'md:absolute z-10 flex flex-col gap-2 py-[6px] px-4 rounded-lg shadow-2 bg-white text-black w-full md:left-0';

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

  return (
    <nav id='menu' className={`menu ${!isOpen ? 'hide' : 'show'}`}>
      <div className='flex flex-row items-center'>
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
        <button class='md:hidden text-[24px]' onClick={toggle}>
          <i className={isMenuOpen.get() ? 'icon-Close' : 'icon-MenuHambuger'}></i>
        </button>
      </div>
      <span class='hidden md:flex flex-1'></span>
      <div class='flex gap-10 items-center'>
        <ul class='menu-items'>
          <li className={$activeMenu == 1 ? 'active' : ''}>
            <a
              class='cursor-pointer'
              href='#about-us'
              onClick={() => {
                setActiveMenu(1);
              }}
            >
              {menuLabel.aboutUs}
            </a>
          </li>
          <li className={$activeMenu == 2 ? 'active' : ''}>
            <a
              class='cursor-pointer'
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
              class='cursor-pointer'
              href='#for-school'
              onClick={() => {
                setActiveMenu(3);
              }}
            >
              {menuLabel.forSchools}
            </a>
          </li>
          <li className={$activeMenu == 4 ? 'active' : ''}>
            <a
              class='cursor-pointer'
              href='#contact'
              onClick={() => {
                setActiveMenu(4);
              }}
            >
              {menuLabel.contact}
            </a>
          </li>
          <li>
            <div
              class='flex flex-row relative h-10 md:px-4 md:py-[10px] items-center justify-between text-sm md:w-24'
              onClick={() => setIsHover(!isHover)}
              tabIndex={0}
            >
              <span>{language}</span>
              <i className={isHover ? 'icon-ArrowUp' : 'icon-ArrowDown'}></i>
              <div
                className={isHover ? `${defaultClass} hidden md:flex` : `${defaultClass} hidden`}
                style='bottom: calc(-100% - 30px);'
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
            </div>
            <div
              className={isHover ? `${defaultClass} flex md:hidden` : `${defaultClass} hidden`}
              style='bottom: calc(-100% - 30px);'
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

        <a class='btn' href='https://student.kyons.vn'>
          {l.btn.studyNow}
        </a>
      </div>
    </nav>
  );
}
