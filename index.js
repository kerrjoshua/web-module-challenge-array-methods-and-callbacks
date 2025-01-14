const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/



//(a) Home Team name for 2014 world cup final
const filteredArr = fifaData.filter((game) => {
   return game.Datetime.includes('2014') & game.Stage === 'Final';
})
const game = filteredArr[0];

// console.log(game['Home Team Name']);

//(b) Away Team name for 2014 world cup final
// console.log(game['Away Team Name']);

//(c) Home Team goals for 2014 world cup final
// console.log(game['Home Team Goals']);

//(d) Away Team goals for 2014 world cup final
// console.log(game['Away Team Goals']);

//(e) Winner of 2014 world cup final */


// if (game['Home Team Goals'] > game['Away Team Goals']){
//     console.log(game['Home Team Name']);
// } else {
//     console.log(game['Away Team Name']);
// }



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(dataArr) {
    return dataArr.filter((game) => {
        return game['Stage'] === 'Final'
    })
 }
// const wcFinals = fifaData.filter((game) => {
//     return game['Stage'] === 'Final'
   
// });
// const wcYears = wcFinals.map((game) => {
//     return game.Year;
// });

//console.log(wcYears);
// console.log(getFinals(fifaData));
// console.log((2014-1954)/4);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(dataArr, finalsCB) {
    //const finals = finalsCB(dataArr);
   const years =  finalsCB(dataArr).map((game) => {
        return game.Year;
    });
    return years;
}

// console.log('Task 3: getYears - ', getYears(fifaData,getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(dataArr, getFinalsCB) {
    const finals = getFinalsCB(dataArr);
    const winners =  [];
    finals.forEach(element => {
        if (element['Home Team Goals'] > element['Away Team Goals']){
            winners.push(element['Home Team Name']);
        } else if (element['Home Team Goals'] < element['Away Team Goals']) {
            winners.push(element['Away Team Name']);
    //Win conditions": "France win on penalties (3 - 4)",
        } else {
            const winConditions = element['Win conditions'];
            if (winConditions.includes(element['Home Team Name'])) {
            winners.push(element['Home Team Name']);
            } else {
                winners.push(element['Away Team Name'])
            }
        }
    });
    return winners
}


//console.log('Task 4: ',getWinners(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(dataArr, getFinalsCB, getYearsCB, getWinnersCB) {
    
    const years = getYearsCB(dataArr, getFinalsCB);
    const winners = getWinnersCB(dataArr, getFinalsCB);
    // const messageArr = [];

    // for (let i = 0; i < years.length; i++) {
    //     const msg = `In ${years[i]}, ${winners[i]} won the world cup!`
    //     messageArr.push(msg);
    // }
  return years.map((item,index) =>  `In ${item}, ${winners[index]} won the world cup!`);

}
// console.log('Task 5',getWinnersByYear(fifaData, getFinals, getYears, getWinners))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(getFinalsCB) {
    const finals = getFinalsCB;
    const homeGoals = finals.reduce((total, currentGame) => {
        return total + currentGame['Home Team Goals'];
    }, 0)
   
    let awayGoals = finals.reduce((total, currentGame) => {
        return total + currentGame['Away Team Goals'];
    }, 0)
    
    let averageGoals = ((homeGoals + awayGoals) / finals.length).toFixed(2);
    return averageGoals;
    
 }
 

 getAverageGoals(getFinals(fifaData));




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

// make an array, called 'teams', of objects to gather the team data. Each 'team' object in the array should have three keys, {name, goals, appearances}.
//  go through the finals array and for each object gather the names and goals of the home and away teams in turn. 
// Run teamAdder() for each team. 

// teamAdder() accepts a team object as a parameter and checks if a team with that name already exists on the teams array, 
//if not, it creates a new team object with the name and goals for the current team and sets the appearances counter to 1. If the team name is already a key in the object, increment 
//the tally by the number of goals in the game and the appearances by 1.   
// use arr.map to add a new averageGoals key, setting the value to the number of goals / appearances.


function getGoals(dataArr) {

  getFinals =  ((dataArr) =>{
        return dataArr.filter((game) => {
            return game['Stage'] === 'Final'
        })
    });

    function teamAdder(currentTeam) {
        if (teams.find(team => team.name === currentTeam.name) === undefined){
            teams.push(currentTeam);
        
        } else {
            teams.forEach((element) => {
                if (element.name === currentTeam.name) {
                    element.goals += currentTeam.goals;
                    element.appearances += 1;
                }
            })
        }
            
    }

   const finals = getFinals(dataArr);

    const teams = [];

finals.forEach((game) => {
    const homeTeam = {name: game['Home Team Name'], goals: game['Home Team Goals'], appearances: 1};
    teamAdder(homeTeam);
    const awayTeam = {name: game['Away Team Name'], goals: game['Away Team Goals'], appearances: 1};
    teamAdder(awayTeam);
})
const teamsWithAverages = teams.map((currentTeam) => {
    currentTeam.avgGoals = (currentTeam.goals / currentTeam.appearances).toFixed(2);
    return currentTeam
})

const sortedTeamsWithAverages = teamsWithAverages.sort((firstItem, secondItem) => 
    secondItem.avgGoals - firstItem.avgGoals)
console.log(sortedTeamsWithAverages);
  
   return sortedTeamsWithAverages[0].name;
         


}

console.log(getGoals(fifaData));


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
