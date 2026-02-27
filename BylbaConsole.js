var helpText = `Help menu
help - get list of comands
theme (colors) - change theme
comand (coamnd) - execute default comand from console (F12)
history - get history of comands`;
var theme = ['#9e34eb', '#eb34a4', '#34ebd8'];
var styleText = `
    @keyframes gradientMove {
        0% { background-position: 0% 0%; }
        50% { background-position: 0% 100%; }
        100% { background-position: 0% 0%; }
    }

    @keyframes animateBorder {
        0% { border: 3px solid ${theme[0]}; }
        25% { border: 3px solid ${theme[1]}; }
        50% { border: 3px solid ${theme[2]}; }
        75% { border: 3px solid ${theme[1]}; }
        100% { border: 3px solid ${theme[0]}; }
    }

    button:hover {
        background: #666;
        border-color: #999;
        transform: scale(1.02) rotate(15deg);
    }
`
let history = '';

function notification(text) {
    const notif = document.createElement('div');
    notif.textContent = text;
    notif.id = 'notification'
    notif.style.cssText = 'position: fixed; top: 20px; right: -300px; background: #333; color: white; border: 2px solid #666; padding: 15px; font-family: sans-serif; z-index: 9999; transition: right 0.3s ease, opacity 0.3s ease; opacity: 0; border-radius: 3px;';
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.right = '20px';
        notif.style.opacity = '0.8';
    }, 10);
    setTimeout(() => {
        notif.style.right = '-300px';
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function toggleConsoleMenu() {
    if (document.getElementById('BylbaConsoleMenu').style.display === 'none') {
        document.getElementById('BylbaConsoleMenu').style.display = 'block';
    } else {
        document.getElementById('BylbaConsoleMenu').style.display = 'none';
    }
}

function updateTheme() {
    styleText = `
    @keyframes gradientMove {
        0% { background-position: 0% 0%; }
        50% { background-position: 0% 100%; }
        100% { background-position: 0% 0%; }
    }

    @keyframes animateBorder {
        0% { border: 3px solid ${theme[0]}; }
        25% { border: 3px solid ${theme[1]}; }
        50% { border: 3px solid ${theme[2]}; }
        75% { border: 3px solid ${theme[1]}; }
        100% { border: 3px solid ${theme[0]}; }
    }

    button:hover {
        background: #666;
        border-color: #999;
        transform: scale(1.02) rotate(15deg);
    }
    `

    const elementsWithBorder = ['BylbaConsoleMenu', 'BylbaConsolebtn', 'BylbaConsoleLabel', 'BylbaConsolebtnExecute', 'BylbaConsolebtnPanic', 'BylbaConsolebtnCopy', 'BylbaConsolebtnPaste', 'BylbaConsolebtnClear'];
    elementsWithBorder.forEach(currentElementForToChangeBorder=>{
        document.getElementById(currentElementForToChangeBorder).style.border = theme[0];
    });
    const style = document.getElementById('BylbaConsoleStyle');
    style.textContent = styleText;
}

function executeComand(inputText) {
    const inputTextSplitted = inputText.split(' ');
    const comand = inputTextSplitted[0];
    const value = inputTextSplitted.slice(1).join(' ');
    const values = value.split(' ');

    try {
        if (comand === 'help') {
            alert(helpText);
        } else if (comand === 'theme') {
            theme = [values[0], values[1], values[2]]
            updateTheme();
        } else if (comand === 'history') {
            alert(`History of comands\n${history}`);
        } else if (comand === 'comand') {
            const script = document.createElement('script');
            script.textContent = value;
            document.head.appendChild(script);
        } else {
            notification(`Error! Incorrect comand : "${comand}", write "help" to get list of comands.`);
            return;
        }
    } catch {
        notification(`Error! Incorrect comand: "${comand}", write "help" to get list of comands.`);
        return
    }

    history = history + inputText + '\n';
    notification('Comand successfully executed');
    document.getElementById('BylbaConsoleInput').value = '';
}

function panicMode(comand) {
    const panicModeElementsToRemove = ['BylbaConsoleMenu', 'BylbaConsolebtn', 'BylbaConsoleLabel', 'BylbaConsoleInput', 'BylbaConsolebtnExecute', 'BylbaConsolebtnPanic', 'BylbaConsolebtnCopy', 'BylbaConsolebtnPaste', 'BylbaConsolebtnClear'];

    navigator.clipboard.writeText("fetch('https://raw.githubusercontent.com/Agrizok22507/BylbaConsole/main/BylbaConsole.js').then(r=>r.text()).then(eval)");
    notification("Panic mode: ON");
    
    panicModeElementsToRemove.forEach(currentElementToRemove => {
        document.getElementById(currentElementToRemove)?.remove();
    });
}

function createConsoleMenu() {
    const menu = document.createElement('div');
    const btn = document.createElement('button');
    const label = document.createElement('span')
    const comandInput = document.createElement('input');
    const btnExecute = document.createElement('button');
    const btnCopy = document.createElement('button');
    const btnPaste = document.createElement('button');
    const btnPanic = document.createElement('button');
    const btnClear = document.createElement('button');
    const style = document.createElement('style');

    menu.id = 'BylbaConsoleMenu';
    btn.id = 'BylbaConsolebtn';
    label.id = 'BylbaConsoleLabel';
    comandInput.id = 'BylbaConsoleInput';
    btnExecute.id = 'BylbaConsolebtnExecute';
    btnCopy.id = 'BylbaConsolebtnCopy';
    btnPaste.id = 'BylbaConsolebtnPaste';
    btnClear.id = 'BylbaConsolebtnClear';
    btnPanic.id = 'BylbaConsolebtnPanic';
    style.id = 'BylbaConsoleStyle';

    menu.style.cssText = 'display: none; position: fixed; background: #333; border: 3px solid #9e34eb; border-radius: 10px; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 200px; width: 600px; padding: 20px; animation: animateBorder 3s ease infinite;';
    btn.style.cssText = 'position: fixed; font-size: 25px; background: #333; color: white; border: 3px solid #666; top: 15px; left: 15px; border-radius: 7px; margin: 6px; animation: animateBorder 3s ease infinite;';
    label.style.cssText = `font-size: 35px; background: linear-gradient(180deg, ${theme[0]}, ${theme[1]}, ${theme[2]}); background-size: 100% 300%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradientMove 3s ease infinite; display: inline-block; font-weight: bold;`;
    comandInput.style.cssText = 'font-size: 25px; display: block; margin: 6px; width: 90%; border-radius: 7px;'
    btnExecute.style.cssText = 'font-size: 35px; background: #333; color: white; border: 3px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 6px; transition: rotate 0.3s ease, scale 0.3s ease, border-color 0.3s ease, background 0.3s ease; animation: animateBorder 3s ease infinite;';
    btnCopy.style.cssText = 'font-size: 35px; background: #333; color: white; border: 3px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 6px; transition: rotate 0.3s ease, scale 0.3s ease, border-color 0.3s ease, background 0.3s ease; animation: animateBorder 3s ease infinite;';
    btnPaste.style.cssText = 'font-size: 35px; background: #333; color: white; border: 3px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 6px; transition: rotate 0.3s ease, scale 0.3s ease, border-color 0.3s ease, background 0.3s ease; animation: animateBorder 3s ease infinite;';
    btnClear.style.cssText = 'font-size: 35px; background: #333; color: white; border: 3px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 6px; transition: rotate 0.3s ease, scale 0.3s ease, border-color 0.3s ease, background 0.3s ease; animation: animateBorder 3s ease infinite;';
    btnPanic.style.cssText = 'font-size: 35px; background: #333; color: white; border: 3px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 6px; transition: rotate 0.3s ease, scale 0.3s ease, border-color 0.3s ease, background 0.3s ease; animation: animateBorder 3s ease infinite;';

    btn.innerText = 'bylbaconsole';
    label.innerText = 'BylbaConsole';
    btnExecute.innerText = 'Execute';
    btnCopy.innerText = 'Copy';
    btnPaste.innerText = 'Paste';
    btnClear.innerText = 'Clear';
    btnPanic.innerText = 'Panic';
    style.textContent = styleText;

    comandInput.placeholder = 'Your comand (write "help" to get list of comands)';

    btn.onclick=()=>toggleConsoleMenu()
    btnExecute.onclick=()=>executeComand(document.getElementById('BylbaConsoleInput').value)
    btnCopy.onclick=()=>navigator.clipboard.writeText(document.getElementById('BylbaConsoleInput').value);notification('Comand successfully copied');
    btnPaste.onclick=()=>navigator.clipboard.readText().then(text => {document.getElementById('BylbaConsoleInput').value = text;notification('Comand successfully pasted')})
    btnClear.onclick=()=>{
        document.getElementById('BylbaConsoleInput').value = '';
        notification('Input successfully cleared');
    }
    btnPanic.onclick=()=>panicMode()

    fetch('https://raw.githubusercontent.com/Agrizok22507/BylbaConsole/main/background.jpg').then(r=>r.blob()).then(b=>{
    const url = URL.createObjectURL(b);
    menu.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('${url}')`;
    menu.style.backgroundSize = 'cover';
    menu.style.backgroundPosition = 'center';
    menu.style.backgroundRepeat = 'no-repeat';}).catch(console.error);

    menu.appendChild(label);
    menu.appendChild(comandInput);
    menu.appendChild(btnExecute);
    menu.appendChild(btnCopy);
    menu.appendChild(btnPaste);
    menu.appendChild(btnClear);
    menu.appendChild(btnPanic);

    document.head.appendChild(style);
    document.body.appendChild(menu);
    document.body.appendChild(btn);

    notification("BylbaConsole successfully injected");
}

createConsoleMenu();
