import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  ITeamsData,
  IGamesData,
  IPayersData,
  IGameStatData,
} from '../dto/teams';
import { instance } from './index';

const source = axios.CancelToken.source();

export const getTeams = createAsyncThunk(
  'teams/getTeams',
  async (data: { page?: number }, { signal }) => {
    signal.addEventListener('abort', () => {
      source.cancel();
    });

    const response: AxiosResponse<ITeamsData> = await instance.get('/teams', {
      params: { page: data.page },
    });

    return response.data;
  }
);

export const getGames = createAsyncThunk(
  'games/getGames',
  async (data: { id: number; page?: number }, { signal }) => {
    signal.addEventListener('abort', () => {
      source.cancel();
    });
    const response: AxiosResponse<IGamesData> = await instance.get('/games', {
      params: { team_ids: [data.id], per_page: 10, page: data.page },
    });

    return response.data;
  }
);

export const getPlayers = createAsyncThunk(
  'players/getPlayers',
  async (data: { page: number }, { signal }) => {
    signal.addEventListener('abort', () => {
      source.cancel();
    });

    const response: AxiosResponse<IPayersData> = await instance.get(
      '/players',
      {
        params: { page: data.page, per_page: 100 },
      }
    );

    return response.data;
  }
);

export const getStats = createAsyncThunk(
  'stats/getStats',
  async (
    data: { gameId?: number; playerId?: number; page?: number | null },
    { signal }
  ) => {
    signal.addEventListener('abort', () => {
      source.cancel();
    });
    const response: AxiosResponse<IGameStatData> = await instance.get(
      '/stats',
      {
        params: {
          game_ids: [data.gameId],
          player_ids: [data.playerId],
          page: data.page,
        },
      }
    );

    return response.data;
  }
);
