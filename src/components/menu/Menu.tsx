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
  const [isStudentHover, setIsStudentHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuLabel = l.menu;
  const language = l.lang;

  const defaultClass =
    'absolute z-10 flex flex-col gap-2 py-[6px] sm:py-[10px] px-4 sm:px-3 rounded-lg shadow-2 bg-white text-black w-[100px] lg:w-full left-[20px] lg:left-0 top-12 sm:top-16 font-bold';

  function setActiveMenu(index: number) {
    setActive(index, true);
  }

  function setLanguage(lang: string) {
    if (lang != language) {
      if (lang == 'VI') {
        window.location.href = window.location.href.replace('/en', '');
      } else {
        window.location.href = window.location.href.replace(window.location.origin, window.location.origin + '/en');
      }
    } else {
      setIsHover(false);
    }
  }

  function toggle() {
    console.log(isHover, isStudentHover);
    toggleMenu();
    setIsOpen(!isOpen);
  }

  for (const elm of window.document.getElementsByClassName('close-menu')) {
    if (elm.hasAttribute('data-close-menu')) break;
    elm.setAttribute('data-close-menu', 'true');
    elm.addEventListener('click', () => {
      console.log('close-menu');
      setTimeout(() => {
        setIsStudentHover(false);
        setIsHover(false);
        setIsOpen(false);
      }, 200);
      isMenuOpen.set(false);
      // toggle();
      console.log(isHover, isStudentHover, isOpen);
    });
  }

  return (
    <div class='w-full bg-[#0F172A] fixed z-40 flex justify-center'>
      <nav id='menu' className={`menu ${!isOpen ? '' : 'show'}`}>
        <div className='flex flex-row gap-4 items-center justify-between w-full lg:max-w-[20%] z-10'>
          <a href={l.lang == 'VI' ? '/' : '/en/'} class='min-w-[125px] text-center'>
            <img class='h-[40px] cursor-pointer' src='/images/logo.svg' alt='Logo' />
          </a>
          <div className='flex justify-between w-full'>
            <div
              class='hidden lg:flex flex-row relative h-10 p-6 items-center justify-between text-sm w-24 cursor-pointer'
              onClick={() => setIsHover(!isHover)}
              tabIndex={0}
            >
              <span class='font-bold text-[16px]'>{language}</span>
              <i className={isHover ? 'icon-ArrowUpStop' : 'icon-ArrowDownStop'}></i>
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
          </div>
          <button class='lg:hidden text-[24px]' onClick={toggle}>
            <i className={isMenuOpen.get() ? 'icon-Close' : 'icon-MenuHamburger'}></i>
          </button>
        </div>
        <span class='hidden lg:flex flex-1'></span>
        <div class='flex gap-10 items-center z-10'>
          <ul className={isMenuOpen.get() ? 'menu-items show' : 'menu-items hide'}>
            <li class='p-3 flex lg:hidden'>
              <ul class='w-full'>
                <li class='flex justify-center relative'>
                  <div className='flex justify-between w-full'>
                    <div
                      class='flex flex-row relative h-10 p-6 items-center justify-between text-sm w-24 cursor-pointer'
                      onClick={() => setIsHover(!isHover)}
                      tabIndex={0}
                    >
                      <span class='font-bold text-[16px]'>{language}</span>
                      <i className={isHover ? 'icon-ArrowUpStop' : 'icon-ArrowDownStop'}></i>
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
                    <button class='lg:hidden text-[24px] w-14' onClick={toggle}>
                      <i className={isMenuOpen.get() ? 'icon-Close' : 'icon-MenuHamburger'}></i>
                    </button>
                  </div>
                  {/* <div
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
                </div> */}
                </li>
              </ul>
            </li>
            {/* <li>
              <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/#features'}>
                {l.menu.features}
              </a>
            </li>
            <li>
              <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/#price'}>
                {l.menu.price}
              </a>
            </li> */}
            <li>
              <a class='close-menu' href='https://kyo.kyons.vn' target='_blank'>
                <span className='flex items-center justify-center gap-2'>
                  <span class='font-bold text-[16px]'>KyoAI</span>
                </span>
              </a>
            </li>
            <div
              class='flex lg:flex-row flex-col relative p-4 lg:items-center items-start justify-between text-sm gap-3 cursor-pointer'
              onClick={() => setIsStudentHover(!isStudentHover)}
              tabIndex={0}
            >
              <span className='flex items-center justify-center gap-2'>
                <img class='lg:hidden' src='/images/menu-students.svg' alt='' />
                <span class='font-bold text-[16px]'>{l.menu.forStudents}</span>
              </span>
              <i
                className={isStudentHover ? 'icon-ArrowUpStop lg:flex hidden' : 'icon-ArrowDownStop lg:flex hidden'}
              ></i>
              <div
                className={isStudentHover ? `${defaultClass} lg:flex hidden` : `${defaultClass} hidden`}
                // style='bottom: calc(-100% - 30px);'
                // onClick={() => setIsStudentHover(false)}
              >
                {/* <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/#about-us'}>
                  {l.menu.aboutUs}
                </a>
                <hr class='text-blueGrey-300' /> */}
                <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/#features'}>
                  {l.menu.features}
                </a>
                <hr class='text-blueGrey-300' />
                {/* <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/#guild'}>
                  {l.menu.guild}
                </a>
                <hr class='text-blueGrey-300' /> */}
                <a class='close-menu flex items-center' href={(l.lang == 'VI' ? '' : '/en') + '/#price'}>
                  {l.menu.price}
                  &nbsp;
                  <span class='text-[10px] h-4 px-1 rounded-full flex items-center justify-center bg-darkEmerald text-white'>
                    {l.menu.promotion}
                  </span>
                </a>
              </div>
              <ul class='lg:hidden pl-4 vertical-line flex flex-col items-start'>
                <li>
                  <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/#features'}>
                    {l.menu.features}
                  </a>
                </li>
                <li>
                  <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/#price'}>
                    {l.menu.price}
                    &nbsp;
                    <span class='text-[10px] h-4 px-1 rounded-full flex items-center justify-center bg-darkEmerald text-white'>
                      {l.menu.promotion}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <li>
              <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/danh-cho-nha-truong'}>
                <span className='flex items-center justify-center gap-2'>
                  <img class='lg:hidden' src='/images/menu-schools.svg' alt='' />
                  <span class='font-bold text-[16px]'>{l.menu.forSchools}</span>
                </span>
              </a>
            </li>
            <div
              className={isHover ? `${defaultClass} flex md:hidden` : `${defaultClass} hidden`}
              // style='bottom: calc(-100% - 30px);'
              onClick={() => setIsStudentHover(false)}
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
            {/* <li class='p-6 flex flex-col gap-6 sm:hidden'>
              <span class='font-bold text-[16px] flex gap-3 items-center'>
                <img src='/images/menu-students.svg' alt='' /> <span>{l.menu.forStudents}</span>
              </span>
              <ul class='pl-4 vertical-line flex flex-col items-start'>
                <li>
                  <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/#about-us'}>
                    {l.menu.aboutUs}
                  </a>
                </li>
                <li>
                  <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/#problem'}>
                    {l.menu.problemsAndSolution}
                  </a>
                </li>
                <li>
                  <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/#guild'}>
                    {l.menu.guild}
                  </a>
                </li>
                <li>
                  <a class='close-menu' href={(l.lang == 'VI' ? '' : '/en') + '/pricing'}>
                    {l.menu.price}
                    &nbsp;
                    <span class='text-[10px] h-4 px-1 rounded-full flex items-center justify-center bg-darkEmerald text-white'>
                      {l.menu.promotion}
                    </span>
                  </a>
                </li>
              </ul>
            </li>
            <li className={$activeMenu == 4 ? 'active' : ''}>
              <a
                class='close-menu'
                href={(l.lang == 'VI' ? '' : '/en') + '/#schools'}
                onClick={() => {
                  setActiveMenu(4);
                }}
              >
                <span class='font-bold text-[16px] flex gap-3 items-center'>
                  <img class='sm:hidden' src='/images/menu-schools.svg' alt='' /> <span>{l.menu.forSchools}</span>
                </span>
              </a>
            </li> */}
            {/* <li className={$activeMenu == 1 ? 'active' : ''}>
            <a
              class='close-menu'
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
              class='close-menu'
              href='#problem'
              onClick={() => {
                setActiveMenu(1);
              }}
            >
              {menuLabel.problems}
            </a>
          </li>
          <li className={$activeMenu == 3 ? 'active' : ''}>
            <a
              class='close-menu'
              href='#solutions'
              onClick={() => {
                setActiveMenu(2);
              }}
            >
              {menuLabel.solutions}
            </a>
          </li>
          <li className={$activeMenu == 3 ? 'active' : ''}>
            <a
              class='close-menu'
              href='#students'
              onClick={() => {
                setActiveMenu(3);
              }}
            >
              {menuLabel.forStudents}
            </a>
          </li>
          <li className={$activeMenu == 5 ? 'active' : ''}>
            <a
              class='close-menu'
              href={language == 'VI' ? '/pricing' : '/en/pricing'}
              onClick={() => {
                setActiveMenu(5);
              }}
            >
              {menuLabel.price}
            </a>
          </li> */}
            {/* <li className={$activeMenu == 6 ? 'active' : ''}>
              <a
                class='close-menu'
                href='#contact'
                onClick={() => {
                  document.body.classList.remove('overflow-hidden');
                  // smoothScrollToDiv(document.getElementById('contact')!);
                }}
              >
                <span class='font-bold text-[16px] flex gap-3 items-center'>
                  <img class='sm:hidden' src='/images/menu-contact.svg' alt='' /> <span>{menuLabel.contact}</span>
                </span>
              </a>
            </li>
            <li class='sm:flex justify-center relative hidden'>
              <div
                class='flex flex-row relative p-6 items-center justify-between text-sm w-24 cursor-pointer'
                onClick={() => setIsHover(!isHover)}
                tabIndex={0}
              >
                <span class='font-bold text-[16px]'>{language}</span>
                <i className={isHover ? 'icon-ArrowUpStop' : 'icon-ArrowDownStop'}></i>
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
            </li> */}
          </ul>
        </div>
        <span class='hidden lg:flex flex-1'></span>
        <div class='hidden lg:flex items-center gap-4'>
          <a href={`${APP_URL}/sign-in`} target='_blank' class='btn' title={l.btn.signIn}>
            {l.btn.signIn}
          </a>
          <a href={`${APP_URL}/sign-up`} target='_blank' class='btn orange' title={l.btn.signUp}>
            {l.btn.signUp}
          </a>
        </div>
        <div
          className={`fixed w-full h-screen top-0 left-0 z-0 ${isOpen || isHover || isStudentHover ? '' : 'hidden'}`}
          onClick={() => {
            console.log('click');
            isMenuOpen.set(false);
            setIsOpen(false);
            setIsStudentHover(false);
            setIsHover(false);
          }}
        ></div>
      </nav>
    </div>
  );
}
