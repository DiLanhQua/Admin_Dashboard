// components/LoadingWrapper.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "./index";
import { startLoading, stopLoading } from "../../redux/slices/loading";

// eslint-disable-next-line react/prop-types
export default function LoadingWrapper({ children }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(startLoading());

      try {
        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [dispatch]);

  return <div>{isLoading ? <Loading /> : children}</div>;
}
