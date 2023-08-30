// import { activeMenu, isGoUp, isInSolution, setActive, setScrolling } from '@app/app';
// import { AboutUsContent } from '@components/contents/AboutUsContent';
// import { CreatorContent } from '@components/contents/CreatorContent';
// import { HomeContent } from '@components/contents/HomeContent';
// import { SolutionContent } from '@components/contents/SolutionContent';
// import { useStore } from '@nanostores/preact';
// import { useSwipeable } from 'react-swipeable';
// import { ContactContent } from './contents/ContactContent';

// type Props = {
//   l: any;
// };

// export default function InteractiveLayer({ l }: Props) {
//   const $activeMenu = useStore(activeMenu);
//   const $isGoUp = useStore(isGoUp);
//   function setActiveMenu(index: number) {
//     setActive(index);
//   }
//   let running = false;
//   let interval: NodeJS.Timeout;
//   let isMobile = document.body.offsetWidth < 768;
//   const screenHeight = window.screen.height;
//   var root = document.querySelector(':root');

//   const handlers = useSwipeable({
//     onSwipedUp: () => setActiveMenu($activeMenu + 1),
//     onSwipedDown: () => setActiveMenu($activeMenu - 1),
//     swipeDuration: 500,
//     preventScrollOnSwipe: true,
//     trackMouse: true,
//   });

//   function wheel(e: WheelEvent) {
//     const body = document.body;
//     if (body.classList.contains('overflow-hidden')) return;
//     // console.log(e.view.scrollTo(0,));

//     //  e.stopPropagation()
//     // 	e.preventDefault()
//     //   e.stopImmediatePropagation()
//     // console.log(running);

//     if (running) {
//       // console.log();

//       return;
//     } else {
//       running = true;
//       if (isMobile) {
//         // console.log(window.scrollY);
//         // if (window.scrollY > screenHeight / 2) {
//         //   console.log('1');
//         //   setActiveMenu(1);
//         // } else {
//         //   console.log('2');
//         //   setActiveMenu(0);
//         // }
//       } else {
//         root?.setAttribute('style', 'scroll-behavior: auto;');
//         if (e.deltaY > 0) {
//           setActiveMenu($activeMenu - 1);
//         } else {
//           setActiveMenu($activeMenu + 1);
//         }
//         setScrolling(true);
//       }
//       clearInterval(interval);
//       interval = setInterval(() => {
//         running = false;
//         root?.removeAttribute('style');
//         if (!isMobile) setScrolling(false);
//         clearInterval(interval);
//       }, 500);
//     }
//   }

//   const defaultClasses =
//     'md:absolute md:top-0 md:left-0 w-full h-auto min-h-[calc(100vh_-_56px)] md:h-full md:flex-row md:justify-center';
//   // console.log(isMobile);

//   function test() {
//     console.log('ok');
//   }

//   // if(isMobile) return <div class={defaultClasses} {...handlers}>
//   //   <HomeContent l={l}/>
//   //   {/* <AboutUsContent l={l} /> */}
//   //   {/* <SolutionContent l={l} />
//   //   <CreatorContent l={l} />
//   //   <ContactContent l={l} /> */}
//   // </div>

//   // onWheel = {(e) => wheel(e)}
//   if (isMobile) {
//     addEventListener('scroll', (event) => {
//       const body = document.body;
//       if (body.classList.contains('overflow-hidden')) return;
//       var solutionElm = document.getElementById('solution');
//       var creatorElm = document.getElementById('creator');
//       var contactElm = document.getElementById('contact');
//       var aboutUsElm = document.getElementById('about-us');
//       // console.log(solutionElm.offsetTop, window.scrollY);
//       if (window.scrollY > contactElm!.offsetTop - window.screen.height / 2) {
//         activeMenu.set(4);
//       } else if (window.scrollY > creatorElm!.offsetTop - window.screen.height / 2) {
//         activeMenu.set(3);
//         isInSolution.set(false);
//       } else if (window.scrollY > solutionElm!.offsetTop - window.screen.height / 2) {
//         isInSolution.set(true);
//         activeMenu.set(2);
//       } else if (
//         window.scrollY > aboutUsElm!.offsetTop - window.screen.height / 2 &&
//         window.scrollY > window.screen.height / 2
//       ) {
//         activeMenu.set(1);
//         isInSolution.set(false);
//       } else {
//         activeMenu.set(0);
//       }
//     });
//   }

//   return (
//     <div
//       id='interactive-layer'
//       class='w-full h-full flex flex-col items-center relative'
//       onWheel={(e) => wheel(e)}
//       {...handlers}
//     >
//       <div
//         className={
//           ($activeMenu == 0 ? `${defaultClasses} opacity-1 z-10` : `${defaultClasses} opacity-0 z-0`) +
//           ($activeMenu == 0 || $activeMenu == 1 ? ' custom-transition' : ' custom-transition-1')
//         }
//         style={$activeMenu > 0 ? 'transform: translateY(-50%)' : ''}
//       >
//         <HomeContent l={l} />
//       </div>
//       <div
//         className={
//           ($activeMenu == 1
//             ? `${defaultClasses} md:opacity-1 z-10 ${!$isGoUp ? 'delay' : ''}`
//             : `${defaultClasses} md:opacity-0 z-0`) +
//           ($activeMenu == 0 || $activeMenu == 1 ? ' custom-transition' : ' custom-transition-1')
//         }
//         style='min-height: unset'
//       >
//         <AboutUsContent l={l} />
//       </div>
//       <div
//         className={
//           $activeMenu == 2
//             ? `${defaultClasses} md:opacity-1 md:visible z-10`
//             : `${defaultClasses} md:opacity-0 md:invisible z-0`
//         }
//       >
//         <SolutionContent l={l} />
//       </div>
//       <div
//         className={
//           ($activeMenu == 3
//             ? `${defaultClasses} md:opacity-1 md:visible z-10`
//             : `${defaultClasses} md:opacity-0 md:invisible z-0`) +
//           ($activeMenu == 3 ? ' custom-transition' : ' custom-transition-1')
//         }
//       >
//         <CreatorContent l={l} />
//       </div>
//       <div
//         className={
//           ($activeMenu == 4
//             ? `${defaultClasses} md:opacity-1 md:visible z-0`
//             : `${defaultClasses} md:opacity-0 md:invisible z-0`) +
//           ($activeMenu == 4 ? ' custom-transition' : ' custom-transition-1')
//         }
//       >
//         <ContactContent l={l} />
//       </div>
//     </div>
//   );
// }
