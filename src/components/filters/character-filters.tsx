'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUrlState } from '@/hooks/use-url-state';
import {
  CHARACTER_GENDER_OPTIONS,
  CHARACTER_STATUS_OPTIONS,
  type CharacterStatus,
  type CharacterGender,
} from '@/types';

export function CharacterFilters() {
  const { status, gender, setStatus, setGender, clearFilters } = useUrlState();

  const handleStatusChange = (value: string) => {
    if (value === 'all') {
      setStatus(null);
    } else {
      setStatus(value as CharacterStatus);
    }
  };

  const handleGenderChange = (value: string) => {
    if (value === 'all') {
      setGender(null);
    } else {
      setGender(value as CharacterGender);
    }
  };

  const hasActiveFilters = status || gender;

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/80 backdrop-blur-sm p-4 text-white shadow-lg shadow-slate-900/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-emerald-400">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs px-2 text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 border border-emerald-500/30"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Filter Controls - Vertical Layout */}
      <div className="space-y-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <label
            htmlFor="status-filter"
            className="text-sm font-medium text-slate-300"
          >
            Status
          </label>
          <Select value={status || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger id="status-filter" className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {CHARACTER_STATUS_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gender Filter */}
        <div className="space-y-2">
          <label
            htmlFor="gender-filter"
            className="text-sm font-medium text-slate-300"
          >
            Gender
          </label>
          <Select value={gender || 'all'} onValueChange={handleGenderChange}>
            <SelectTrigger id="gender-filter" className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              {CHARACTER_GENDER_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-slate-600/50">
            <p className="text-xs text-slate-400 mb-2">Active filters:</p>
            <div className="flex flex-col gap-1">
              {status && (
                <div className="inline-flex items-center rounded bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/30">
                  Status: {status}
                </div>
              )}
              {gender && (
                <div className="inline-flex items-center rounded bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/30">
                  Gender: {gender}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
