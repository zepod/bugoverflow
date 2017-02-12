/**
 * Compares two objects, if they are shallow equal
 * Compares also Immutable types
 * @param  {Object} objA
 * @param  {Object} objB
 * @return {boolean}
 */
export default function shallowEqual(objA: ?Object, objB: ?Object): boolean {
  if (objA === objB) {
    return true
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false
  }

  if (objA.equals && objB.equals) {
    return objA.equals(objB)
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  // Test for A's keys different from B.
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB)

  for (let i = 0; i < keysA.length; i += 1) {
    if (!bHasOwnProperty(keysA[i])) return false
    const valA = objA[keysA[i]]
    const valB = objB[keysB[i]]

    if ((valA && valA.equals) && (valB && valB.equals)) {
      if (!valA.equals(valB)) return false
    } else if (valA !== valB) {
      return false
    }
  }

  return true
}
