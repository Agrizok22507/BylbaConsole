async function appendScript(url) {
    const response = await fetch(url);
    const code = await response.text();
    
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
    
    return new Promise(resolve => {setTimeout(resolve, 10)});
}

async function main() {
    try {
        await appendScript('https://raw.githubusercontent.com/Agrizok22507/BylbaConsole/main/gui.js');
        await appendScript('https://raw.githubusercontent.com/Agrizok22507/BylbaConsole/main/execute.js');
        await appendScript('https://raw.githubusercontent.com/Agrizok22507/BylbaConsole/main/comands.js');
        setTimeout(() => {
            if (typeof createConsoleMenu === 'function') {
                createConsoleMenu();
            } else {
                console.error('createConsoleMenu not found');
            }
        }, 50);
    } catch {
        alert("Error with loading scripts")
    }
}

main();