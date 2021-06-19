import React from "react";
import useI18n from "../hooks/useI18n";

function DataLoading(Component) {
  const { common: t } = useI18n();
  return function ExpLoadingComponent({ isLoading, expenses, ...props }) {
    if (!isLoading) return <Component expList={expenses} />;
    return <p>{t.dataLoading}</p>;
  };
}

export default DataLoading;
