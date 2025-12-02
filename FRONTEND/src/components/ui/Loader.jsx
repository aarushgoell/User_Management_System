import BeatLoader from "react-spinners/BeatLoader";

export function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <BeatLoader
        color="black"
        cssOverride={{}}
        loading={true}
        margin={2}
        size={5}
        speedMultiplier={1}
      />
    </div>
  );
}
