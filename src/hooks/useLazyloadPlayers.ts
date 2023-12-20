import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { AppDispatch, RootState } from '../store';
import { getPlayers } from '../api/teams';

export const useLazyLoadPlayers = () => {
  const { playersMeta } = useSelector((store: RootState) => store.teams);
  const dispatch = useDispatch<AppDispatch>();

  const { current_page, total_pages } = playersMeta;

  const loadPlayers = () => {
    for (let i = 1; i <= 4; i++) {
      const isNext =
        !Number(current_page) ||
        Number(current_page) + i <= Number(total_pages);

      if (isNext) {
        debounce(
          () =>
            dispatch(
              getPlayers({ page: Number(playersMeta.current_page) + i })
            ),
          400 * i
        )();
      }
    }
  };

  return loadPlayers;
};
