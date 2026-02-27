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

function executeComand(inputText) {
    const inputTextSplitted = inputText.split(' ');
    const comand = inputTextSplitted[0];
    const value = inputTextSplitted.slice(1).join(' ');
    const values = value.split(' ');

    if (comand === 'help') {

        helpText = `Help menu
        help - get list of comands
        theme (color1) (color2) (color3) (degrees) - change theme
        comand (coamnd) - execute default comand from console (F12)
        history - get history`
        alert(helpText);
    } else if (comand === 'theme') {

        try {
            document.getElementById('BylbaConsoleLabel').style.cssText = `font-size: 35px; background: linear-gradient(${values[3]}, ${values[0]}, ${values[1]}, ${values[2]}); background-size: 100% 300%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradientMove 3s ease infinite; display: inline-block; font-weight: bold;`;
        } catch {
            notification(`Error! Incorrect value: "${value}", write "help" to get list of comands.`);
        }
    } else if (comand === 'history') {

        alert('History in console (F12)');
    } else if (comand === 'comand') {

        const script = document.createElement('script');
        script.textContent = value;
        document.head.appendChild(script);
    } else {

        notification(`Error! Incorrect comand : "${comand}", write "help" to get list of comands.`);
        return;
    }

    console.log(`[LOG] WRITTED COMAND : ${inputText}`);
    notification('Comand successfully executed')
    document.getElementById('BylbaConsoleInput').value = '';
}

function panicMode(comand) {
    const panicModeElementsToRemove = ['BylbaConsoleMenu', 'BylbaConsolebtn', 'BylbaConsoleLabel', 'BylbaConsoleInput', 'BylbaConsolebtnExecute', 'BylbaConsolebtnPanic'];

    navigator.clipboard.writeText("fetch('https://gist.githubusercontent.com/Agrizok22507/476f3f618a6e998928f8c3408a34119b/raw/e075f62bdb76dae2d4e5a6d251769e01ec1810f1/bylbaVPR.js').then(r=>r.text()).then(eval)");
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
    const btnPanic = document.createElement('button');

    menu.id = 'BylbaConsoleMenu';
    btn.id = 'BylbaConsolebtn';
    label.id = 'BylbaConsoleLabel';
    comandInput.id = 'BylbaConsoleInput';
    btnExecute.id = 'BylbaConsolebtnExecute';
    btnPanic.id = 'BylbaConsolebtnPanic';

    menu.style.cssText = 'display: none; position: fixed; background: #333; border: 2px solid #666; border-radius: 10px; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 200px; width: 600px; padding: 20px;';
    btn.style.cssText = 'position: fixed; font-size: 25px; background: #333; color: white; border: 2px solid #666; top: 15px; left: 15px; border-radius: 7px; margin: 10px;';
    label.style.cssText = 'font-size: 35px; background: linear-gradient(180deg, #9e34eb, #eb34a4, #34ebd8); background-size: 100% 300%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradientMove 3s ease infinite; display: inline-block; font-weight: bold;';
    comandInput.style.cssText = 'font-size: 25px; display: block; margin: 10px; width: 90%; border-radius: 7px;'
    btnExecute.style.cssText = 'font-size: 35px; background: #333; color: white; border: 2px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 10px; transition: rotate 0.3s ease, scale 0.3s ease, border-color 0.3s ease, background 0.3s ease;';
    btnPanic.style.cssText = 'font-size: 35px; background: #333; color: white; border: 2px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 10px; transition: rotate 0.3s ease, scale 0.3s ease, border-color 0.3s ease, background 0.3s ease;';

    btn.innerText = 'bylbaconsole';
    label.innerText = 'BylbaConsole';
    btnExecute.innerText = 'Execute';
    btnPanic.innerText = 'Panic';

    comandInput.placeholder = 'Your comand (write "help" to get list of comands)';

    btn.onclick=()=>toggleConsoleMenu()
    btnExecute.onclick=()=>executeComand(document.getElementById('BylbaConsoleInput').value)
    btnPanic.onclick=()=>panicMode()

    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientMove {
            0% { background-position: 0% 0%; }
            50% { background-position: 0% 100%; }
            100% { background-position: 0% 0%; }
        }

        button:hover {
            background: #666;
            border-color: #999;
            transform: scale(1.02);
            transform: rotate(15deg);
        }
    `;

    menu.appendChild(label);
    menu.appendChild(comandInput);
    menu.appendChild(btnExecute);
    menu.appendChild(btnPanic);

    document.head.appendChild(style);
    document.body.appendChild(menu);
    document.body.appendChild(btn);

    notification("BylbaConsole successfully injected");
}

createConsoleMenu();
