function MySymbol() {
  const thisFnName = arguments.callee.name;
  if (new.target.name === thisFnName) {
    throw new Error(`${thisFnName}禁止new`);
  }
}
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = description === undefined ? "" : String(description);
	return defineProperties(symbol, {
		__description__: d("", description),
		__name__: d("", generateName(description))
	});
};
new MySymbol()
