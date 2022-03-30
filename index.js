const instaTouch = require('instatouch');
require ('dotenv').config();
const fs = require('fs');


async function getAllParticipants() {
    try {
        const options = {
             count: 100,
             session: process.env.INSTAGRAM_SESSION_ID
            };
        const comments = await instaTouch.comments('CbaaeyzgmCG', options);
        return comments.collector;
    } catch (error) {
        console.log(error);
    }
}

function pickWinner(participants) {
    const allParticipants = participants.length;
    const pickedTicket = Math.floor(Math.random() * allParticipants);
    const pickWinner = participants[pickedTicket];
    return pickWinner;
}

function writeGoldenTicket(winner) {
    fs.writeFile('goldenTicket.json', JSON.stringify(winner, null, 2), function(err) {
        if (err) console.log(err);
    })
}

async function main () {
   const participants = await getAllParticipants ();
   const goldenTicket =  pickWinner(participants);
   writeGoldenTicket(goldenTicket);

}

main();