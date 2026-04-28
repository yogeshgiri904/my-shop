const loadSections = async function() {
    const sectionPlaceholders = Array.from(document.querySelectorAll("[data-section-src]"));
    if (!sectionPlaceholders.length) {
        document.dispatchEvent(new Event("sections:loaded"));
        return;
    }

    for (const placeholder of sectionPlaceholders) {
        const sourcePath = placeholder.getAttribute("data-section-src");
        try {
            const response = await fetch(sourcePath);
            if (!response.ok) {
                throw new Error("Failed to load " + sourcePath);
            }
            const html = await response.text();
            placeholder.outerHTML = html;
        } catch (error) {
            placeholder.outerHTML = "<section class='site-section'><div class='section-header'><h3 class='heading'><span>Section</span> unavailable</h3></div></section>";
        }
    }

    document.dispatchEvent(new Event("sections:loaded"));
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadSections);
} else {
    loadSections();
}
