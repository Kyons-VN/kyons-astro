import { activeSolution, setActiveSolution, setNextSolution, setPreviousSolution } from '@app/app';
import { useStore } from '@nanostores/preact';
import { Component } from 'preact';
import { isMobile } from 'react-device-detect';
import { useSwipeable } from 'react-swipeable';
import './students.scss';

type Props = {
  l: any;
};

export class Students extends Component<Props> {
  s: NodeListOf<Element>[] = [];
  handlers = {};
  fade = (elms: NodeListOf<Element>, isIn = true, isLeft = true) => {
    elms.forEach((e) => {
      e.setAttribute('style', `animation: fade${isIn ? 'In' : 'Out'}${isLeft ? 'Left' : 'Right'} 1s forwards;`);
    });
  };
  componentDidMount() {
    // let $activeSolution = 0;
    this.s = [document.querySelectorAll('.s0'), document.querySelectorAll('.s1'), document.querySelectorAll('.s2')];
    // activeSolution.subscribe((value) => {
    //   const isLeft = value > $activeSolution;
    //   this.fade(this.s[$activeSolution], false, isLeft);
    //   // setTimeout(() => {
    //   this.fade(this.s[value], true, !isLeft);
    //   // }, 1000);
    //   $activeSolution = value;
    // });
    // isInSolution.subscribe((value) => {
    //   $isInSolution = value;
    // });
    if (isMobile) {
      this.handlers = useSwipeable({
        // onSwipedLeft: () => setActiveMenu($activeMenu + 1),
        // onSwipedRight: () => setActiveMenu($activeMenu - 1),
        // onSwipedDown: () => setActiveMenu($activeMenu-1),
        // onSwipedUp: () => setActiveMenu($activeMenu+1),
        onSwipedLeft: () => setNextSolution(),
        onSwipedRight: () => setPreviousSolution(),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true,
      });
    }
  }
  // componentWillUnmount() {
  //   activeSolution.off();
  // }
  render(props: any) {
    const l = props.l;
    // state === this.state
    const $activeSolution = useStore(activeSolution);

    return (
      <div class='students'>
        <div id='students' class='absolute top-[-82px]'></div>
        <div class='w-full max-w-[505px] flex flex-col gap-2 text-center'>
          <strong class='flex flex-col text-lightBlue-1'>{l.students.forStudents}</strong>
          <h2 class='text-xl lg:text-3xl'>{l.students.completeLearning}</h2>
        </div>
        <div class='w-full max-w-[664px] flex flex-row justify-between relative'>
          <div class='absolute w-[calc(100%_-_90px)] h-1 bg-secondaryBlue bottom-[calc(50%_+_2px)] left-[45px]'>
            <div class='w-full bg-orange h-full' style={'width: ' + Math.ceil(($activeSolution / 3) * 100) + '%'}></div>
          </div>
          <div>
            <img
              onClick={() => setActiveSolution(0)}
              src={'/images/' + ($activeSolution == 0 ? 'location' : 'dot') + '.svg'}
              alt='location'
              class='dot-shadow'
            />
          </div>
          <div>
            <img
              onClick={() => setActiveSolution(1)}
              src={'/images/' + ($activeSolution == 1 ? 'location' : 'dot') + '.svg'}
              alt='location'
              class='dot-shadow'
            />
          </div>
          <div>
            <img
              onClick={() => setActiveSolution(2)}
              src={'/images/' + ($activeSolution == 2 ? 'location' : 'dot') + '.svg'}
              alt='dot'
              class='dot-shadow'
            />
          </div>
          <div>
            <img
              onClick={() => setActiveSolution(3)}
              src={'/images/' + ($activeSolution == 3 ? 'location' : 'dot') + '.svg'}
              alt='dot'
              class='dot-shadow'
            />
          </div>
        </div>
        <div class='flex flex-col-reverse lg:flex-row w-full max-w-[870px] lg:max-h-[60vh] gap-6'>
          <div class='flex-1 relative flex flex-col items-center gap-4 lg:h-full'>
            <img
              onClick={() => setPreviousSolution()}
              src='/images/arrow-left.svg'
              alt='Trước'
              class={
                'absolute hidden lg:block cursor-pointer left-[-100px] top-[calc(50%_-_39px)]' +
                ($activeSolution == 0 ? ' cursor-not-allowed opacity-20' : '')
              }
            />
            <img
              src={'/images/step-' + $activeSolution + '.png'}
              alt={l.students['step' + ($activeSolution + 1)]}
              class='h-[90%]'
            />
            <a
              href='https://student.kyons.vn'
              class='gap-4 px-[16px] py-[6px] cursor-pointer text-white font-[600] text-center h-10 rounded bg-orangeGradient shadow-orange1 items-center justify-center flex w-full lg:hidden'
            >
              {l.btn.studyNow}
            </a>
          </div>
          <div class='flex flex-col items-center w-full max-w-[435px] p-0 lg:py-10 lg:px-6 text-left lg:items-start justify-start gap-6 relative'>
            <img
              onClick={() => setNextSolution()}
              src='/images/arrow-right.svg'
              alt='Sau'
              class={
                'absolute hidden lg:block cursor-pointer right-[-100px] top-[calc(50%_-_39px)]' +
                ($activeSolution == 3 ? ' cursor-not-allowed opacity-20' : '')
              }
            />
            <h4
              dangerouslySetInnerHTML={{ __html: l.students['step' + ($activeSolution + 1)] }}
              class='text-center lg:text-left text-sm lg:text-2xl '
            />
            <p class='text-center lg:text-left'>{l.students['step' + ($activeSolution + 1) + 'Desc']}</p>
            <a
              href='https://student.kyons.vn'
              class='gap-4 px-[16px] py-[6px] cursor-pointer text-white font-[600] text-center h-10 rounded bg-orangeGradient shadow-orange1 items-center justify-center large hidden lg:flex'
            >
              {l.btn.studyNow}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
