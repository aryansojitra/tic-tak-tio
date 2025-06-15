let currentplayer = "x";
let a = Array(9).fill(null);
let gameOver = false;

function showResult(message) {
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "#fff";
    popup.style.padding = "20px 30px";
    popup.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
    popup.style.borderRadius = "10px";
    popup.style.fontSize = "24px";
    popup.style.fontWeight = "bold";
    popup.style.zIndex = "1000";
    popup.style.textAlign = "center";
    popup.innerText = message;

    const btn = document.createElement("button");
    btn.innerText = "Play Again";
    btn.style.marginTop = "15px";
    btn.style.padding = "8px 16px";
    btn.style.fontSize = "16px";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "6px";
    btn.style.border = "none";
    btn.style.backgroundColor = "#4caf50";
    btn.style.color = "white";
    btn.onclick = () => location.reload();

    popup.appendChild(document.createElement("br"));
    popup.appendChild(btn);
    document.body.appendChild(popup);
}

function checkWinner() {
    if (
        a[0] != null && a[0] == a[1] && a[1] == a[2] ||
        a[3] != null && a[3] == a[4] && a[4] == a[5] ||
        a[6] != null && a[6] == a[7] && a[7] == a[8] ||
        a[0] != null && a[0] == a[3] && a[3] == a[6] ||
        a[1] != null && a[1] == a[4] && a[4] == a[7] ||
        a[2] != null && a[2] == a[5] && a[5] == a[8] ||
        a[0] != null && a[0] == a[4] && a[4] == a[8] ||
        a[2] != null && a[2] == a[4] && a[4] == a[6]
    ) {
        showResult(`🎉 Winner is ${currentplayer.toUpperCase()}!`);
        gameOver=true;
        return;
    }

    if (!a.some((e) => e === null)) {
        showResult(`🤝 It's a Draw!`);
        gameOver = true;
    }
}

function handleClick(el) {
    if(gameOver) return;
    const id = Number(el.id);
    if (a[id] !== null) {
        return;
    }

    a[id] = currentplayer;
    el.innerText = currentplayer;
    checkWinner();
    currentplayer = currentplayer === 'x' ? 'o' : 'x';
}

document.getElementById("reset-button").addEventListener("click", () => {
    // Clear game board
    const boxes = document.getElementsByClassName("col");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = "";
    }

    // Reset game state
    a = Array(9).fill(null);
    currentplayer = "x";

    // Remove any result popup if it exists
    const popup = document.querySelector("body > div[style*='position: fixed']");
    if (popup) popup.remove();
    gameOver = false;
});

