import { createSlice } from '@reduxjs/toolkit';

import {
  ITeam,
  ITeamsData,
  IGame,
  IGamesData,
  IMeta,
  IPlayers,
  IPayersData,
  IGameStat,
  IGameStatData,
} from '../../dto/teams';
import { getTeams, getGames, getPlayers, getStats } from '../../api/teams';

const initialMeta = {
  current_page: 0,
  next_page: 1,
  per_page: null,
  total_count: null,
  total_pages: 0,
};

interface ITeamsState {
  teams: [] | ITeam[];
  teamsMeta: IMeta;
  games: [] | IGame[];
  gamesMeta: IMeta;
  gameStat: [] | IGameStat[];
  gameStatMeta: IMeta;
  players: IPlayers;
  playersMeta: IMeta;
}

const initialState: ITeamsState = {
  teams: [],
  teamsMeta: initialMeta,
  games: [],
  gamesMeta: initialMeta,
  gameStat: [],
  gameStatMeta: initialMeta,
  players: {},
  playersMeta: initialMeta,
};

export const TeamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    resetStats: (state) => {
      state.gameStat = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTeams.fulfilled,
      (state, { payload }: { payload: ITeamsData }) => {
        const { data, meta } = payload;
        state.teams =
          meta.current_page !== meta.total_pages
            ? data
            : [...state.teams, ...data];
        state.teamsMeta = payload.meta;
      }
    );

    builder.addCase(getTeams.rejected, (_state, action) => {
      console.log(action.payload);
    });

    builder.addCase(
      getGames.fulfilled,
      (state, { payload }: { payload: IGamesData }) => {
        state.games = payload.data;
        state.gamesMeta = payload.meta;
      }
    );
    builder.addCase(getGames.rejected, (_state, action) => {
      console.log(action.payload);
    });

    builder.addCase(
      getPlayers.fulfilled,
      (state, { payload }: { payload: IPayersData }) => {
        const data: IPlayers = { ...state.players };

        payload.data.forEach((item) => {
          if (!data[item.team.id]) {
            data[item.team.id] = [item];
          } else {
            const isExist = data[item.team.id].find(
              (player) => player.id === item.id
            );

            if (!isExist) {
              data[item.team.id] = [...data[item.team.id], item];
            }
          }
        });

        state.players = { ...data };
        state.playersMeta = payload.meta;
      }
    );
    builder.addCase(getPlayers.rejected, (_state, action) => {
      console.log(action.payload);
    });

    builder.addCase(
      getStats.fulfilled,
      (state, { payload }: { payload: IGameStatData }) => {
        state.gameStat = [...state.gameStat, ...payload.data];
        state.gameStatMeta = payload.meta;
      }
    );
    builder.addCase(getStats.rejected, (_state, action) => {
      console.log(action.payload);
    });
  },
});

export const { resetStats } = TeamSlice.actions;

export default TeamSlice.reducer;
