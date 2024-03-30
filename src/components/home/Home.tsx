import {
  activeSlider,
  isInSlider,
  setActiveSlider,
  setInSlider,
  setNextSlider,
  setPreviousSlider,
  smoothScrollToDiv,
} from '@app/app';
import { Component } from 'preact';
import { useSwipeable } from 'react-swipeable';
import './home.scss';

type Props = {
  l: any;
};

export class Home extends Component<Props> {
  textsSlider!: NodeListOf<Element>[];
  imagesSlider!: NodeListOf<Element>[];
  _activeSlider = 0;
  _isInSlider = false;
  running = false;
  home!: HTMLElement;
  wheel = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      if (this._isInSlider) {
        if (this._activeSlider == 2) {
          setInSlider(false);
        } else {
        }
        setNextSlider();
      } else {
        // Normal scroll
      }
    } else {
      if (!this._isInSlider) {
        const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        console.log(scrollTop);

        if (scrollTop < window.screen.height - 100) {
          console.log('to top');

          smoothScrollToDiv(this.home);
        }
      }
    }

    // } else {
    //   setActiveMenu($activeMenu + 1);
    // }
    //   const body = document.body;
    //   if (body.classList.contains('overflow-hidden')) return;
    //   // console.log(e.view.scrollTo(0,));
    //   //  e.stopPropagation()
    //   // 	e.preventDefault()
    //   //   e.stopImmediatePropagation()
    //   // console.log(running);
    //   if (running) {
    //     // console.log();
    //     return;
    //   } else {
    //     running = true;
    //     if (isMobile) {
    //       // console.log(window.scrollY);
    //       // if (window.scrollY > screenHeight / 2) {
    //       //   console.log('1');
    //       //   setActiveMenu(1);
    //       // } else {
    //       //   console.log('2');
    //       //   setActiveMenu(0);
    //       // }
    //     } else {
    //       root.setAttribute('style', 'scroll-behavior: auto;');
    //       if (e['wheelDelta'] > 0) {
    //         setActiveMenu($activeMenu - 1);
    //       } else {
    //         setActiveMenu($activeMenu + 1);
    //       }
    //       setScrolling(true);
    //     }
    //     clearInterval(interval);
    //     interval = setInterval(() => {
    //       running = false;
    //       root.removeAttribute('style');
    //       if (!isMobile) setScrolling(false);
    //       clearInterval(interval);
    //     }, 500);
    //   }
  };
  fade = (elms: NodeListOf<Element>, isIn = true, isLeft = true) => {
    elms.forEach((e) => {
      e.setAttribute('style', `animation: fade${isIn ? 'In' : 'Out'}${isLeft ? 'Left' : 'Right'} 1s forwards;`);
    });
  };
  componentDidMount() {
    console.log('home mounted');
    this.home = document.getElementById('home')!;
    const body = document.body;
    const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    console.log(scrollTop);
    if (scrollTop < window.screen.height) {
      setActiveSlider(0);
      setInSlider(true);
    } else {
      setInSlider(false);
      setActiveSlider(2);
    }
    this.textsSlider = [
      document.querySelectorAll('.t0'),
      document.querySelectorAll('.t1'),
      document.querySelectorAll('.t2'),
    ];
    this.imagesSlider = [
      document.querySelectorAll('.i0'),
      document.querySelectorAll('.i1'),
      document.querySelectorAll('.i2'),
    ];
    activeSlider.subscribe((value) => {
      const isLeft = value > this._activeSlider;
      this.fade(this.textsSlider[this._activeSlider], false, isLeft);
      this.fade(this.textsSlider[value], true, !isLeft);
      this.fade(this.imagesSlider[this._activeSlider], false, isLeft);
      this.fade(this.imagesSlider[value], true, !isLeft);
      this._activeSlider = value;
    });
    isInSlider.subscribe((value) => {
      console.log('isInSlider', value);

      this._isInSlider = value;
      if (value) {
        // document.getElementById('home')!.
      }
    });
    document.body.addEventListener('wheel', this.wheel);
  }
  componentWillUnmount() {
    activeSlider.off();
  }
  render(props: Props) {
    const l = props.l;

    const handlers = useSwipeable({
      onSwipedLeft: () => setNextSlider(),
      onSwipedRight: () => setPreviousSlider(),
      swipeDuration: 500,
      preventScrollOnSwipe: true,
      trackMouse: true,
    });

    const targetDate = new Date('2024-04-01T24:00:00+00:00');
    let countdown = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      const day = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((diff % (1000 * 60)) / 1000);
      document.getElementById('day')!.innerText = day.toString().padStart(2, '0');
      document.getElementById('hour')!.innerText = hour.toString().padStart(2, '0');
      document.getElementById('minute')!.innerText = minute.toString().padStart(2, '0');
      document.getElementById('second')!.innerText = second.toString().padStart(2, '0');
      if (diff < 0) {
        clearInterval(countdown);
        document.getElementById('day')!.innerText = '00';
        document.getElementById('hour')!.innerText = '00';
        document.getElementById('minute')!.innerText = '00';
        document.getElementById('second')!.innerText = '00';
      }
    }, 1000);

    return (
      <div class='home' {...handlers}>
        <div id='home' class='absolute top-[-82px]'></div>
        <div class='h-[82px]'></div>
        <div class='slider'>
          <div class='text-slider'>
            <div class='t0 slider-item'>
              <h1
                class='text-2xl custom-transition delay-2'
                style={!this._isInSlider ? 'opacity: 0;transform: translateY(80px);' : ''}
                dangerouslySetInnerHTML={{ __html: l.home.title0 }}
              ></h1>
              <div class=''>
                <a class='btn outlined'>{l.btn.discoverNow}</a>
                <a class='btn '>{l.btn.finalizeOrder}</a>
              </div>
            </div>
            <div class='t1 slider-item'>
              <h2
                class='text-2xl custom-transition delay-2'
                style={!this._isInSlider ? 'opacity: 0;transform: translateY(80px);' : ''}
                dangerouslySetInnerHTML={{ __html: l.home.title1 }}
              ></h2>
            </div>
            <div class='t2 slider-item'>
              <h2
                class='text-2xl custom-transition delay-2'
                style={!this._isInSlider ? 'opacity: 0;transform: translateY(80px);' : ''}
                dangerouslySetInnerHTML={{ __html: l.home.title2 }}
              ></h2>
            </div>
          </div>
          <ul class='indicators'>
            <li class='custom-transition'></li>
            <li class='custom-transition'></li>
            <li class='custom-transition'></li>
          </ul>
        </div>
        <div class='relative w-full flex items-center justify-center'>
          <img src='/images/iphone.png' class='sm:h-[40vh]' />
          <div class='absolute top-0 sm:top-[200px] left-0 sm:left-[20%] p-2 bg-white rounded-lg flex'>
            <div class='flex gap-2'>
              <div class='w-10 h-10 flex items-center justify-center bg-emerald-0 rounded-lg'>
                <i class='icon-Profile text-[24px]'></i>
              </div>
              <div class='flex flex-col text-primaryBlue font-bold items-start'>
                <div class='text-base'>{l.home.fourty}</div>
                <div class='text-xs'></div>
                {l.home.users}
              </div>
            </div>
          </div>
        </div>
        <div class='bg-white flex flex-col rounded-lg gap-3 w-full p-4 items-center sm:max-w-[360px]'>
          <strong class='text-primaryBlue'>{l.home.promotionEnd}</strong>
          <div class='flex gap-1 w-full items-center justify-center'>
            <div class='flex flex-col w-[calc((100%_-_36px)_/_4)] max-w-[70px] bg-blueGrey-800 py-[14px] rounded-lg'>
              <strong id='day' class='text-3xl'>
                &nbsp;
              </strong>
              {l.home.days}
            </div>
            <span class='text-3xl text-primaryBlue'>:</span>
            <div class='flex flex-col w-[calc((100%_-_36px)_/_4)] max-w-[70px] bg-blueGrey-800 py-[14px] rounded-lg'>
              <strong id='hour' class='text-3xl'>
                &nbsp;
              </strong>
              {l.home.hours}
            </div>
            <span class='text-3xl text-primaryBlue'>:</span>
            <div class='flex flex-col w-[calc((100%_-_36px)_/_4)] max-w-[70px] bg-blueGrey-800 py-[14px] rounded-lg'>
              <strong id='minute' class='text-3xl'>
                &nbsp;
              </strong>
              {l.home.minutes}
            </div>
            <span class='text-3xl text-primaryBlue'>:</span>
            <div class='flex flex-col w-[calc((100%_-_36px)_/_4)] max-w-[70px] bg-blueGrey-800 py-[14px] rounded-lg'>
              <strong id='second' class='text-3xl'>
                &nbsp;
              </strong>
              {l.home.seconds}
            </div>
          </div>
          <a href={`this._{l.lang == 'VI' ? '' : '/en'}/pricing`} class='btn orange w-full'>
            {l.btn.bookNow}
          </a>
        </div>
      </div>
    );
  }
}
