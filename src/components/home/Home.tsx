import { Component } from 'preact';
import { useSwipeable } from 'react-swipeable';
import './home.scss';

type Props = {
  l: any;
};

export class Home extends Component<Props> {
  render(props: Props) {
    const handlers = useSwipeable({
      onSwipedLeft: () => setNextSlider(),
      onSwipedRight: () => setPreviousSlider(),
      swipeDuration: 500,
      preventScrollOnSwipe: true,
      trackMouse: true,
    });
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
