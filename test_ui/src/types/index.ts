interface Sport {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
  id: string;
  sport: Sport;
}

interface Tournament {
  name: string;
  slug: string;
  category: Category;
}

interface Team {
  id: string;
  name: string;
  slug: string;
  sport: Sport;
  tournament: Tournament;
  country: {
    id: string;
    name: string;
  };
}

interface Nationality {
  id: string;
  name: string;
}

export interface Player {
  id: string;
  name: string;
  slug: string;
  shortName: string;
  team: Team;
  position: string;
  height: number;
  preferredFoot: string | null;
  dateOfBirthTimestamp: number;
  contractUntilTimestamp: number;
  proposedMarketValue: number;
  proposedMarketValueRaw: {
    value: number;
    currency: string;
  };
  nationality: Nationality;
}

interface Score {
  current: number;
  display: number;
  period1: number;
  period2: number;
  corner: number;
  yellow_card: number;
  red_card: number;
  overTime_score: number;
  penalty_score: number;
}

interface TeamMatchList {
  id: string;
  name: string;
  slug: string;
  shortName: string;
}

export interface Match {
  id: string;
  homeScore: Score;
  awayScore: Score;
  homeTeam: TeamMatchList;
  awayTeam: TeamMatchList;
  status: {
    code: number;
    description: string;
    type: string;
  };
  startTimestamp: number;
}
