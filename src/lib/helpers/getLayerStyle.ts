export function getLayerStateStyle<T>({
  initial,
  active,
  hover,
}: {
  initial: T;
  active: T;
  hover: T;
}) {
  return [
    "case",
    ["boolean", ["feature-state", "active"], false],
    active,
    ["boolean", ["feature-state", "hover"], false],
    hover,
    initial,
  ];
}
