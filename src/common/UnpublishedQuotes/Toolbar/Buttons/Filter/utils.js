export function parseLikesValue(value) {
  const { groups } = /^(?<operator>[g|l|e]t)(?<value>\d*)$/.exec(value);
  return [groups.operator, groups.value];
}
