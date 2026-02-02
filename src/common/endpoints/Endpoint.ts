export class Endpoint {
    private static _base: string;
    private static _version: Undefined<string>;
    private static _module: Undefined<string>;

    public static setEndpoint({ base, module, version }: { version?: string; base: string; module?: string }) {
        this._base = base;
        this._version = version;
        this._module = module;
    }

    public static extractPath(path: string, values?: Record<string, string>): string {
        const bracketMatches = path.match(/\[\w*\]/g);

        if (!bracketMatches || !values)
            return path;

        for (const key in values) {
            const match = bracketMatches.find(item => item.replace(/[[\]]/g, '') === key);
            const value = values[key];

            if (match && value)
                path = path.replace(match, value);
        }

        return path;
    }

    public static getPath(path: string): string {
        const currentPath: string[] = [this._base, this._version ?? '', this._module ?? '', path];
        return currentPath.filter(item => item).join('/');
    }
}
