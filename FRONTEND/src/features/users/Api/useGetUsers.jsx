import { useEffect, useState } from "react";
import axios from "axios";
export function useGetUsers(pag, lim, search, manualRender) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   console.log(allUsers);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://user-management-system-1-cw34.onrender.com/users/fetch?pag=${pag}&lim=${lim}&search=${search}`
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };
    dataFetch();
  }, [pag, search, manualRender]);

  return { data, loading, error };
}
