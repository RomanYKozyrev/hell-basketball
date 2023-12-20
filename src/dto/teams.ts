export interface ITeam {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface IGame {
  id: number;
  date: string;
  home_team: ITeam;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: ITeam;
  visitor_team_score: number;
}

export interface IGameInStat {
  date: string;
  home_team_id: number;
  home_team_score: number;
  id: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team_id: number;
  visitor_team_score: number;
}

export interface IPlayer {
  id: number;
  first_name: string;
  height_feet: number | boolean;
  height_inches: number | boolean;
  last_name: string;
  position: string;
  team: ITeam;
  weight_pounds: number | boolean;
}

export interface IPlayers {
  [key: string]: [] | IPlayer[];
}

export interface IGameStat {
  id: number;
  ast: number | null;
  blk: number | null;
  pts: number | null;
  player: IPlayer;
  min: string | null;
  team: ITeam;
  game: IGameInStat;
}

export interface IMeta {
  total_pages: number | 0;
  current_page: number | 0;
  next_page: number | null;
  per_page: number | null;
  total_count: number | null;
}

export interface ITeamsData {
  data: ITeam[];
  meta: IMeta;
}

export interface IGamesData {
  data: IGame[];
  meta: IMeta;
}

export interface IGameStatData {
  data: IGameStat[];
  meta: IMeta;
}

export interface IPayersData {
  data: IPlayer[];
  meta: IMeta;
}
