import { useEffect, useState } from "react";

export type Option = {
  label: string;  // Country name
  value: string;  // Phone code (e.g. +49)
  flag: string;   // Emoji or URL
};

let cachedCountries: Option[] | null = null;

export function useCountries() {
  const [countries, setCountries] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (cachedCountries) {
        setCountries(cachedCountries);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,idd,flags"
        );
        const data = await res.json();

        const result: Option[] = data
          .filter(
            (country: any) =>
              country.name?.common &&
              country.idd?.root &&
              Array.isArray(country.idd.suffixes) &&
              country.idd.suffixes.length > 0
          )
          .map((country: any) => {
            const fullCode = `${country.idd.root}${country.idd.suffixes[0]}`;
            const flag =
              country.flags?.emoji ||
              country.flags?.svg ||
              country.flags?.png ||
              "";

            return {
              label: country.name.common,
              value: fullCode,
              flag,
            };
          })
          .sort((a:any, b:any) => a.label.localeCompare(b.label));

        cachedCountries = result;
        setCountries(result);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const countryNames = countries.map((c) => c.label);
  const phoneCodes = countries.map((c) => c.value);
  const flags = countries.map((c) => c.flag);

  return { countries, countryNames, phoneCodes, flags, loading };
}
