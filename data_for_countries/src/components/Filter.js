const Filter = ( {filterText, updateFilter} ) => (
  <form>
    <div>
      find countries<input value={filterText} onChange={(event) => updateFilter(event.target.value)}/>
    </div>
  </form>
);

export default Filter;