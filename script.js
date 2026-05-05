:root {
    --primary-bg: #E5E5E5;
    --content-bg: #FFFFFF;
    --accent: #000000;
    --green-field: #5DB061;
}

body {
    margin: 0;
    font-family: sans-serif;
    background-color: var(--primary-bg);
}

.dark-theme {
    --primary-bg: #1a1a1a;
    --content-bg: #2d2d2d;
    --accent: #ffffff;
}

.main-layout {
    display: flex;
    justify-content: center;
    min-height: 100vh;
}

.sidebar { width: 15%; } /* Бокові зони зі скріншоту */

.center-column {
    width: 70%;
    background: var(--content-bg);
    padding: 40px;
    box-shadow: 0 0 20px rgba(0,0,0,0.05);
}

.game-section {
    border-bottom: 1px solid #eee;
    padding: 30px 0;
    text-align: center;
}

input {
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    margin-right: 10px;
}

button {
    background: var(--accent);
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.3s;
}

/* Футбольне поле */
#football-field {
    width: 100%;
    height: 250px;
    background: var(--green-field);
    border-radius: 15px;
    position: relative;
    margin-top: 20px;
    cursor: crosshair;
}

#ball {
    position: absolute;
    font-size: 30px;
    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Сітка карток внизу */
.games-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 50px;
}

.game-card {
    background: #f9f9f9;
    height: 100px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: 1px solid #ddd;
}

/* Модальне вікно */
.modal {
    display: none;
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(5px);
}

.modal-content {
    background: white;
    width: 300px;
    margin: 15% auto;
    padding: 30px;
    border-radius: 20px;
    text-align: center;
}