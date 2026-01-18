import React, { useState, useEffect, useRef, useCallback } from "react";

import { Search, X, ChevronDown, AlertCircle, SearchX } from "lucide-react";

import regionDataService from "../services/region.services";

import { IRegion } from "../types/summary.type";

interface RegionSelectProps {
  placeholder?: string;
  value?: IRegion | null;
  onChange?: (region: IRegion | null) => void;
}

export function RegionSelect({
  value,
  onChange,
  placeholder = "Ülke ara...",
}: RegionSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [filteredRegions, setFilteredRegions] = useState<IRegion[]>([]);

  // Fetch regions on mount
  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await regionDataService.getAll();
        // Sort A-Z by name
        const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
        setRegions(sorted);
        setFilteredRegions(sorted);
      } catch (err) {
        setError("Bölgeler yüklenirken hata oluştu");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
  }, []);

  // Filter regions based on search
  useEffect(() => {
    if (!search.trim()) {
      setFilteredRegions(regions);
      return;
    }
    const searchLower = search.toLowerCase();
    const filtered = regions.filter(
      (region) =>
        region.name.toLowerCase().includes(searchLower) ||
        region.iso.toLowerCase().includes(searchLower),
    );
    setFilteredRegions(filtered);
  }, [search, regions]);

  // Close dropdown on outside click
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

  const handleSelect = useCallback(
    (region: IRegion) => {
      onChange?.(region);
      setSearch("");
      setIsOpen(false);
    },
    [onChange],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
      setSearch("");
    },
    [onChange],
  );

  return (
    <div ref={containerRef} className="region-select-container">
      {/* Trigger */}
      <div
        className={`region-select-trigger ${isOpen ? "is-open" : ""}`}
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 10);
        }}
      >
        {/* Search Icon */}
        {/* Search Icon */}
        <Search className="region-select-icon" />

        {value && !isOpen ? (
          <div className="region-selected-value">
            <div className="region-selected-inner">
              <span className="region-iso-badge">{value.iso}</span>
              <span className="region-country-name">{value.name}</span>
            </div>
            <button className="region-clear-btn" onClick={handleClear}>
              <X size={14} color="#ef4444" />
            </button>
          </div>
        ) : (
          <>
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder}
              className="region-select-input"
            />
            {loading ? (
              <div className="region-spinner" />
            ) : (
              <ChevronDown className={`region-chevron ${isOpen ? "is-open" : ""}`} />
            )}
          </>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="region-dropdown">
          {error ? (
            <div className="region-error-state">
              <AlertCircle size={32} color="#ef4444" style={{ margin: "0 auto 12px" }} />
              <div>{error}</div>
            </div>
          ) : loading ? (
            <div className="region-loading-container">
              <div className="region-spinner" />
              <span>Ülkeler yükleniyor...</span>
            </div>
          ) : filteredRegions.length === 0 ? (
            <div className="region-empty-state">
              <SearchX
                size={40}
                color="#6b7280"
                style={{ margin: "0 auto 12px" }}
              />
              <div>"{search}" ile eşleşen ülke bulunamadı</div>
            </div>
          ) : (
            <div className="region-dropdown-list">
              {filteredRegions.map((region, index) => (
                <div
                  key={region.iso}
                  className={`region-dropdown-item ${value?.iso === region.iso ? "is-selected" : ""}`}
                  onClick={() => handleSelect(region)}
                >
                  <span className="region-item-iso-badge">{region.iso}</span>
                  <span className="region-item-name">{region.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
