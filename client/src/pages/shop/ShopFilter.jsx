const ShopFilter = ({
  filters,
  filterState,
  setFilterState,
  handleClearFilter,
}) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>
      <div className="flex flex-col space-y-3">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        <div>
          {filters[0]?.categories?.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-2 capitalize cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={filterState.category === category}
                onChange={(e) =>
                  setFilterState({ ...filterState, category: e.target.value })
                }
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
        <h4 className="font-medium text-lg">Colors</h4>
        <hr />
        <div>
          {filters[0]?.colors?.map((color) => (
            <label
              key={color}
              className="flex items-center space-x-2 capitalize cursor-pointer"
            >
              <input
                type="radio"
                name="color"
                value={color}
                checked={filterState.color === color}
                onChange={(e) =>
                  setFilterState({ ...filterState, color: e.target.value })
                }
                className="mr-2"
              />
              {color}
            </label>
          ))}
        </div>
        <h4 className="font-medium text-lg">Price Ranges</h4>
        <hr />
        <div>
          {filters[0]?.priceRanges?.map((range) => (
            <label
              key={range.label}
              className="flex items-center space-x-2 capitalize cursor-pointer"
            >
              <input
                type="radio"
                name="priceRange"
                value={`${range.min} - ${range.max}`}
                checked={
                  filterState.priceRanges === `${range.min} - ${range.max}`
                }
                onChange={(e) =>
                  setFilterState({
                    ...filterState,
                    priceRanges: e.target.value,
                  })
                }
                className="mr-2"
              />
              {range.label}
            </label>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
            onClick={handleClearFilter}
          >
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopFilter;
