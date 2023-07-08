import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IFiltersObjectSchema {
  [Key: string]: string | boolean | number | undefined;
}

const onlyValidFilters = (filters: IFiltersObjectSchema) => {
  const validFilters: typeof filters = {};

  const keyValues = Object.entries(filters);

  keyValues.forEach(([key, value]) => {
    if (typeof value !== "undefined") validFilters[key] = value;
  });

  return validFilters;
};

function useFilters<T extends IFiltersObjectSchema>(initialValue: T) {
  //STATES
  const [filters, setFilters] = useState<T>(initialValue);

  //NEXT ROUTER
  const router = useRouter();

  //PARTIAL SETTER
  const setFiltersOutput = (filters: Partial<T>) => {
    const validFilters = onlyValidFilters({ ...router.query, ...filters });

    router.replace({
      pathname: router.pathname,
      query: validFilters,
    });

    setFilters((prev) => ({ ...prev, ...filters }));
  };

  //LIFE CYCLE HOOKS
  useEffect(() => {
    setFiltersOutput({...initialValue, ...router.query});
  }, []);

  return [filters, setFiltersOutput] as const;
}

export default useFilters;
