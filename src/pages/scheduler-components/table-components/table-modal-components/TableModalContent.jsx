import { TableModalBothFilters } from "./TableModalBothFilters";
import { TableModalYearFilter } from "./TableModalYearFilter";
import { TableModalDepFilter } from "./TableModalDepFilter";
import { TableModalNoFilter } from "./TableModalNoFilter";
import React, { Fragment, useContext } from "react";
import { ContextData } from "../../../../App";

export const TableModalContent = ({ timeTable, searchPeriod, section, rowCounter, limiter }) => {
  const { langOption } = useContext(ContextData);

  if (limiter === "all" && section === "all") {
    return <TableModalNoFilter timeTable={timeTable} langOption={langOption} />;
  }
  if (limiter === "all" && section !== "all") {
    return (
      <TableModalDepFilter
        timeTable={timeTable}
        searchPeriod={searchPeriod}
        section={section}
        langOption={langOption}
        rowCounter={rowCounter}
      />
    );
  }
  if (limiter !== "all" && section === "all") {
    return (
      <TableModalYearFilter
        timeTable={timeTable}
        searchPeriod={searchPeriod}
        limiter={limiter}
        langOption={langOption}
        rowCounter={rowCounter}
      />
    );
  }
  if (limiter !== "all" && section !== "all") {
    return (
      <TableModalBothFilters
        timeTable={timeTable}
        searchPeriod={searchPeriod}
        section={section}
        limiter={limiter}
        langOption={langOption}
        rowCounter={rowCounter}
      />
    );
  }
};
