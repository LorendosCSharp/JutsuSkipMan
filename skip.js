// Function to simulate a click event on a button if it is visible, with a delay to prevent server overload
function clickButtonIfVisible(buttonSelector) {
    const button = document.querySelector(buttonSelector);
    if (button && button.offsetParent !== null) { // offsetParent is null if the element is not visible
        console.log(`Button found: ${buttonSelector}, clicking in 1 second...`);
        setTimeout(() => {
            button.click();
            console.log(`Clicked button: ${buttonSelector}`);
        }, 1000); // 1 second delay
    }
}

// Observer to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
            // Call the click function for your specific buttons if they are visible
            clickButtonIfVisible('.vjs-overlay-skip-intro[title="Перейти к следующему эпизоду"]'); // Next Episode button selector
            clickButtonIfVisible('.vjs-overlay-skip-intro[title="Нажмите, если лень смотреть опенинг"]'); // Skip Intro button selector
        }
    });
});

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial check in case the buttons are already present and visible when the script runs
clickButtonIfVisible('.vjs-overlay-skip-intro[title="Перейти к следующему эпизоду"]'); // Next Episode button selector
clickButtonIfVisible('.vjs-overlay-skip-intro[title="Нажмите, если лень смотреть опенинг"]'); // Skip Intro button selector
