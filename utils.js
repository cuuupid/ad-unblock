const Logger = tag => (..._) => console.log(...[`%c[Ad Unblock 🐱‍👤 || ${tag}]`, "background-color: #ff99ff; color: #000;"],..._)

const Random = (min, max) => () => Math.random() * (max - min + 1) + min