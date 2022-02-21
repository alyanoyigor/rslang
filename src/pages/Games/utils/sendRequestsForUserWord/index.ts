import { getStorage } from 'pages/LoginAndRegistration';
import { updateUserWordInGame } from '../updateUserWordInGame';
import { createUserWordInGame } from '../createUserWordInGame';
import { audiocallState, sprintState } from 'state';
import { IUserWordAggregated } from 'state/interfaces';

export const sendRequestsForUserWord = (wordId: string, isRight: boolean, game: 'sprint' | 'audiocall') => {
  const userData = getStorage('authorizedUser');
  if (userData) {
    const { userId, token } = userData;
    const date = new Date();
    const curFullDate = [date.getDate(), String(date.getMonth() + 1).padStart(2, '0'), date.getFullYear()].join('.');

    const userWord =
      game === 'sprint'
        ? (sprintState.userWords as IUserWordAggregated[]).find((wordObj) => wordObj._id === wordId)
        : (audiocallState.userWords as IUserWordAggregated[]).find((wordObj) => wordObj._id === wordId);

    if (userWord) {
      updateUserWordInGame(userId, wordId, token, isRight, userWord, curFullDate, game);
    } else {
      createUserWordInGame(userId, wordId, token, isRight, curFullDate, game);
    }
  }
};
