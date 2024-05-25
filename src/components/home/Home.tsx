import {
  activeSlider,
  isInSlider,
  setActiveSlider,
  setInSlider,
  setNextSlider,
  setPreviousSlider,
  setScrolling,
  smoothScrollToDiv,
} from '@app/app';
import { useStore } from '@nanostores/preact';
import { Component } from 'preact';
import { useSwipeable } from 'react-swipeable';
import './home.scss';

type Props = {
  l: any;
};

export class Home extends Component<Props> {
  textsSlider!: NodeListOf<Element>[];
  imagesSlider!: NodeListOf<Element>[];
  home!: HTMLElement;
  chat!: HTMLElement;
  $activeSlider!: number;
  $isInSlider!: boolean;
  body = document.body;

  running = false;
  interval!: NodeJS.Timeout;
  isMobile = document.body.offsetWidth < 768;
  wheel = (e: WheelEvent) => {
    const scrollTop = Math.max(document.documentElement.scrollTop, this.body.scrollTop);
    // if (scrollTop < window.screen.height / 2) {
    //   this.body.classList.add('overflow-hidden');
    // }
    // console.log(scrollTop > window.screen.height);
    if (this.running) {
      // console.log();

      return;
    } else {
      this.running = true;

      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.running = false;
        this.body.removeAttribute('style');
        if (!this.isMobile) setScrolling(false);
        clearInterval(this.interval);
      }, 500);
    }

    if (scrollTop > window.screen.height * 2) return;
    if (e.deltaY > 0 && e.deltaY < window.screen.height * 2) {
      if (isInSlider.value) {
        // if (activeSlider.value == 2) {
        setInSlider(false);
        smoothScrollToDiv(this.chat);
        // } else {
        // }
        // setNextSlider();
      } else {
        // Normal scroll
      }
    } else {
      console.log(scrollTop);

      if (!isInSlider.value) {
        if (scrollTop < window.screen.height - 400) {
          console.log('to top');
          smoothScrollToDiv(this.home);
          setInSlider(true);
        }
      } else {
        // setPreviousSlider();
      }
    }
  };
  fade = (elms: NodeListOf<Element>, isIn = true, isLeft = true) => {
    elms.forEach((e) => {
      e.setAttribute('style', `animation: fade${isIn ? 'In' : 'Out'}${isLeft ? 'Left' : 'Right'} 1s forwards;`);
    });
  };
  componentDidMount() {
    console.log('home mounted');
    this.home = document.getElementById('home')!;
    this.chat = document.getElementById('chat')!;
    const body = document.body;
    const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    console.log(scrollTop);
    if (scrollTop < window.screen.height / 2) {
      smoothScrollToDiv(this.home);
    } else if (scrollTop > window.screen.height / 2 && scrollTop < window.screen.height * 1.5) {
      smoothScrollToDiv(this.chat);
    }
    this.textsSlider = [
      document.querySelectorAll('.t0'),
      document.querySelectorAll('.t1'),
      document.querySelectorAll('.t2'),
    ];
    activeSlider.subscribe((value) => {
      const isLeft = value > this.$activeSlider;
      this.fade(this.textsSlider[this.$activeSlider], false, isLeft);
      this.fade(this.textsSlider[value], true, !isLeft);
      this.$activeSlider = value;
    });
    isInSlider.subscribe((value) => {
      this.$isInSlider = value;
    });
    document.body.addEventListener('wheel', this.wheel);
  }
  componentWillUnmount() {
    activeSlider.off();
  }
  render(props: Props) {
    this.$activeSlider = useStore(activeSlider);
    this.$isInSlider = useStore(isInSlider);
    const l = props.l;

    const handlers = useSwipeable({
      onSwipedLeft: () => setNextSlider(),
      onSwipedRight: () => setPreviousSlider(),
      swipeDuration: 500,
      preventScrollOnSwipe: true,
      trackMouse: true,
    });

    // const targetDate = new Date('2024-04-01T24:00:00+00:00');
    // let countdown = setInterval(() => {
    //   const now = new Date();
    //   const diff = targetDate.getTime() - now.getTime();
    //   const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    //   const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   const minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    //   const second = Math.floor((diff % (1000 * 60)) / 1000);
    //   document.getElementById('day')!.innerText = day.toString().padStart(2, '0');
    //   document.getElementById('hour')!.innerText = hour.toString().padStart(2, '0');
    //   document.getElementById('minute')!.innerText = minute.toString().padStart(2, '0');
    //   document.getElementById('second')!.innerText = second.toString().padStart(2, '0');
    //   if (diff < 0) {
    //     clearInterval(countdown);
    //     document.getElementById('day')!.innerText = '00';
    //     document.getElementById('hour')!.innerText = '00';
    //     document.getElementById('minute')!.innerText = '00';
    //     document.getElementById('second')!.innerText = '00';
    //   }
    // }, 1000);

    return (
      <div class='home' {...handlers}>
        <div id='home' class='absolute top-[-82px]'></div>
        <div class='h-[82px]'></div>
        <div class='slider-wrapper'>
          <div className='slider'>
            <div class='text-slider'>
              <div class='t0 text-slider-item'>
                <span class='sneak-show'>Sneak Show</span>
                <h1
                  class='text-xl md:text-[2rem] lg:text-4xl custom-transition delay-2'
                  style={!this.$isInSlider ? 'opacity: 0;transform: translateY(80px);' : ''}
                  dangerouslySetInnerHTML={{ __html: l.home.title0 }}
                ></h1>
                <div class='flex gap-4 w-full'>
                  <a class='btn outlined flex-1 lg:flex-initial' href={(l.lang == 'VI' ? '' : '/en') + '/#chat'}>
                    {l.btn.exploreNow}
                  </a>
                  <a class='btn orange gap4 flex-1 lg:flex-initial' href={(l.lang == 'VI' ? '' : '/en') + '/#price'}>
                    {l.btn.getTheDeal}
                  </a>
                </div>
              </div>
              <div class='t1 text-slider-item' style='animation: fadeOutRight 1s forwards'>
                <h2
                  class='text-xl md:text-[2rem] lg:text-4xl custom-transition delay-2'
                  dangerouslySetInnerHTML={{ __html: l.home.title1 }}
                ></h2>
                <div class='flex gap-4 w-full'>
                  <a class='btn outlined flex-1 lg:flex-initial' href={(l.lang == 'VI' ? '' : '/en') + '/#chat'}>
                    {l.btn.exploreNow}
                  </a>
                  <a class='btn orange gap4 flex-1 lg:flex-initial' href={(l.lang == 'VI' ? '' : '/en') + '/#price'}>
                    {l.btn.getTheDeal}
                  </a>
                </div>
              </div>
              <div class='t2 text-slider-item' style='animation: fadeOutRight 1s forwards'>
                <h2
                  class='text-xl md:text-[2rem] lg:text-4xl custom-transition delay-2'
                  dangerouslySetInnerHTML={{ __html: l.home.title2 }}
                ></h2>
                <div class='flex gap-4 w-full'>
                  <a class='btn outlined flex-1 lg:flex-initial' href={(l.lang == 'VI' ? '' : '/en') + '/#chat'}>
                    {l.btn.exploreNow}
                  </a>
                  <a class='btn orange gap4 flex-1 lg:flex-initial' href={(l.lang == 'VI' ? '' : '/en') + '/#price'}>
                    {l.btn.getTheDeal}
                  </a>
                </div>
              </div>
              <ul class='indicators'>
                <li
                  class='custom-transition'
                  className={this.$activeSlider == 0 ? 'active custom-transition' : 'custom-transition'}
                  onClick={() => setActiveSlider(0)}
                ></li>
                <li
                  class='custom-transition'
                  className={this.$activeSlider == 1 ? 'active custom-transition' : 'custom-transition'}
                  onClick={() => setActiveSlider(1)}
                ></li>
                <li
                  class='custom-transition'
                  className={this.$activeSlider == 2 ? 'active custom-transition' : 'custom-transition'}
                  onClick={() => setActiveSlider(2)}
                ></li>
              </ul>
            </div>
            <div class='image-slider'>
              <img src='/images/home-big-planet.svg' class='absolute lg:w-[100%] md:w-[80%] w-[130%] max-w-none' />
              <div class='image-slider-item t0'>
                <img src='/images/mobile-lg.png' class='h-[50vh] max-h-[632px] hidden lg:flex' />
                <img src='/images/mobile-md.png' class='h-[50vh] max-h-[632px] hidden md:flex lg:hidden' />
                <img src='/images/mobile-sm.png' class='lg:h-[60vh] md:hidden' />
              </div>
              <div class='image-slider-item t1' style='animation: fadeOutRight 1s forwards;'>
                <img
                  src='/images/desktop-lg.png'
                  class='h-[50vh] max-h-[632px] max-w-none mr-[-100px] hidden lg:flex'
                />
                <img src='/images/desktop-md.png' class='h-[40vh] hidden md:flex lg:hidden' />
                <img src='/images/desktop-sm.png' class='h-[30vh] md:hidden' />
              </div>
              <div class='image-slider-item t2' style='animation: fadeOutRight 1s forwards;'>
                <img src='/images/tablet-lg.png' class='h-[80vh] hidden lg:flex' />
                <img src='/images/tablet-md.png' class='h-[60vh] hidden md:flex lg:hidden' />
                <img src='/images/tablet-sm.png' class='lg:h-[60vh] md:hidden' />
              </div>
              {/* <div class='absolute top-0 sm:top-[200px] left-0 sm:left-[20%] p-2 bg-white rounded-lg flex'>
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
              </div> */}
            </div>
          </div>
        </div>
        {/* <div class='bg-white flex flex-col rounded-lg gap-3 w-full p-4 items-center sm:max-w-[360px]'>
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
        </div> */}
        <div class='lg:flex w-full items-center justify-center self-end hidden'>
          <div class='pb-10 flex flex-col items-center justify-center gap-2'>
            <div class='w-[18px] h-[32px] rounded-[18px] border-2 border-white relative'>
              <div class='scroll-animation'></div>
            </div>
            <div class='font-bold'>{l.home.scrollDown}</div>
          </div>
        </div>
      </div>
    );
  }
}
