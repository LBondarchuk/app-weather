import { PersonInterface } from '../../types/PrersonInterface';

export const handleDivideTeams = (
  people: PersonInterface[],
  setTeam1: (team1: PersonInterface[]) => void,
  setTeam2: (team2: PersonInterface[]) => void,
) => {
  const copiedPeople = [...people];
  const sortedPeople = copiedPeople.sort((a, b) => +b.weight - +a.weight);

  let team1 = [];
  let team2 = [];

  let weightDifference = 0;

  for (const person of sortedPeople) {
    if (weightDifference <= 0) {
      team1.push(person);
      weightDifference += +person.weight;
    } else {
      team2.push(person);
      weightDifference -= +person.weight;
    }
  }

  setTeam1(team1);
  setTeam2(team2);
};
