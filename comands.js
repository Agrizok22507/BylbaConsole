function setTheme(color1, color2, color3) {
    if (color1 && color2 && color3) {
        styleText = `
        @keyframes gradientMove {
            0% { background-position: 0% 0%; }
            50% { background-position: 0% 100%; }
            100% { background-position: 0% 0%; }
        }

        @keyframes animateBorder {
            0% { border: 3px solid ${color1}; }
            25% { border: 3px solid ${color2}; }
            50% { border: 3px solid ${color3}; }
            75% { border: 3px solid ${color2}; }
            100% { border: 3px solid ${color1}; }
        }

        button:hover {
            background: #666;
            border-color: #999;
            transform: scale(1.02) rotate(15deg);
        }
        `

        const elementsWithBorder = ['BylbaConsoleMenu', 'BylbaConsolebtn', 'BylbaConsolebtnExecute', 'BylbaConsolebtnPanic', 'BylbaConsolebtnCopy', 'BylbaConsolebtnPaste', 'BylbaConsolebtnClear'];
        elementsWithBorder.forEach(currentElementForToChangeBorder=>{
            var element = document.getElementById(currentElementForToChangeBorder);
            element.style.border = color1;
            element.animation = 'animateBorder 3s ease infinite;';
        });
        document.getElementById('BylbaConsoleStyle').textContent = styleText;
        document.getElementById('BylbaConsoleLabel').style.background = `linear-gradient(180deg, ${color1}, ${color2}, ${color3})`;
    } else {
        notification('Error! Try "theme color1 color2 color3"');
    }
}

function getHelp() {
    alert(`Help menu
        getHelp - get list of comands
        setTheme('color1', 'color2', 'color3') - change theme
        execute('comand') - execute default comand from console (F12)
        getHistory - get history of comands`);
}

function getHistory() {
    alert(`History of comands\n${history}`);
}

function execute(comand) {
    const script = document.createElement('script');
    script.textContent = comand;
    document.head.appendChild(script);
}