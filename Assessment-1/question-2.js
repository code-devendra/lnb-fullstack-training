/* Input scores of 2 teams for 3 matches and display which team has scored better average. */

let firstTeam_MatchOne_Score = prompt("Enter the score of Team A in first Match : ");
let secondTeam_MatchOne_Score = prompt("Enter the score of Team B in first Match : ");
let firstTeam_MatchTwo_Score = prompt("Enter the score of Team A in second Match : ");
let secondTeam_MatchTwo_Score = prompt("Enter the score of Team B in second Match : ");
let firstTeam_MatchThree_Score = prompt("Enter the score of Team A in third Match : ");
let secondTeam_MatchThree_Score = prompt("Enter the score of Team B in third Match : ");

let avgScoreOfTeamA = (firstTeam_MatchOne_Score + firstTeam_MatchTwo_Score + firstTeam_MatchThree_Score) / 3;
let avgScoreOfTeamB = (secondTeam_MatchOne_Score + secondTeam_MatchTwo_Score + secondTeam_MatchThree_Score) / 3;

if (avgScoreOfTeamA > avgScoreOfTeamB) {
    console.log("Team A is on an average perform better than Team B");
} else if (avgScoreOfTeamA < avgScoreOfTeamB) {
    console.log("Team B is on an average perform better than Team A");
} else {
    console.log("The match is tie");
}