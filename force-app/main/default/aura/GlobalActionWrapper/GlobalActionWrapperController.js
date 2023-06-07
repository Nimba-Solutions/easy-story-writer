({
    init : function (component) {
    	// Default to "Maximized" Global Action Window
        var maximizeButton = document.querySelector('[title="Maximize"]');
        if (maximizeButton) {
            maximizeButton.click();
        }
    }
})