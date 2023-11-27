import { useEffect, useRef } from "react";
import uuid from "react-uuid";

export const usePopup = () => {
  const popupRef = useRef({});

  useEffect(() => {
    return () => {
      closePopup();
    };
  }, []);

  const getParams = () => {
    const qs = window.location.search;
    const params = new URLSearchParams(qs).get("params");
    return JSON.parse(decodeURIComponent(params));
  };

  const closePopup = (id) => {
    if (id === undefined)
      return Object.entries(popupRef.current).map(([_, { popup }]) => {
        if (popup.closed) return;
        popup.close();
      });
    popupRef.current[id].popup?.close();
  };

  const openPopup = ({ id = "", url, params, callback }) => {
    const encodedParams = params ? "?params=" + encodeURIComponent(JSON.stringify(params)) : "";
    const features = "width=800,height=600";
    const name = id + "__" + uuid();
    const fullUrl = "/popup" + url + encodedParams;

    if (popupRef.current[id]) popupRef.current[id].popup.close();

    const popup = window.open(fullUrl, name, features);
    if (!popup) return;

    popupRef.current[id] = { id, name, popup };

    const handleMessage = (e) => {
      const { source, data } = e;
      if (source.name !== popup.name) return;
      if (!callback) return;
      callback(data);
    };

    window.addEventListener("message", handleMessage);

    popup.onunload = (e) => {
      if (e.target.location.origin === "null") return;
      window.removeEventListener("message", handleMessage);
    };
  };

  const postMessage = (data) => {
    if (!window.opener) return;
    window.opener.postMessage(data);
  };

  return { openPopup, closePopup, getParams, postMessage };
};
