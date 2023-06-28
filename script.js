const endpoint = "https://raw.githubusercontent.com/gauravGitAcc/postAppData/main/auctionData.json";
const container = document.getElementById("container");
console.log(endpoint);

let backgroundcolorMapping ={
    "APPROVED" : "blue",
    "PENDING" : "yellow",
    "CANCELLED" : "red",
    "COMPLETED" : "green"
}

let textColorMapping ={
    "APPROVED" :"white",
    "PENDING" :"black",
    "CANCELLED" :"white",
    "COMPLETED" :"white"
}

function renderDataOntoUI(data){
    data.forEach((item)=>{
        const card = document.createElement("div");
        card.className = "card";
        const {status, caseNumber, fromLocation, toLocation, fare, date} = item;
        card.innerHTML = `
        <div class="top-container">
                <div class="left">
                    <span class="badge" style="color: ${textColorMapping[status]}; background-color: ${backgroundcolorMapping[status]}">${status}</span>
                    <span>${caseNumber}</span>
                </div>
                <div class="right">
                    ${date}
                </div>
            </div>
            <div class="bottom-container">
                <b style="font-weight:600;">${fromLocation}</b>
                <p>${toLocation}</p>
                <p class="price">₹ ${fare}</p>
            </div>
        `;

        container.appendChild(card);
    })
}

async function fetchAuctionDetails() {
    try {
        const response = await fetch(endpoint, { method: 'GET' });
        const result = await response.json();
        renderDataOntoUI(result); // Call the function to render the data onto the UI
    } catch (error) {
        alert(error.message);
    }
}


fetchAuctionDetails();
