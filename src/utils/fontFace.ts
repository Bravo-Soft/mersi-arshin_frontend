type FontDisplay = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type FontStyle = 'normal' | 'italic' | 'oblique';

class FontFace {
	constructor(
		private readonly fontFamily: string,
		private readonly fontName: string,
		private readonly path: string,
		private readonly format: 'woff' | 'truetype',
		private readonly fontWeight: FontWeight,
		private readonly fontStyle: FontStyle,
		private readonly fontDisplay: FontDisplay,
		private readonly unicodeRange: string
	) {}

	private createFontFace(): string {
		return `@font-face {
    font-family: '${this.fontFamily}';
    font-style: ${this.fontStyle};
    font-display: ${this.fontDisplay};
    font-weight: ${this.fontWeight};
    src: local('${this.fontName}'),
    url(${this.path}) format('${this.format}');
    unicodeRange: ${this.unicodeRange};
    }`;
	}

	static generateFontParameters(fontList: FontFace[]): string {
		return fontList.map(font => font.createFontFace()).join('\n');
	}
}

export default FontFace;
