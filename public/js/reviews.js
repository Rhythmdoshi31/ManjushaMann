const names = [
    {text: "Thank you so much ma'am for your insightful tarot reading... Your guidance came at a time when I truly needed it and has brought me much clarity... I'm already seeing positive changes in my life thanks to your suggestions. Grateful for your wisdom and kindness.", name: "Divya Mundaliar", place: "Rawan", imgSrc: "./images/reviewer.webp"},
    {text: "Your guidance gave me clarity and a deeper underdtanding of my current situation. I am truly grateful for your calm and compassionate approach, which made me feel at ease throughout the session. I highly recommend your services to anyone seeking direction and peace of mind.", name: "mr.rashal94", place: "Gwalior", imgSrc: "./images/reviewer2.webp"},
    {text: "आपने मेरे बारे में जो बताया है वो सच है।और मेरे परिवार वालों के बारे में जो भी बताए सही है। आपने जो उपचार बताएं है उसका पालन कर रहा हूँ। उससे मेरे जीवन में सुंदर हुआ है। बहुत बहुत आभार और धन्यवाद आपको। बहुत अच्छी knowledge है आपको एस्ट्रोलॉजी के बारे में।",name: "P Naresh Raju", place: "Raipur", imgSrc: "./images/unknown.webp"},
    {text: "Aapse milkar achcha laga aap ki di gayi jankari aur upay bade hia acche aur kargar hai dhanyawad❤️" ,name: "Rabia Basree", place: "Rawan", imgSrc: "./images/reviewer3.webp"},   
    {text: "You are amazing 😍 tarot reader, whatever you told me you told the truth @tarot_reader_manjushamann Seriously you're the best Tarot ReaderReader❤️", name: "Sakshi Shrivas", place: "Gwalior", imgSrc: "./images/reviewer4.webp"},
];

let index = 0;
const reviewTextElement = document.querySelector("#reviewText");
const reviewerName = document.querySelector("#reviewerName");
const placeElement = document.querySelector("#loc");
const imageElement = document.querySelector("#reviewerImg"); // Image element with ID abcd

// Function to change the text every 4 seconds
function changeText() {
    reviewTextElement.innerText = names[index].text;
    reviewerName.innerText = names[index].name;
    placeElement.innerText = names[index].place;
    imageElement.src = names[index].imgSrc; // Set the image source

    index = (index + 1) % names.length;  // Move to the next paragraph, and loop back to start
}

// Change the text every 4 seconds
setInterval(changeText, 4000);

// Initialize the first text
changeText();
