"use client";
import { IFilterContext, IFilterState } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

const defaultState: IFilterState = {
  sort: "",
  costPd: [10000],
  distanceToStart: [5000],
  locations: [],
  noOfBedrooms: [],
};

const FiltersContext = createContext<IFilterContext>({
  filters: defaultState,
  updateSort: () => {},
  updateCostPd: () => {},
  updateDistanceToStart: () => {},
  updateLocations: () => {},
  updateNoOfBedrooms: () => {},
});

export const useFilters = () => useContext(FiltersContext);

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({
  children,
}) => {
  const [filters, setFilters] = useState<IFilterState>(defaultState);

  const updateSort = (value: string) => {
    setFilters((prev) => ({ ...prev, sort: value }));
  };

  const updateCostPd = (value: number[]) => {
    setFilters((prev) => ({ ...prev, costPd: value }));
  };

  const updateDistanceToStart = (value: number[]) => {
    setFilters((prev) => {
      return { ...prev, distanceToStart: value };
    });
  };

  const updateLocations = (isPush: boolean | string, value: string) => {
    setFilters((prev) => {
      let locations = [...prev.locations];
      if (isPush) {
        locations.push(value);
      } else {
        locations = locations.filter((item) => item !== value);
      }

      return { ...prev, locations: locations };
    });
  };

  const updateNoOfBedrooms = (isPush: boolean | string, value: number) => {
    setFilters((prev) => {
      let noOfBedrooms = [...prev.noOfBedrooms];
      if (isPush) {
        noOfBedrooms.push(value);
      } else {
        noOfBedrooms = noOfBedrooms.filter((item) => item !== value);
      }

      return { ...prev, noOfBedrooms: noOfBedrooms };
    });
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        updateSort,
        updateCostPd,
        updateDistanceToStart,
        updateLocations,
        updateNoOfBedrooms,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};