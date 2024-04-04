import { atom } from 'nanostores';

export const isMenuOpen = atom(false);

export const activeMenu = atom(2);
export const isGoUp = atom(false);

export const activeSlider = atom(0);
export const isInSlider = atom(true);

export const isScrolling = atom(false);

function changeHash(index: number) {
  console.log('index:', index);

  switch (index) {
    case 0:
      window.location.hash = '';
      break;
    case 1:
      window.location.hash = 'about-us';
      break;

    default:
      break;
  }
  const e = new Event('onhashchange');
  // window.dispatchEvent(e);
}

export function setActive(index: number, force: boolean = false) {
  if (index < 0 || index > 4 || isScrolling.get() || activeMenu.get() == index) return;
  isGoUp.set(activeMenu.get() > index);

  if (force) {
    activeMenu.set(index);

    if (index == 2) {
      isInSlider.set(true);
    } else {
      isInSlider.set(false);
    }
    // changeHash(index)
    return;
  }
  if (activeMenu.get() == 2) {
    if (activeSlider.get() == 0 && index == 1) activeMenu.set(1);
    else if (activeSlider.get() == 2 && index == 3) activeMenu.set(3);
    else {
      if (index == 3) {
        activeSlider.set(activeSlider.get() + 1);
      } else if (index == 1) {
        activeSlider.set(activeSlider.get() - 1);
      }
    }
  } else {
    activeMenu.set(index);
  }
  if (activeMenu.get() == 2) {
    isInSlider.set(true);
  } else {
    isInSlider.set(false);
  }
}

export function setNextSlider() {
  console.log(activeSlider.get());
  if (activeSlider.get() > 1) return;
  activeSlider.set(activeSlider.get() + 1);
}

export function setPreviousSlider() {
  if (activeSlider.get() < 1) return;
  activeSlider.set(activeSlider.get() - 1);
}

export function setActiveSlider(index: number) {
  if (index < 0 || index > 3 || isScrolling.get()) return;
  activeSlider.set(index);
}
export function setInSlider(value: boolean) {
  isInSlider.set(value);
}

export function setScrolling(active: boolean) {
  isScrolling.set(active);
}

export function toggleMenu() {
  console.log('run?');

  isMenuOpen.set(!isMenuOpen.get());
}

export function toTopFunction() {
  smoothScrollToDiv(document.getElementById('home')!);
}

export function smoothScrollToDiv(element: HTMLElement, duration = 500) {
  document.body.classList.remove('overflow-hidden');
  setTimeout(() => {
    if (element) {
      console.log('element:', element.id);

      const startingY = window.scrollY;
      const parentOffsetTop = element.parentElement!.offsetTop;
      const targetY = element.offsetTop + parentOffsetTop;
      console.log('targetY:', targetY);

      const distance = targetY - startingY;
      let startTime: number | null = null;

      const animationStep = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        const easedProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * (progress - 1), 2) / 2;
        const newY = startingY + distance * easedProgress;
        window.scrollTo(0, newY);
        if (progress < 1) {
          window.requestAnimationFrame(animationStep);
        }
      };

      window.requestAnimationFrame(animationStep);
    } else {
      console.error('Element with id', element, 'not found.');
    }
  }, 100);

}
