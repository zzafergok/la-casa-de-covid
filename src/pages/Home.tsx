import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";
import CovidGlobal from "../components/CovidGlobal";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { ProvinceOrCity } from "../components/LocationSearchSelect";

// Organisms
import { FilterSection } from "../components/home/organisms/FilterSection";
import { ProvinceGrid } from "../components/home/organisms/ProvinceGrid";

// Molecules
import { LocationDetailCard } from "../components/home/molecules/LocationDetailCard";

// Atoms
import {
  ErrorState,
  EmptyState,
  LoadingSpinner,
} from "../components/home/atoms/StatusStates";

import CountryDataService from "../services/country.services";
import SummariesDataService from "../services/summary.services";

import { ISummariesData, IRegion, ICountryReport } from "../types/summary.type";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countryLoading, setCountryLoading] = useState(false);
  const [summariesData, setSummariesData] = useState<ISummariesData>();
  const [provinceData, setProvinceData] = useState<ICountryReport[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<IRegion | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<ProvinceOrCity | null>(null);

  // Global verileri yükle
  useEffect(() => {
    SummariesDataService.getAll()
      .then((data: ISummariesData) => {
        setSummariesData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Veri yüklenirken hata oluştu");
        setLoading(false);
        console.error(err);
      });
  }, []);

  // Ülke seçildiğinde o ülkenin verilerini getir
  useEffect(() => {
    if (!selectedRegion) {
      setProvinceData([]);
      setSelectedLocation(null);
      return;
    }

    setCountryLoading(true);
    setSelectedLocation(null);
    CountryDataService.getByIso(selectedRegion.iso)
      .then((data) => {
        setProvinceData(data);
        setCountryLoading(false);
      })
      .catch(() => {
        setProvinceData([]);
        setCountryLoading(false);
      });
  }, [selectedRegion]);

  return (
    <Layout>
      <FilterSection
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        provinceData={provinceData}
      />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <>
          <CovidGlobal summariesData={summariesData} />

          {selectedLocation && (
            <LocationDetailCard location={selectedLocation} />
          )}

          <ProvinceGrid
            selectedRegion={selectedRegion}
            selectedLocation={selectedLocation}
            loading={countryLoading}
            data={provinceData}
          />

          {!selectedRegion && (
            <EmptyState
              icon="🌍"
              title="Bir Ülke Seçin"
              message="Detaylı COVID-19 istatistiklerini görüntülemek için yukarıdan bir ülke seçin"
            />
          )}
        </>
      )}
      <ScrollToTopButton />
    </Layout>
  );
};

export default Home;
