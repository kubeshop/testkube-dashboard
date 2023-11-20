// To avoid including Prettier functionality in YAML Editor,
// we overwrite regular Prettier formatting with no formatiing.
export function format(text) {
    return text;
}
