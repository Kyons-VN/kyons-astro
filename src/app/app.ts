import { atom } from 'nanostores';

export const isMenuOpen = atom(false);

export const activeMenu = atom(2);
export const isGoUp = atom(false);

export const activeSolution = atom(0);
export const isInSolution = atom(true);

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
      isInSolution.set(true);
    } else {
      isInSolution.set(false);
    }
    // changeHash(index)
    return;
  }
  if (activeMenu.get() == 2) {
    if (activeSolution.get() == 0 && index == 1) activeMenu.set(1);
    else if (activeSolution.get() == 2 && index == 3) activeMenu.set(3);
    else {
      if (index == 3) {
        activeSolution.set(activeSolution.get() + 1);
      } else if (index == 1) {
        activeSolution.set(activeSolution.get() - 1);
      }
    }
  } else {
    activeMenu.set(index);
  }
  if (activeMenu.get() == 2) {
    isInSolution.set(true);
  } else {
    isInSolution.set(false);
  }
}

export function setNextSolution() {
  if (activeSolution.get() > 2) return;
  activeSolution.set(activeSolution.get() + 1);
}

export function setPreviousSolution() {
  if (activeSolution.get() < 1) return;
  activeSolution.set(activeSolution.get() - 1);
}

export function setActiveSolution(index: number) {
  if (index < 0 || index > 3 || isScrolling.get()) return;
  activeSolution.set(index);
}

export function setScrolling(active: boolean) {
  isScrolling.set(active);
}

export function toggleMenu() {
  console.log('run?');

  isMenuOpen.set(!isMenuOpen.get());
}
