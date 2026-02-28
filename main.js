function main() {
    fetch('https://raw.githubusercontent.com/Agrizok22507/BylbaConsole/main/gui.js').then(r=>r.text()).then(eval)
    fetch('https://raw.githubusercontent.com/Agrizok22507/BylbaConsole/main/execute.js').then(r=>r.text()).then(eval)
    fetch('https://raw.githubusercontent.com/Agrizok22507/BylbaConsole/main/comands.js').then(r=>r.text()).then(eval)
    createConsoleMenu();
}

main();