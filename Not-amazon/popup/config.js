if (typeof browser === "undefined") {
    var browser = chrome;
}

function saveOptions(e) {
    document.getElementById('asdf').innerHTML = 'saving';
    try {
        e.preventDefault();
        let selected = 'ddg';
        options = ['ddg', 'google']
        for (let i = 0; i < options.length; i++) {
            if (document.getElementById(options[i]).checked) {
                selected = options[i]
            }
        }
        browser.storage.sync.set({
            search_engine: selected
        });
    } catch (error) {
        console.log(error);
    }
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.getElementById(result.search_engine).click();
    }

    function onError(error) {
        console.log(`Error: ${error}`);
        window.alert(error);
    }

    try {
        let getting = browser.storage.sync.get("search_engine", setCurrentChoice);
        //getting.then(setCurrentChoice, onError);
    } catch (error) {
        setCurrentChoice({ search_engine: 'ddg' });
    }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);