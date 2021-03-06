import { IPageWords } from 'state/interfaces';
import { getArray } from './getArrayWords';

const ListenPrevButton = (prevButton: Element, elem: HTMLElement, currentPage: IPageWords) => {
  if (currentPage.page === 0) {
    prevButton.classList.add('disabled');
  } else {
    prevButton.addEventListener('click', () => {
      currentPage.page--;
      localStorage.setItem('page', JSON.stringify(currentPage.page));
      getArray(currentPage, elem);
    });
  }
};

const ListenNextButton = (nextButton: Element, elem: HTMLElement, currentPage: IPageWords) => {
  if (currentPage.page === 29) {
    nextButton.classList.add('disabled');
  } else {
    nextButton.addEventListener('click', () => {
      currentPage.page++;
      localStorage.setItem('page', JSON.stringify(currentPage.page));
      getArray(currentPage, elem);
    });
  }
};

const listenButtonPagination = (buttonGetPage: Element[], elem: HTMLElement, currentPage: IPageWords) => {
  buttonGetPage.forEach((el, i) => {
    el.addEventListener('click', () => {
      const currentElement = el.firstElementChild;
      if (currentElement !== null) {
        if (Number(currentElement.textContent)) {
          currentPage.page = Number(currentElement.textContent) - 1;
        } else {
          const prevDotElement = Number(buttonGetPage[i - 1].firstElementChild?.textContent);
          const nextDotElement = Number(buttonGetPage[i + 1].firstElementChild?.textContent);
          if (prevDotElement && nextDotElement) {
            currentPage.page = prevDotElement == 1 ? nextDotElement - 2 : prevDotElement;
          }
        }
        localStorage.setItem('page', JSON.stringify(currentPage.page));
        getArray(currentPage, elem);
      }
    });
  });
};

const listenSelectPart = (currentParent: HTMLElement, currentPage: IPageWords) => {
  const partPageLink = document.querySelector('.form-select');
  if (partPageLink instanceof HTMLSelectElement) {
    const selectedPart = partPageLink.children[currentPage.group];
    if (selectedPart instanceof HTMLOptionElement) {
      selectedPart.selected = true;
    }
    partPageLink.addEventListener('input', (e) => {
      e.preventDefault();
      currentPage.group = +partPageLink.value - 1;
      localStorage.setItem('group', JSON.stringify(currentPage.group));
      getArray(currentPage, currentParent);
    });
    const main = document.querySelector('.book');
    if (main instanceof HTMLElement) {
      switch (partPageLink.value) {
        case '1': {
          partPageLink.style.backgroundColor = '#ff9b9b';
          main.style.backgroundColor = '#ffd6d649';
          break;
        }
        case '2': {
          partPageLink.style.backgroundColor = '#fff6a8';
          main.style.backgroundColor = '#fffbd649';
          break;
        }
        case '3': {
          partPageLink.style.backgroundColor = '#d5ff9e';
          main.style.backgroundColor = '#edffd649';
          break;
        }
        case '4': {
          partPageLink.style.backgroundColor = '#92fdff';
          main.style.backgroundColor = '#d6feff49';
          break;
        }
        case '5': {
          partPageLink.style.backgroundColor = '#e16aff';
          main.style.backgroundColor = '#ffd6f849';
          break;
        }
        case '6': {
          partPageLink.style.backgroundColor = '#ff6bd2';
          main.style.backgroundColor = '#ffd2dd49';
          break;
        }
        case '7': {
          partPageLink.style.backgroundColor = '#fbff7b';
          main.style.backgroundColor = '#e0e47d49';
          break;
        }
      }
    }
  }
};

export const listenPagination = (currentPage: IPageWords) => {
  const currentParent = document.querySelector('.book__wrapper');
  if (currentParent instanceof HTMLElement) {
    listenSelectPart(currentParent, currentPage);
    const pageLink = document.querySelector('.pagination');
    if (pageLink !== null) {
      pageLink.addEventListener('click', (e) => {
        e.preventDefault();
      });

      const collectionButtons = document.querySelectorAll('.pagination li') as NodeListOf<HTMLElement>;
      if (collectionButtons !== null && collectionButtons) {
        ListenPrevButton(collectionButtons[0], currentParent, currentPage);
        listenButtonPagination([...collectionButtons].slice(1, -1), currentParent, currentPage);
        ListenNextButton(collectionButtons[collectionButtons.length - 1], currentParent, currentPage);
      }
    }
  }
};
