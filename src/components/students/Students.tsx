import { activeSolution, isInSolution, setActiveSolution } from '@app/app';
import { useStore } from '@nanostores/preact';
import { Component } from 'preact';
import './students.scss';

type Props = {
  l: any;
};

export class Students extends Component<Props> {
  s: NodeListOf<Element>[] = [];
  fade = (elms: NodeListOf<Element>, isIn = true, isLeft = true) => {
    elms.forEach((e) => {
      e.setAttribute('style', `animation: fade${isIn ? 'In' : 'Out'}${isLeft ? 'Left' : 'Right'} 1s forwards;`);
    });
  };
  componentDidMount() {
    let $activeSolution = 0;
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
  }
  // componentWillUnmount() {
  //   activeSolution.off();
  // }
  render(props: any) {
    const l = props.l;
    // state === this.state
    const $activeSolution = useStore(activeSolution);
    const $isInSolution = useStore(isInSolution);

    const setActive = (index: number) => {
      setActiveSolution(index);
    };
    return (
      <div id='students'>
        <div class='w-full max-w-[505px] flex flex-col gap-2 text-center'>
          <strong class='flex flex-col text-lightBlue-1'>{l.students.forStudents}</strong>
          <h2 class=''>{l.students.completeLearning}</h2>
        </div>
        <div class='w-full max-w-[664px] flex flex-row justify-between relative'>
          <div class='absolute w-[calc(100%_-_90px)] h-1 bg-secondaryBlue bottom-[50px] left-[45px]'>
            <div class='w-full bg-orange h-full' style={'width: ' + Math.ceil(($activeSolution / 3) * 100) + '%'}></div>
          </div>
          <div>
            <img
              onClick={() => setActive(0)}
              src={'/images/' + ($activeSolution == 0 ? 'location' : 'dot') + '.svg'}
              alt='location'
              class='dot-shadow'
            />
          </div>
          <div>
            <img
              onClick={() => setActive(1)}
              src={'/images/' + ($activeSolution == 1 ? 'location' : 'dot') + '.svg'}
              alt='location'
              class='dot-shadow'
            />
          </div>
          <div>
            <img
              onClick={() => setActive(2)}
              src={'/images/' + ($activeSolution == 2 ? 'location' : 'dot') + '.svg'}
              alt='dot'
              class='dot-shadow'
            />
          </div>
          <div>
            <img
              onClick={() => setActive(3)}
              src={'/images/' + ($activeSolution == 3 ? 'location' : 'dot') + '.svg'}
              alt='dot'
              class='dot-shadow'
            />
          </div>
        </div>
        <div class='flex w-full max-w-[870px] max-h-[60vh]'>
          <div class='flex-1'>
            <img src={'/images/step-' + $activeSolution + '.png'} alt={l.students.step1} class='h-[90%]' />
          </div>
          <div class='flex flex-col w-full max-w-[435px] py-10 px-6 text-left items-start justify-start gap-6'>
            <h4 dangerouslySetInnerHTML={{ __html: l.students['step' + ($activeSolution + 1)] }} />
            <p>{l.students.step1Desc}</p>
            <a href='https://student.kyons.vn' class='btn large'>
              {l.btn.studyNow}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
