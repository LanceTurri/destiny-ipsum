interface IScript {
    [key: string]: string[] | IScript;
}

// If it's an array return it, otherwise run the processing again.
function processSection(section: IScript | string[]): string[] {
    if (Array.isArray(section)) {
        return section;
    }

    // Else it's another section that needs to be processed
    return Object.keys(section).flatMap((newSection) => processSection(section[newSection]));
}

export function translateScriptToFlatArray(script: IScript): string[] {
    const sectionKeys = Object.keys(script);

    return sectionKeys.flatMap((section) => processSection(script[section]));
}
