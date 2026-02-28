let history = '';

function executeComand(inputText) {
    const script = document.createElement('script');
    script.textContent = inputText;
    document.head.appendChild(script);

    history = history + inputText + '\n';
    notification('Comand successfully executed');
    document.getElementById('BylbaConsoleInput').value = '';
}

function panicMode() {
    navigator.clipboard.writeText("fetch('https://raw.githubusercontent.com/Agrizok22507/BylbaConsole/main/main.js').then(r=>r.text()).then(eval)");
    
    var elementsToRemove = ['BylbaConsoleMenu', 'BylbaConsolebtn', 'BylbaConsoleLabel', 'BylbaConsoleInput', 'BylbaConsolebtnExecute', 'BylbaConsolebtnPanic', 'BylbaConsolebtnCopy', 'BylbaConsolebtnPaste', 'BylbaConsolebtnClear'];
    elementsToRemove.forEach(currentElementToRemove => {document.getElementById(currentElementToRemove)?.remove();});

    notification("Panic mode: ON");
}
