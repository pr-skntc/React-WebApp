import { HashLoader } from "react-spinners";

function Spinner({ loading }) {
  return (
    <HashLoader
      color="#0a7bff"
      size={20}
      cssOverride={{ margin: "48px auto", textAlign: "center" }}
      loading={loading}
    />
  );
}

export default Spinner;
