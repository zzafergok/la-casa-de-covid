import React, { useState, useRef, useEffect, useMemo } from "react";

import { Search, X, ChevronDown, SearchX } from "lucide-react";

import { ICountryReport, ICity } from "../types/summary.type";

interface ProvinceOrCity {
  name: string;
  city?: ICity;
  parentProvince?: string;
  type: "province" | "city";
  province?: ICountryReport;
}

interface LocationSearchSelectProps {
  placeholder?: string;
  provinces: ICountryReport[];
  value: ProvinceOrCity | null;
  onChange: (item: ProvinceOrCity | null) => void;
}

export const LocationSearchSelect: React.FC<LocationSearchSelectProps> = ({
  value,
  onChange,
  provinces,
  placeholder = "Bölge veya şehir ara...",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Combine all provinces and cities into searchable items
  const allItems = useMemo(() => {
    const items: ProvinceOrCity[] = [];

    provinces.forEach((province) => {
      // Add province
      items.push({
        type: "province",
        name: province.region.province || province.region.name,
        province: province,
      });

      // Add cities from this province
      if (province.region.cities && province.region.cities.length > 0) {
        province.region.cities.forEach((city) => {
          items.push({
            type: "city",
            name: city.name,
            city: city,
            parentProvince: province.region.province || province.region.name,
          });
        });
      }
    });

    // Sort by name
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [provinces]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return allItems;
    const term = searchTerm.toLowerCase();
    return allItems.filter((item) => item.name.toLowerCase().includes(term));
  }, [allItems, searchTerm]);

  const handleSelect = (item: ProvinceOrCity) => {
    onChange(item);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setSearchTerm("");
  };

  const provinceCount = provinces.length;
  const cityCount = allItems.filter((i) => i.type === "city").length;
  return (
    <div ref={containerRef} className="location-search-container">
      <div
        className={`location-search-trigger ${isOpen ? "is-open" : ""}`}
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 10);
        }}
      >
        {/* Search Icon */}
        {/* Search Icon */}
        <Search className="location-search-icon" />

        {value && !isOpen ? (
          <div className="location-selected-value">
            <div className="location-selected-inner">
              <span
                className={`location-type-badge location-type-badge-${value.type}`}
              >
                {value.type === "province" ? "BÖLGE" : "ŞEHİR"}
              </span>
              <span className="location-selected-name">{value.name}</span>
            </div>
            <button
              className="location-clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            >
              <X size={14} color="#ef4444" />
            </button>
          </div>
        ) : (
          <>
            <input
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder}
              className="location-search-input"
            />
            {!value && (
              <span className="location-count">
                {provinceCount + cityCount} yer
              </span>
            )}
            <ChevronDown className={`location-chevron ${isOpen ? "is-open" : ""}`} />
          </>
        )}
      </div>

      {isOpen && (
        <div 
          className="location-dropdown"
          style={{
            position: "absolute",
            zIndex: 9999,
            marginTop: "8px",
            width: "100%",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "linear-gradient(180deg, rgba(25,25,35,0.98) 0%, rgba(15,15,25,0.99) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
            overflow: "hidden",
            animation: "dropdownSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <div className="location-option-group location-dropdown-scroll">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={`${item.type}-${item.name}-${index}`}
                  className={`location-option type-${item.type}`}
                  onClick={() => handleSelect(item)}
                >
                  <div className="location-option-left">
                    <div className={`location-option-icon type-${item.type}`}>
                      {item.type === "province" ? "🏛️" : "🏙️"}
                    </div>
                    <div>
                      <div className="location-option-name">{item.name}</div>
                      {item.type === "city" && item.parentProvince && (
                        <div className="location-option-meta">
                          {item.parentProvince}
                        </div>
                      )}
                      {item.type === "province" && (
                        <div className="location-option-meta">
                          Bölge / Eyalet
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="location-option-right">
                    {item.type === "province" && item.province && (
                      <span className="location-stat-confirmed-province">
                        {item.province.confirmed.toLocaleString()}
                      </span>
                    )}
                    {item.type === "city" && item.city && (
                      <span className="location-stat-confirmed-city">
                        {item.city.confirmed.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="location-empty-state">
                <SearchX
                  className="location-empty-icon"
                  color="#6b7280"
                  size={40}
                />
                <div>"{searchTerm}" bulunamadı</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export type { ProvinceOrCity };
