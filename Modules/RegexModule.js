export default class Censure {
    static #a = ['fuck', 'bitch', 'shit', 'cock']; // я извиняюсь, но такой был таск

    static #createRegex (value) {
        let subString = '';
        subString = this.#a.pop();
        if (value.search(subString) !== -1) {
            // let sup = subString.split('');
            // for (let i = 0; i < sup.length; i++) {
            //     sup[i] += '+'
            // }
            // subString = sup.join('');
            return `${subString}`
        }
        else {
            return this.#createRegex(value);
        }
    }

    static removeAbusiveLanguage (value) {
        let regexPattern = this.#createRegex(value)
        if (regexPattern !== "undefined") {
            let regexp = new RegExp(regexPattern, 'ig');
            let replaceString = '*';
            let temp = function (regexPattern) {
                if (regexPattern.length > replaceString.length) {
                    replaceString += '*';
                    return temp(regexPattern);
                }
            }
            temp(regexPattern)
            return this.removeAbusiveLanguage(value.replace(regexp, replaceString));
        }
        else {
            return value;
        }
    }
}