export default class Censure {
    static #a = ['fuck', 'bitch', 'shit', 'cock'];

    static #createRegex (value) {
        let subString = 0;
        subString = this.#a.pop();
        if (value.indexOf(subString)) {
            return `${subString}`
        }
    }

    static removeAbusiveLanguage (value) {
        let te = this.#createRegex(value)
        if (te !== "undefined") {
            let regexp = new RegExp(te, 'ig');
            let replaceString = '*';
            let temp = function (te) {
                if (te.length > replaceString.length) {
                    replaceString += '*';
                    return temp(te);
                }
            }
            temp(te)
            return this.removeAbusiveLanguage(value.replace(regexp, replaceString));
        }
        else {
            return value;
        }
    }
}