console.log("[JS Monitor] Logging aktif! Semua interaksi antar-file akan dicatat.");

(function () {
    const originalImport = import;
    window.import = async (...args) => {
        console.log("[JS Monitor] Import detected:", args);
        return originalImport(...args);
    };

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        console.log("[JS Monitor] Fetch detected:", args);
        return originalFetch(...args);
    };

    const originalAppendChild = document.head.appendChild;
    document.head.appendChild = function (element) {
        if (element.tagName === "SCRIPT") {
            console.log("[JS Monitor] Script added:", element.src);
        }
        return originalAppendChild.call(this, element);
    };
})();
