function is(a, b) {
  if (a.toLocaleString() === '0' && b.toLocaleString() === '-0' || b.toLocaleString() === '0' && a.toLocaleString() === '-0') {
    return false
  }
  if (a !== a && b !== b) {
    return true
  }
  return a === b
}
console.log(is(0, -0));

