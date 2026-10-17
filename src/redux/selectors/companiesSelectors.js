export const selectCompanies = (state) => state.companies.items;
export const selectCompanyFilters = (state) => state.companies.filters;
export const selectCompaniesStatus = (state) => state.companies.status;

export const selectFilteredCompanies = (state) => {
  const { items, filters } = state.companies;
  const search = filters.search.trim().toLowerCase();

  return items.filter((company) => {
    const matchesSearch =
      !search ||
      company.name.toLowerCase().includes(search) ||
      company.domain.toLowerCase().includes(search) ||
      company.contactEmail.toLowerCase().includes(search);

    const matchesStatus =
      filters.status === 'all' || company.status === filters.status;

    const matchesIndustry =
      filters.industry === 'all' || company.industry === filters.industry;

    return matchesSearch && matchesStatus && matchesIndustry;
  });
};
