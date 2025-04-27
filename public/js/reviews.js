const paras = [
    "Thank you so much ma'am for your insightful tarot reading... Your guidance came at a time when I truly needed it and has brought me much clarity... I'm already seeing positive changes in my life thanks to your suggestions. Grateful for your wisdom and kindness.",
    "Your guidance gave me clarity and a deeper underdtanding of my current situation. I am truly grateful for your calm and compassionate approach, which made me feel at ease throughout the session. I highly recommend your services to anyone seeking direction and peace of mind.",
    "Aapse milkar achcha laga aap ki di gayi jankari aur upay bade hia acche aur kargar hai dhanyawad❤️"
];

const names = [
    {name: "Divya Mundaliar", place: "Rawan", imgSrc: "./images/reviewer.webp"},
    {name: "mr.rashal94", place: "Gwalior", imgSrc: "./images/reviewer2.webp"},
    {name: "Rabia Basree", place: "Rawan", imgSrc: "./images/reviewer3.webp"},
];

let index = 0;
const reviewTextElement = document.querySelector("#reviewText");
const reviewerName = document.querySelector("#reviewerName");
const placeElement = document.querySelector("#loc");
const imageElement = document.querySelector("#reviewerImg"); // Image element with ID abcd

// Function to change the text every 4 seconds
function changeText() {
    reviewTextElement.innerText = paras[index];
    reviewerName.innerText = names[index].name;
    placeElement.innerText = names[index].place;
    imageElement.src = names[index].imgSrc; // Set the image source

    index = (index + 1) % paras.length;  // Move to the next paragraph, and loop back to start
}

// Change the text every 4 seconds
setInterval(changeText, 4000);

// Initialize the first text
changeText();
