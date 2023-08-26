import { DesktopBackground } from './backgrounds/DesktopBackground';

type Props = {
  l: any;
};

export default function BackgroundLayer({ l }: Props) {
  // const defaultClasses = 'w-full h-full transition-opacity opacity-';
  // const $activeMenu = useStore(activeMenu);
  // function animate() {
  //   const date = new Date();

  //   const hour = date.getHours() % 12;
  //   const minute = date.getMinutes();
  //   const second = date.getSeconds();

  //   console.log(second);

  //   requestAnimationFrame(animate);
  // }

  // requestAnimationFrame(animate);
  // console.log(window.screen);
  return <DesktopBackground />;

  // return (
  //   <div class='w-full h-full flex items-center relative'>
  //     <div className={$activeMenu == 0 ? `${defaultClasses}100` : `${defaultClasses}0`} class='opacity-100'></div>
  //     {/* <div
  //       className={$activeMenu == 1 ? `${defaultClasses}100 bg-about-us` : `${defaultClasses}0 bg-about-us`}
  //       class='opacity-0'
  //     ></div>
  //     <div
  //       className={$activeMenu == 2 ? `${defaultClasses}100 bg-lightOrange-4` : `${defaultClasses}0 bg-lightOrange-4`}
  //       class='opacity-0'
  //     ></div> */}
  //   </div>
  // );
}
