async function loadCSV() {
    const response = await fetch('data.csv');
    const text = await response.text();
    const rows = text.split("\n").slice(1);
    return rows.map(row => {
        const [Name, Class, Faction, Character, Potential, Atk, Def] = row.split(",");
        return { Name, Class, Faction, Character, Potential, Atk, Def };
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const data = await loadCSV();
    const list = document.getElementById("player-list");
    const display = document.getElementById("display");

    data.forEach((player, index) => {
        let button = document.createElement("button");
        button.textContent = player.Name;
        button.onclick = () => {
            display.innerHTML = `
                <div class='card' style='background: ${getRarityColor(player.Potential)};'>
                    <img src='${player.Character}' class='character-img'>
                    <h2>${player.Name}</h2>
                    <p>Class: ${player.Class}</p>
                    <p>Faction: ${player.Faction}</p>
                    <p>Potential: ${player.Potential}</p>
                    <p>Attack: ${player.Atk}</p>
                    <p>Defense: ${player.Def}</p>
                </div>
            `;
        };
        list.appendChild(button);
    });
});

function getRarityColor(potential) {
    switch (potential.trim().toLowerCase()) {
        case 'legendary': return 'gold';
        case 'epic': return 'purple';
        case 'rare': return 'blue';
        default: return 'gray';
    }
}
