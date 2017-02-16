export function constructFields(fields :Array<string>) :string {
  return `&fields=${fields.join('%20')}`
}

// export function populateStructure(outerStructure, innerStructure: Array) {
//   innerStructure.reduce((outerStr, structure, i) => {
//     const structureId = structure._id || structure.id;
//     const innerStructureStr = JSON.stringify(innerStructure[i]);
//     const outerStructureStr = JSON.stringify(outerStructure);
//     const populatedStructure = outerStructureStr.replace(identifiers, innerStructureStr)
//   }, outerStructure)
//
//   return JSON.parse(populatedStructure);
// }
