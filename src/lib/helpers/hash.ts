export const getLatLngFromHash = (): string[] => {
  // return window.location.hash.split("/")[0].split("-")[1].split("_");
  return ["1", "2"];
};

export const getHash = () => {
  const qs = new URLSearchParams(window.location.search);

  console.log({
    source: qs.get("type"),
    id: qs.get("id")?.slice(1).split("/")[0].split("-").join("-") || null,
  });

  return {
    source: qs.get("type"),
    id: qs.get("id")?.slice(1).split("/")[0].split("-").join("-") || null,
  };
};
